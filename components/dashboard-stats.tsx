'use client'

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { BarChart, Bar, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts'

const COLORS = ['#7c3aed', '#0ea5e9', '#10b981', '#f59e0b', '#ef4444']

// Mock data for dashboard
const mockActivitiesData = [
  { date: 'Mon', count: 12 },
  { date: 'Tue', count: 19 },
  { date: 'Wed', count: 15 },
  { date: 'Thu', count: 25 },
  { date: 'Fri', count: 22 },
  { date: 'Sat', count: 18 },
  { date: 'Sun', count: 14 },
]

const mockTaskData = [
  { name: 'Todo', value: 24 },
  { name: 'In Progress', value: 18 },
  { name: 'Completed', value: 42 },
]

const mockKPIData = [
  { metric: 'Installations', value: 156 },
  { metric: 'Beneficiaries', value: 2340 },
  { metric: 'Tasks Done', value: 82 },
  { metric: 'Systems OK', value: 98 },
]

export function DashboardStats() {
  return (
    <div className="space-y-6">
      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {mockKPIData.map((kpi) => (
          <Card key={kpi.metric}>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium text-muted-foreground">{kpi.metric}</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-primary">{kpi.value}</div>
              <p className="text-xs text-muted-foreground mt-1">This month</p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {/* Activities Trend */}
        <Card>
          <CardHeader>
            <CardTitle>Activity Trend</CardTitle>
            <CardDescription>Weekly activity count</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={mockActivitiesData}>
                <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" />
                <XAxis dataKey="date" stroke="var(--muted-foreground)" />
                <YAxis stroke="var(--muted-foreground)" />
                <Tooltip 
                  contentStyle={{
                    backgroundColor: 'var(--card)',
                    border: `1px solid var(--border)`,
                    borderRadius: '6px'
                  }}
                />
                <Bar dataKey="count" fill="var(--primary)" radius={[8, 8, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Task Status */}
        <Card>
          <CardHeader>
            <CardTitle>Task Status</CardTitle>
            <CardDescription>Distribution of tasks</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={mockTaskData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, value }) => `${name}: ${value}`}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {mockTaskData.map((_, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Recent Activities */}
      <Card>
        <CardHeader>
          <CardTitle>Recent Activities</CardTitle>
          <CardDescription>Latest field activities</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {[1, 2, 3].map((i) => (
              <div key={i} className="flex items-center justify-between pb-4 border-b last:border-0">
                <div>
                  <p className="font-medium">Water Installation Activity</p>
                  <p className="text-sm text-muted-foreground">Completed on {new Date(Date.now() - i * 86400000).toLocaleDateString()}</p>
                </div>
                <div className="text-right">
                  <p className="text-sm font-medium text-primary">Completed</p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
