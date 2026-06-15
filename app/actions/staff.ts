'use server'

import { auth } from '@/lib/auth'
import { db } from '@/lib/db'
import { staff, user } from '@/lib/db/schema'
import { and, eq, desc } from 'drizzle-orm'
import { headers } from 'next/headers'
import { revalidatePath } from 'next/cache'

async function getUserId() {
  const session = await auth.api.getSession({ headers: await headers() })
  if (!session?.user) throw new Error('Unauthorized')
  return session.user.id
}

export async function getStaffList() {
  const userId = await getUserId()
  
  const staffList = await db
    .select()
    .from(staff)
    .orderBy(desc(staff.createdAt))
  
  return staffList
}

export async function getStaffById(staffId: string) {
  await getUserId()
  
  return db
    .select()
    .from(staff)
    .where(eq(staff.id, staffId))
    .then(results => results[0] || null)
}

export async function createStaff(data: {
  userId: string
  fullName: string
  phoneNumber?: string
  designation: string
  department?: string
  roleId?: string
  dateJoined?: string
}) {
  await getUserId()
  
  const id = `staff_${Date.now()}`
  await db.insert(staff).values({
    id,
    ...data,
    dateJoined: data.dateJoined ? new Date(data.dateJoined).toISOString().split('T')[0] as any : undefined,
  })
  
  revalidatePath('/staff')
  return id
}

export async function updateStaff(staffId: string, data: Partial<typeof staff.$inferInsert>) {
  await getUserId()
  
  await db
    .update(staff)
    .set({ ...data, updatedAt: new Date() })
    .where(eq(staff.id, staffId))
  
  revalidatePath('/staff')
}

export async function deleteStaff(staffId: string) {
  await getUserId()
  
  await db.delete(staff).where(eq(staff.id, staffId))
  
  revalidatePath('/staff')
}
