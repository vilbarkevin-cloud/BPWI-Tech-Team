import { headers } from 'next/headers'
import { redirect } from 'next/navigation'
import { auth } from '@/lib/auth'
import { Sidebar } from '@/components/sidebar'
import { DashboardStats } from '@/components/dashboard-stats'

export default async function DashboardPage() {
  // Check auth on the server side
  const session = await auth.api.getSession({ headers: await headers() })
  
  if (!session?.user) {
    redirect('/sign-in')
  }

  return (
    <div className="flex min-h-screen bg-background">
      <Sidebar user={session.user} />
      
      {/* Main content */}
      <main className="flex-1 md:ml-64 pt-16 md:pt-0">
        <div className="p-4 md:p-8">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-foreground">Dashboard</h1>
            <p className="text-muted-foreground mt-1">Welcome to WATSAN Technical Staff Operations Monitor</p>
          </div>
          
          <DashboardStats />
        </div>
      </main>
    </div>
  )
}
