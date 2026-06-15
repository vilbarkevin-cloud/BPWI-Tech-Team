import { pgTable, text, varchar, boolean, timestamp, decimal, jsonb, integer, index, uniqueIndex } from 'drizzle-orm/pg-core'
import { relations } from 'drizzle-orm'

// ============ BETTER AUTH TABLES ============
export const user = pgTable(
  'user',
  {
    id: text('id').primaryKey(),
    name: text('name'),
    email: text('email').unique().notNull(),
    emailVerified: boolean('emailVerified').notNull().default(false),
    image: text('image'),
    createdAt: timestamp('createdAt').notNull().defaultNow(),
    updatedAt: timestamp('updatedAt').notNull().defaultNow(),
  },
  (table) => [index('idx_user_email').on(table.email)]
)

export const session = pgTable(
  'session',
  {
    id: text('id').primaryKey(),
    expiresAt: timestamp('expiresAt').notNull(),
    token: text('token').unique().notNull(),
    createdAt: timestamp('createdAt').notNull().defaultNow(),
    updatedAt: timestamp('updatedAt').notNull().defaultNow(),
    ipAddress: text('ipAddress'),
    userAgent: text('userAgent'),
    userId: text('userId')
      .notNull()
      .references(() => user.id, { onDelete: 'cascade' }),
  },
  (table) => [index('idx_session_userId').on(table.userId)]
)

export const account = pgTable(
  'account',
  {
    id: text('id').primaryKey(),
    userId: text('userId')
      .notNull()
      .references(() => user.id, { onDelete: 'cascade' }),
    type: text('type').notNull(),
    provider: text('provider').notNull(),
    providerAccountId: text('providerAccountId').notNull(),
    refreshToken: text('refreshToken'),
    accessToken: text('accessToken'),
    expiresAt: integer('expiresAt'),
    tokenType: text('tokenType'),
    scope: text('scope'),
    idToken: text('idToken'),
    sessionState: text('sessionState'),
    createdAt: timestamp('createdAt').notNull().defaultNow(),
    updatedAt: timestamp('updatedAt').notNull().defaultNow(),
  },
  (table) => [index('idx_account_userId').on(table.userId)]
)

export const verification = pgTable('verification', {
  id: text('id').primaryKey(),
  identifier: text('identifier').notNull(),
  token: text('token').unique().notNull(),
  expires: timestamp('expires').notNull(),
  createdAt: timestamp('createdAt').notNull().defaultNow(),
})

// ============ WATSAN APP TABLES ============

// User Profiles
export const userProfile = pgTable(
  'user_profiles',
  {
    id: text('id').primaryKey(),
    userId: text('userId').notNull().references(() => user.id, { onDelete: 'cascade' }),
    role: varchar('role', { length: 50 }).notNull().default('STAFF'),
    phone: varchar('phone', { length: 20 }),
    avatar_url: varchar('avatar_url', { length: 500 }),
    department: varchar('department', { length: 255 }),
    is_active: boolean('is_active').default(true),
    last_login: timestamp('last_login'),
    two_factor_enabled: boolean('two_factor_enabled').default(false),
    device_tokens: text('device_tokens'),
    created_at: timestamp('created_at').notNull().defaultNow(),
    updated_at: timestamp('updated_at').notNull().defaultNow(),
    is_deleted: boolean('is_deleted').default(false),
    deleted_at: timestamp('deleted_at'),
  },
  (table) => [
    index('idx_user_profiles_userId').on(table.userId),
    index('idx_user_profiles_role').on(table.role),
    index('idx_user_profiles_is_active').on(table.is_active),
  ]
)

// Teams
export const teams = pgTable(
  'teams',
  {
    id: text('id').primaryKey(),
    team_name: varchar('team_name', { length: 255 }).notNull(),
    team_code: varchar('team_code', { length: 50 }).unique(),
    description: text('description'),
    manager_id: text('manager_id').notNull().references(() => user.id),
    zone_area: varchar('zone_area', { length: 255 }),
    created_at: timestamp('created_at').notNull().defaultNow(),
    updated_at: timestamp('updated_at').notNull().defaultNow(),
    is_deleted: boolean('is_deleted').default(false),
    deleted_at: timestamp('deleted_at'),
  },
  (table) => [
    index('idx_teams_manager_id').on(table.manager_id),
    index('idx_teams_zone_area').on(table.zone_area),
  ]
)

// Facilities
export const facilities = pgTable(
  'facilities',
  {
    id: text('id').primaryKey(),
    facility_name: varchar('facility_name', { length: 255 }).notNull(),
    facility_code: varchar('facility_code', { length: 50 }).unique(),
    facility_type: varchar('facility_type', { length: 50 }).notNull(),
    latitude: decimal('latitude', { precision: 10, scale: 8 }).notNull(),
    longitude: decimal('longitude', { precision: 11, scale: 8 }).notNull(),
    zone_area: varchar('zone_area', { length: 255 }),
    address_full: text('address_full'),
    specifications: jsonb('specifications'),
    is_active: boolean('is_active').default(true),
    assigned_team_id: text('assigned_team_id').references(() => teams.id),
    responsible_head_id: text('responsible_head_id').references(() => user.id),
    created_at: timestamp('created_at').notNull().defaultNow(),
    updated_at: timestamp('updated_at').notNull().defaultNow(),
    is_deleted: boolean('is_deleted').default(false),
    deleted_at: timestamp('deleted_at'),
  },
  (table) => [
    index('idx_facilities_type').on(table.facility_type),
    index('idx_facilities_zone').on(table.zone_area),
    index('idx_facilities_team').on(table.assigned_team_id),
  ]
)

// Activities
export const activities = pgTable(
  'activities',
  {
    id: text('id').primaryKey(),
    userId: text('userId').notNull().references(() => user.id),
    activity_type: varchar('activity_type', { length: 100 }).notNull(),
    facility_id: text('facility_id').references(() => facilities.id),
    activity_date: timestamp('activity_date').notNull().defaultNow(),
    latitude: decimal('latitude', { precision: 10, scale: 8 }),
    longitude: decimal('longitude', { precision: 11, scale: 8 }),
    notes: text('notes'),
    status: varchar('status', { length: 50 }).notNull().default('completed'),
    beneficiaries_reached: integer('beneficiaries_reached').default(0),
    quantity_installed: decimal('quantity_installed', { precision: 10, scale: 2 }),
    photos: text('photos'), // JSON array of photo URLs
    created_at: timestamp('created_at').notNull().defaultNow(),
    updated_at: timestamp('updated_at').notNull().defaultNow(),
  },
  (table) => [
    index('idx_activities_userId').on(table.userId),
    index('idx_activities_date').on(table.activity_date),
    index('idx_activities_facility').on(table.facility_id),
  ]
)

// Tasks
export const tasks = pgTable(
  'tasks',
  {
    id: text('id').primaryKey(),
    title: varchar('title', { length: 255 }).notNull(),
    description: text('description'),
    status: varchar('status', { length: 50 }).notNull().default('todo'),
    priority: varchar('priority', { length: 50 }).notNull().default('medium'),
    assigned_to: text('assigned_to').references(() => user.id),
    activity_id: text('activity_id').references(() => activities.id),
    due_date: timestamp('due_date'),
    created_by: text('created_by').notNull().references(() => user.id),
    created_at: timestamp('created_at').notNull().defaultNow(),
    updated_at: timestamp('updated_at').notNull().defaultNow(),
  },
  (table) => [
    index('idx_tasks_assigned_to').on(table.assigned_to),
    index('idx_tasks_status').on(table.status),
    index('idx_tasks_activity').on(table.activity_id),
  ]
)

// PMS Schedule
export const pmsSchedule = pgTable(
  'pms_schedule',
  {
    id: text('id').primaryKey(),
    asset_id: varchar('asset_id', { length: 100 }).notNull(),
    asset_name: varchar('asset_name', { length: 255 }).notNull(),
    pm_type: varchar('pm_type', { length: 50 }).notNull(),
    location: varchar('location', { length: 255 }),
    scheduled_date: timestamp('scheduled_date').notNull(),
    actual_date: timestamp('actual_date'),
    status: varchar('status', { length: 50 }).notNull().default('scheduled'),
    assigned_to: text('assigned_to').references(() => user.id),
    notes: text('notes'),
    cost: decimal('cost', { precision: 12, scale: 2 }),
    created_at: timestamp('created_at').notNull().defaultNow(),
    updated_at: timestamp('updated_at').notNull().defaultNow(),
  },
  (table) => [
    index('idx_pms_scheduled_date').on(table.scheduled_date),
    index('idx_pms_status').on(table.status),
  ]
)

// Incidents
export const incidents = pgTable(
  'incidents',
  {
    id: text('id').primaryKey(),
    title: varchar('title', { length: 255 }).notNull(),
    description: text('description').notNull(),
    severity: varchar('severity', { length: 50 }).notNull(),
    status: varchar('status', { length: 50 }).notNull().default('open'),
    location: varchar('location', { length: 255 }),
    reported_by: text('reported_by').notNull().references(() => user.id),
    assigned_to: text('assigned_to').references(() => user.id),
    resolution_details: text('resolution_details'),
    reported_at: timestamp('reported_at').notNull().defaultNow(),
    resolved_at: timestamp('resolved_at'),
    created_at: timestamp('created_at').notNull().defaultNow(),
    updated_at: timestamp('updated_at').notNull().defaultNow(),
  },
  (table) => [
    index('idx_incidents_severity').on(table.severity),
    index('idx_incidents_status').on(table.status),
  ]
)

// Approvals
export const approvals = pgTable(
  'approvals',
  {
    id: text('id').primaryKey(),
    request_type: varchar('request_type', { length: 100 }).notNull(),
    request_data: jsonb('request_data').notNull(),
    status: varchar('status', { length: 50 }).notNull().default('pending'),
    requested_by: text('requested_by').notNull().references(() => user.id),
    approved_by: text('approved_by').references(() => user.id),
    rejection_reason: text('rejection_reason'),
    requested_at: timestamp('requested_at').notNull().defaultNow(),
    approved_at: timestamp('approved_at'),
    created_at: timestamp('created_at').notNull().defaultNow(),
    updated_at: timestamp('updated_at').notNull().defaultNow(),
  },
  (table) => [
    index('idx_approvals_status').on(table.status),
    index('idx_approvals_requested_by').on(table.requested_by),
  ]
)

// KPI Metrics
export const kpiMetrics = pgTable(
  'kpi_metrics',
  {
    id: text('id').primaryKey(),
    metric_name: varchar('metric_name', { length: 255 }).notNull(),
    metric_value: decimal('metric_value', { precision: 12, scale: 2 }).notNull(),
    metric_date: timestamp('metric_date').notNull(),
    period: varchar('period', { length: 50 }),
    userId: text('userId').references(() => user.id),
    created_at: timestamp('created_at').notNull().defaultNow(),
  },
  (table) => [
    index('idx_kpi_date').on(table.metric_date),
    index('idx_kpi_name').on(table.metric_name),
  ]
)

// Audit Logs
export const auditLogs = pgTable(
  'audit_logs',
  {
    id: text('id').primaryKey(),
    userId: text('userId').notNull().references(() => user.id),
    action: varchar('action', { length: 255 }).notNull(),
    entity_type: varchar('entity_type', { length: 100 }).notNull(),
    entity_id: text('entity_id').notNull(),
    changes: jsonb('changes'),
    created_at: timestamp('created_at').notNull().defaultNow(),
  },
  (table) => [
    index('idx_audit_userId').on(table.userId),
    index('idx_audit_date').on(table.created_at),
  ]
)
