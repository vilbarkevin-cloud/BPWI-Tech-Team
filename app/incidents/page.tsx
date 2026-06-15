'use client'

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Plus, AlertTriangle } from 'lucide-react'

const mockIncidents = [
  {
    id: '1',
    title: 'Water pump malfunction',
    severity: 'high',
    location: 'Zone A - Village 1',
    status: 'open',
    reportedBy: 'James Mwangi',
    reportedDate: '2025-06-14',
    assignedTo: 'Tech Team Lead'
  },
  {
    id: '2',
    title: 'Pipeline leak detected',
    severity: 'critical',
    location: 'Zone B - Main Line',
    status: 'open',
    reportedBy: 'Mary Kipchoge',
    reportedDate: '2025-06-13',
    assignedTo: 'Maintenance Crew'
  },
  {
    id: '3',
    title: 'Treatment plant power issue',
    severity: 'medium',
    location: 'Zone C - Treatment Plant',
    status: 'resolved',
    reportedBy: 'Peter Koech',
    reportedDate: '2025-06-10',
    assignedTo: 'Electrical Team'
  },
]

const severityColors = {
  critical: { bg: 'bg-red-100', text: 'text-red-800', icon: 'text-red-600' },
  high: { bg: 'bg-orange-100', text: 'text-orange-800', icon: 'text-orange-600' },
  medium: { bg: 'bg-yellow-100', text: 'text-yellow-800', icon: 'text-yellow-600' },
  low: { bg: 'bg-blue-100', text: 'text-blue-800', icon: 'text-blue-600' },
}

export default function IncidentsPage() {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Incidents</h1>
          <p className="text-muted-foreground mt-1">Track and manage system incidents</p>
        </div>
        <Button className="gap-2">
          <Plus size={20} />
          Report Incident
        </Button>
      </div>

      {/* Incident Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="pt-6">
            <div className="text-2xl font-bold text-red-600">{mockIncidents.filter(i => i.severity === 'critical').length}</div>
            <p className="text-sm text-muted-foreground">Critical</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="text-2xl font-bold text-orange-600">{mockIncidents.filter(i => i.severity === 'high').length}</div>
            <p className="text-sm text-muted-foreground">High Priority</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="text-2xl font-bold text-blue-600">{mockIncidents.filter(i => i.status === 'open').length}</div>
            <p className="text-sm text-muted-foreground">Open</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="text-2xl font-bold text-green-600">{mockIncidents.filter(i => i.status === 'resolved').length}</div>
            <p className="text-sm text-muted-foreground">Resolved</p>
          </CardContent>
        </Card>
      </div>

      {/* Incidents List */}
      <div className="space-y-4">
        {mockIncidents.map((incident) => {
          const severityColor = severityColors[incident.severity as keyof typeof severityColors]
          return (
            <Card key={incident.id}>
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div className="flex items-start gap-3 flex-1">
                    <AlertTriangle className={`mt-1 ${severityColor.icon}`} size={20} />
                    <div>
                      <CardTitle>{incident.title}</CardTitle>
                      <CardDescription>{incident.location}</CardDescription>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <span className={`px-3 py-1 rounded-full text-sm font-medium ${severityColor.bg} ${severityColor.text}`}>
                      {incident.severity.charAt(0).toUpperCase() + incident.severity.slice(1)}
                    </span>
                    <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                      incident.status === 'resolved'
                        ? 'bg-green-100 text-green-800'
                        : 'bg-red-100 text-red-800'
                    }`}>
                      {incident.status === 'resolved' ? 'Resolved' : 'Open'}
                    </span>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <p className="text-muted-foreground">Reported By</p>
                    <p className="font-medium">{incident.reportedBy}</p>
                  </div>
                  <div>
                    <p className="text-muted-foreground">Assigned To</p>
                    <p className="font-medium">{incident.assignedTo}</p>
                  </div>
                  <div>
                    <p className="text-muted-foreground">Reported Date</p>
                    <p className="font-medium">{new Date(incident.reportedDate).toLocaleDateString()}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          )
        })}
      </div>
    </div>
  )
}
