'use client'

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Plus, Calendar } from 'lucide-react'

const mockPMS = [
  {
    id: '1',
    assetName: 'Water Pump - Zone A',
    pmType: 'Preventive Maintenance',
    location: 'Zone A - Village 1',
    scheduledDate: '2025-06-20',
    status: 'scheduled',
    assignedTo: 'James Mwangi',
    cost: 5000
  },
  {
    id: '2',
    assetName: 'Treatment Tank - Zone B',
    pmType: 'Inspection',
    location: 'Zone B - Treatment Plant',
    scheduledDate: '2025-06-15',
    status: 'in_progress',
    assignedTo: 'Mary Kipchoge',
    cost: 3000
  },
  {
    id: '3',
    assetName: 'Distribution Pipe Line',
    pmType: 'Cleaning & Flushing',
    location: 'Zone C',
    scheduledDate: '2025-06-10',
    status: 'completed',
    assignedTo: 'Peter Koech',
    cost: 8000
  },
]

const statusStyles = {
  scheduled: { bg: 'bg-blue-100', text: 'text-blue-800', label: 'Scheduled' },
  in_progress: { bg: 'bg-yellow-100', text: 'text-yellow-800', label: 'In Progress' },
  completed: { bg: 'bg-green-100', text: 'text-green-800', label: 'Completed' },
}

export default function PMSPage() {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-foreground">PMS Schedule</h1>
          <p className="text-muted-foreground mt-1">Preventive maintenance scheduling and tracking</p>
        </div>
        <Button className="gap-2">
          <Plus size={20} />
          Schedule PMS
        </Button>
      </div>

      {/* Calendar View Card */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Calendar size={20} />
            Upcoming Maintenance
          </CardTitle>
          <CardDescription>Next 30 days schedule</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="text-center py-8 text-muted-foreground">
            Calendar view coming soon
          </div>
        </CardContent>
      </Card>

      {/* PMS Tasks List */}
      <div className="space-y-4">
        <h2 className="text-xl font-semibold">Scheduled Maintenance</h2>
        {mockPMS.map((task) => {
          const style = statusStyles[task.status as keyof typeof statusStyles]
          return (
            <Card key={task.id}>
              <CardHeader>
                <div className="flex justify-between items-start">
                  <div>
                    <CardTitle>{task.assetName}</CardTitle>
                    <CardDescription>{task.pmType}</CardDescription>
                  </div>
                  <span className={`px-3 py-1 rounded-full text-sm font-medium ${style.bg} ${style.text}`}>
                    {style.label}
                  </span>
                </div>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                  <div>
                    <p className="text-muted-foreground">Location</p>
                    <p className="font-medium">{task.location}</p>
                  </div>
                  <div>
                    <p className="text-muted-foreground">Scheduled Date</p>
                    <p className="font-medium">{new Date(task.scheduledDate).toLocaleDateString()}</p>
                  </div>
                  <div>
                    <p className="text-muted-foreground">Assigned To</p>
                    <p className="font-medium">{task.assignedTo}</p>
                  </div>
                  <div>
                    <p className="text-muted-foreground">Estimated Cost</p>
                    <p className="font-medium text-primary">KES {task.cost.toLocaleString()}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          )
        })}
      </div>

      {/* Cost Summary */}
      <Card>
        <CardHeader>
          <CardTitle>Cost Summary</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <p className="text-sm text-muted-foreground">Total Scheduled Cost</p>
              <p className="text-2xl font-bold text-primary">
                KES {mockPMS.filter(p => p.status === 'scheduled').reduce((sum, p) => sum + p.cost, 0).toLocaleString()}
              </p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Total Spent (Completed)</p>
              <p className="text-2xl font-bold text-green-600">
                KES {mockPMS.filter(p => p.status === 'completed').reduce((sum, p) => sum + p.cost, 0).toLocaleString()}
              </p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Overall Budget</p>
              <p className="text-2xl font-bold">KES {mockPMS.reduce((sum, p) => sum + p.cost, 0).toLocaleString()}</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
