'use client'

import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import { useState } from 'react'
import { Menu, X, BarChart3, Activity, CheckSquare, AlertCircle, Settings, Users, Calendar, LogOut } from 'lucide-react'
import { authClient } from '@/lib/auth-client'

const navigation = [
  { name: 'Dashboard', href: '/dashboard', icon: BarChart3 },
  { name: 'Activities', href: '/activities', icon: Activity },
  { name: 'Tasks', href: '/tasks', icon: CheckSquare },
  { name: 'Incidents', href: '/incidents', icon: AlertCircle },
  { name: 'PMS Schedule', href: '/pms', icon: Calendar },
  { name: 'Staff', href: '/staff', icon: Users },
  { name: 'Settings', href: '/settings', icon: Settings },
]

interface SidebarProps {
  user?: any
}

export function Sidebar({ user }: SidebarProps) {
  const pathname = usePathname()
  const router = useRouter()
  const [open, setOpen] = useState(false)

  const handleLogout = async () => {
    await authClient.signOut()
    router.push('/sign-in')
  }

  return (
    <>
      {/* Mobile toggle */}
      <button
        onClick={() => setOpen(!open)}
        className="fixed top-4 left-4 md:hidden z-50 p-2 rounded-lg bg-primary text-primary-foreground hover:bg-primary/90"
      >
        {open ? <X size={24} /> : <Menu size={24} />}
      </button>

      {/* Mobile overlay */}
      {open && (
        <div
          className="fixed inset-0 md:hidden z-40 bg-black/20"
          onClick={() => setOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`fixed left-0 top-0 h-full w-64 bg-sidebar border-r border-sidebar-border transform transition-transform duration-200 z-40 md:translate-x-0 ${
          open ? 'translate-x-0' : '-translate-x-full'
        } md:static md:z-auto`}
      >
        <div className="flex flex-col h-full">
          {/* Logo */}
          <div className="p-6 border-b border-sidebar-border">
            <h1 className="text-xl font-bold text-sidebar-foreground">WATSAN</h1>
            <p className="text-sm text-muted-foreground">Tech Operations</p>
          </div>

          {/* Navigation */}
          <nav className="flex-1 p-4 space-y-2">
            {navigation.map((item) => {
              const Icon = item.icon
              const isActive = pathname === item.href || pathname?.startsWith(item.href + '/')
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setOpen(false)}
                  className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                    isActive
                      ? 'bg-sidebar-primary text-sidebar-primary-foreground'
                      : 'text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground'
                  }`}
                >
                  <Icon size={20} />
                  <span className="font-medium">{item.name}</span>
                </Link>
              )
            })}
          </nav>

          {/* User section */}
          <div className="p-4 border-t border-sidebar-border space-y-2">
            {user && (
              <div className="px-4 py-2 bg-sidebar-accent/20 rounded-lg">
                <p className="text-sm font-medium text-sidebar-foreground">{user.name || user.email}</p>
                <p className="text-xs text-muted-foreground">{user.email}</p>
              </div>
            )}
            <button
              onClick={handleLogout}
              className="w-full flex items-center gap-2 px-4 py-2 text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground rounded-lg transition-colors"
            >
              <LogOut size={20} />
              <span>Logout</span>
            </button>
          </div>
        </div>
      </aside>
    </>
  )
}
