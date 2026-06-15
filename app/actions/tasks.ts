'use server'

import { auth } from '@/lib/auth'
import { db } from '@/lib/db'
import { task } from '@/lib/db/schema'
import { and, eq, desc, inArray } from 'drizzle-orm'
import { headers } from 'next/headers'
import { revalidatePath } from 'next/cache'

async function getUserId() {
  const session = await auth.api.getSession({ headers: await headers() })
  if (!session?.user) throw new Error('Unauthorized')
  return session.user.id
}

export async function getTasks(filters?: {
  status?: string
  priority?: string
  assignedTo?: string
}) {
  const userId = await getUserId()
  
  let query = db.select().from(task)
  
  const conditions = []
  if (filters?.status) {
    conditions.push(eq(task.status, filters.status))
  }
  if (filters?.priority) {
    conditions.push(eq(task.priority, filters.priority))
  }
  if (filters?.assignedTo) {
    conditions.push(eq(task.assignedTo, filters.assignedTo))
  }
  
  if (conditions.length > 0) {
    query = query.where(and(...conditions))
  }
  
  return query.orderBy(desc(task.dueDate))
}

export async function createTask(data: {
  title: string
  description?: string
  priority?: string
  assignedTo?: string
  activityId?: string
  dueDate?: string
}) {
  const userId = await getUserId()
  
  const id = `task_${Date.now()}`
  await db.insert(task).values({
    id,
    ...data,
    createdBy: userId,
    dueDate: data.dueDate ? new Date(data.dueDate).toISOString().split('T')[0] as any : undefined,
  })
  
  revalidatePath('/tasks')
  return id
}

export async function updateTask(taskId: string, data: Partial<typeof task.$inferInsert>) {
  await getUserId()
  
  await db
    .update(task)
    .set({ ...data, updatedAt: new Date() })
    .where(eq(task.id, taskId))
  
  revalidatePath('/tasks')
}

export async function deleteTask(taskId: string) {
  await getUserId()
  
  await db.delete(task).where(eq(task.id, taskId))
  
  revalidatePath('/tasks')
}

export async function getTaskStats() {
  const userId = await getUserId()
  
  const tasksByStatus = await db
    .select({
      status: task.status,
      count: db.$count,
    })
    .from(task)
    .groupBy(task.status)
  
  return tasksByStatus
}
