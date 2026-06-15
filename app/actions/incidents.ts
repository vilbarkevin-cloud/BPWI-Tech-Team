'use server'

import { auth } from '@/lib/auth'
import { db } from '@/lib/db'
import { incident } from '@/lib/db/schema'
import { and, eq, desc, inArray } from 'drizzle-orm'
import { headers } from 'next/headers'
import { revalidatePath } from 'next/cache'

async function getUserId() {
  const session = await auth.api.getSession({ headers: await headers() })
  if (!session?.user) throw new Error('Unauthorized')
  return session.user.id
}

export async function getIncidents(filters?: { status?: string; severity?: string }) {
  const userId = await getUserId()
  
  let query = db.select().from(incident)
  
  const conditions = []
  if (filters?.status) {
    conditions.push(eq(incident.status, filters.status))
  }
  if (filters?.severity) {
    conditions.push(eq(incident.severity, filters.severity))
  }
  
  if (conditions.length > 0) {
    query = query.where(and(...conditions))
  }
  
  return query.orderBy(desc(incident.reportedAt))
}

export async function createIncident(data: {
  title: string
  description: string
  severity: string
  location?: string
  assignedTo?: string
}) {
  const userId = await getUserId()
  
  const id = `incident_${Date.now()}`
  await db.insert(incident).values({
    id,
    ...data,
    reportedBy: userId,
  })
  
  revalidatePath('/incidents')
  return id
}

export async function updateIncident(incidentId: string, data: Partial<typeof incident.$inferInsert>) {
  await getUserId()
  
  await db
    .update(incident)
    .set({ ...data, updatedAt: new Date() })
    .where(eq(incident.id, incidentId))
  
  revalidatePath('/incidents')
}

export async function closeIncident(incidentId: string, resolutionDetails: string) {
  await getUserId()
  
  await db
    .update(incident)
    .set({
      status: 'closed',
      resolutionDetails,
      resolvedAt: new Date(),
      updatedAt: new Date(),
    })
    .where(eq(incident.id, incidentId))
  
  revalidatePath('/incidents')
}
