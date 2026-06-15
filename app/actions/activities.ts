'use server'

import { auth } from '@/lib/auth'
import { db } from '@/lib/db'
import { activity, activity_type, photo } from '@/lib/db/schema'
import { and, eq, desc, gte, lte } from 'drizzle-orm'
import { headers } from 'next/headers'
import { revalidatePath } from 'next/cache'

async function getUserId() {
  const session = await auth.api.getSession({ headers: await headers() })
  if (!session?.user) throw new Error('Unauthorized')
  return session.user.id
}

export async function getActivities(filters?: {
  startDate?: string
  endDate?: string
  activityTypeId?: string
}) {
  const userId = await getUserId()
  
  let query = db
    .select()
    .from(activity)
    .where(eq(activity.userId, userId))
  
  if (filters?.startDate) {
    query = query.where(gte(activity.activityDate, new Date(filters.startDate).toISOString().split('T')[0]))
  }
  
  if (filters?.endDate) {
    query = query.where(lte(activity.activityDate, new Date(filters.endDate).toISOString().split('T')[0]))
  }
  
  if (filters?.activityTypeId) {
    query = query.where(eq(activity.activityTypeId, filters.activityTypeId))
  }
  
  return query.orderBy(desc(activity.activityDate))
}

export async function createActivity(data: {
  activityTypeId: string
  locationId?: string
  activityDate: string
  latitude?: number
  longitude?: number
  notes?: string
  beneficiariesReached?: number
  quantityInstalled?: number
}) {
  const userId = await getUserId()
  
  const id = `activity_${Date.now()}`
  await db.insert(activity).values({
    id,
    userId,
    ...data,
    activityDate: new Date(data.activityDate).toISOString().split('T')[0] as any,
  })
  
  revalidatePath('/activities')
  return id
}

export async function updateActivity(activityId: string, data: Partial<typeof activity.$inferInsert>) {
  const userId = await getUserId()
  
  await db
    .update(activity)
    .set({ ...data, updatedAt: new Date() })
    .where(and(eq(activity.id, activityId), eq(activity.userId, userId)))
  
  revalidatePath('/activities')
}

export async function getActivityTypes() {
  await getUserId()
  
  return db.select().from(activity_type).orderBy(desc(activity_type.name))
}

export async function uploadActivityPhoto(activityId: string, blobUrl: string, caption?: string, photoType?: string) {
  const userId = await getUserId()
  
  const photoId = `photo_${Date.now()}`
  await db.insert(photo).values({
    id: photoId,
    activityId,
    blobUrl,
    caption,
    photoType,
  })
  
  revalidatePath(`/activities/${activityId}`)
  return photoId
}

export async function getActivityPhotos(activityId: string) {
  await getUserId()
  
  return db
    .select()
    .from(photo)
    .where(eq(photo.activityId, activityId))
    .orderBy(desc(photo.createdAt))
}
