'use client'

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Plus, Mail, Phone, MapPin } from 'lucide-react'

const mockStaff = [
  { id: '1', name: 'James Mwangi', role: 'Field Technician', email: 'james@watsan.local', phone: '+254 712 345 678', zone: 'Zone A', status: 'Active' },
  { id: '2', name: 'Mary Kipchoge', role: 'Maintenance Supervisor', email: 'mary@watsan.local', phone: '+254 713 456 789', zone: 'Zone B', status: 'Active' },
  { id: '3', name: 'Peter Koech', role: 'System Operator', email: 'peter@watsan.local', phone: '+254 714 567 890', zone: 'Zone C', status: 'Active' },
  { id: '4', name: 'Sarah Omondi', role: 'Quality Inspector', email: 'sarah@watsan.local', phone: '+254 715 678 901', zone: 'Multi-Zone', status: 'Active' },
]

export default function StaffPage() {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Staff Management</h1>
          <p className="text-muted-foreground mt-1">Manage technical staff and team members</p>
        </div>
        <Button className="gap-2">
          <Plus size={20} />
          Add Staff
        </Button>
      </div>

      {/* Staff Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardContent className="pt-6">
            <div className="text-2xl font-bold text-primary">{mockStaff.length}</div>
            <p className="text-sm text-muted-foreground">Total Staff</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="text-2xl font-bold text-green-600">{mockStaff.filter(s => s.status === 'Active').length}</div>
            <p className="text-sm text-muted-foreground">Active</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="text-2xl font-bold">4</div>
            <p className="text-sm text-muted-foreground">Zones Covered</p>
          </CardContent>
        </Card>
      </div>

      {/* Staff List */}
      <div className="space-y-4">
        {mockStaff.map((staff) => (
          <Card key={staff.id}>
            <CardHeader>
              <div className="flex justify-between items-start">
                <div>
                  <CardTitle>{staff.name}</CardTitle>
                  <CardDescription>{staff.role}</CardDescription>
                </div>
                <span className="px-3 py-1 rounded-full text-sm font-medium bg-green-100 text-green-800">
                  {staff.status}
                </span>
              </div>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                <div className="flex items-center gap-2">
                  <Mail size={16} className="text-muted-foreground" />
                  <a href={`mailto:${staff.email}`} className="text-primary hover:underline">{staff.email}</a>
                </div>
                <div className="flex items-center gap-2">
                  <Phone size={16} className="text-muted-foreground" />
                  <a href={`tel:${staff.phone}`} className="text-primary hover:underline">{staff.phone}</a>
                </div>
                <div className="flex items-center gap-2">
                  <MapPin size={16} className="text-muted-foreground" />
                  <span>{staff.zone}</span>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
