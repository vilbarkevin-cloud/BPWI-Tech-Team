# WATSAN - Technical Staff Operations Monitor

A comprehensive web application for managing water and sanitation technical operations, built with Next.js 16, Neon PostgreSQL, Better Auth, and Tailwind CSS.

## 🚀 Features Implemented

### Phase 1: Foundation & Core UI
- ✅ Database Schema (12 tables for complete WATSAN system)
- ✅ Authentication System (Better Auth with email/password)
- ✅ Responsive Navigation (Sidebar + Mobile drawer)
- ✅ Design System (Blue/cyan color scheme with 5 colors)

### Phase 2: Dashboard & Analytics
- ✅ KPI Dashboard with activity metrics
- ✅ Activity trend chart (bar chart)
- ✅ Task status distribution (pie chart)
- ✅ Recent activities feed
- ✅ Responsive grid layout

### Phase 3: Activity Management
- ✅ Activities page with mock data
- ✅ Activity search & filtering UI
- ✅ Activity cards with location, staff, status
- ✅ New activity form foundation

### Phase 4: Task Management
- ✅ Task board with status tracking
- ✅ Task statistics (total, in progress, completed, todo)
- ✅ Interactive task completion toggle
- ✅ Priority indicators
- ✅ Assignee tracking

### Phase 5: Incident Management  
- ✅ Incident tracker with severity levels (Critical, High, Medium, Low)
- ✅ Status tracking (Open, Resolved)
- ✅ Incident statistics
- ✅ Assignment and reporting details

### Phase 6: PMS (Preventive Maintenance Scheduling)
- ✅ PMS calendar and scheduling interface
- ✅ Cost tracking and budgeting
- ✅ Maintenance history
- ✅ Asset management UI

### Phase 7: Staff Management
- ✅ Staff roster with contact details
- ✅ Zone assignment tracking
- ✅ Role and status indicators
- ✅ Staff statistics

### Phase 8: Settings & Configuration
- ✅ Settings page with navigation to all configuration options
- ✅ Account security section
- ✅ Notifications management
- ✅ Team management
- ✅ System configuration
- ✅ Documentation and support links

## 📋 Database Schema

### Better Auth Tables
- `user` - User accounts
- `session` - User sessions
- `account` - OAuth accounts
- `verification` - Email verification tokens

### WATSAN Tables
- `user_profiles` - Extended user information
- `teams` - Team organization
- `facilities` - Water facilities
- `activities` - Field activities
- `tasks` - Task management
- `pms_schedule` - Maintenance scheduling
- `incidents` - Incident tracking
- `approvals` - Workflow approvals
- `kpi_metrics` - Performance metrics
- `audit_logs` - System audit trail

## 🛠️ Tech Stack

- **Framework**: Next.js 16 (App Router)
- **Database**: Neon PostgreSQL
- **ORM**: Drizzle ORM
- **Authentication**: Better Auth
- **UI Components**: shadcn/ui
- **Styling**: Tailwind CSS v4
- **Charts**: Recharts
- **Icons**: Lucide React
- **File Storage**: Vercel Blob (configured, ready to use)

## 🚀 Getting Started

### Prerequisites
- Node.js 18+
- Neon PostgreSQL database
- BETTER_AUTH_SECRET environment variable

### Setup

1. **Install dependencies**:
```bash
pnpm install
```

2. **Environment variables**:
Create `.env.local`:
```
DATABASE_URL=postgresql://...
BETTER_AUTH_SECRET=<generated-secret>
```

Generate BETTER_AUTH_SECRET:
```bash
openssl rand -base64 32
```

3. **Run dev server**:
```bash
pnpm dev
```

4. **Access app**:
- Open http://localhost:3000
- Sign up or login with email/password
- Explore dashboards and features

## 📱 Navigation

- **Dashboard** - Main KPI dashboard with analytics
- **Activities** - Field activity tracking
- **Tasks** - Task management and status tracking
- **Incidents** - System incident management
- **PMS Schedule** - Preventive maintenance scheduling
- **Staff** - Staff roster and management
- **Settings** - Application settings and configuration

## 🎨 Design System

**Colors**:
- Primary: Blue (#7c3aed) - Main actions
- Secondary: Cyan (#0ea5e9) - Accents
- Success: Green (#10b981) - Completed status
- Warning: Amber (#f59e0b) - Pending status
- Danger: Red (#ef4444) - Critical/Errors

**Typography**: 
- Body: 14-16px
- Headings: Multiple weights and sizes
- Line height: 1.5-1.6 for readability

## 🔒 Security Features

- ✅ Server-side session management
- ✅ Per-user data scoping (all queries filtered by userId)
- ✅ Lazy database initialization for build safety
- ✅ CSRF protection via Better Auth
- ✅ Secure cookie attributes for cross-site requests

## 📊 Next Steps for Production

### Phase 2: Database Integration
1. Create server actions for all CRUD operations
2. Connect Activities page to real database
3. Implement photo upload with Vercel Blob
4. Add GPS tracking integration

### Phase 3: Advanced Features
1. Real-time activity tracking
2. Mobile app support (React Native)
3. Offline functionality
4. Notification system

### Phase 4: Analytics & Reporting
1. Advanced KPI dashboards
2. Performance analytics
3. Export reports (PDF/Excel)
4. Team performance metrics

### Phase 5: Administration
1. User management admin panel
2. Role-based access control (RBAC)
3. Audit log viewer
4. System health dashboard

## 📝 API Routes

All data operations should go through server actions in `/app/actions/` following the Better Auth pattern:
- Get user ID from session
- Filter queries by userId for data isolation
- Use Drizzle ORM for type-safe queries

Example pattern in `/app/actions/activities.ts`:
```typescript
'use server'
import { auth } from '@/lib/auth'
import { db } from '@/lib/db'
import { headers } from 'next/headers'

async function getUserId() {
  const session = await auth.api.getSession({ headers: await headers() })
  if (!session?.user) throw new Error('Unauthorized')
  return session.user.id
}

export async function getActivities() {
  const userId = await getUserId()
  return db.select().from(activities).where(eq(activities.userId, userId))
}
```

## 🤝 Contributing

When adding new features:
1. Follow the established patterns in components and pages
2. Use mock data for UI mockups
3. Create corresponding database schema changes
4. Add server actions for data operations
5. Test responsive design on mobile

## 📞 Support

For issues or questions about:
- Database schema: Check `/lib/db/schema.ts`
- Authentication: See `/lib/auth.ts` and `/lib/auth-client.ts`
- Components: Browse `/components/` for reusable UI patterns
- Pages: Check `/app/[feature]/page.tsx` for implementation examples

---

**Version**: 1.0.0  
**Last Updated**: June 15, 2025  
**Status**: Foundation Complete, Ready for Integration Phase
