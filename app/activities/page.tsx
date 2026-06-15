'use client'

import dynamic from 'next/dynamic'
import { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { PhotoUploader } from '@/components/photo-uploader'
import { MapPin, Plus, Search, Filter } from 'lucide-react'

// Dynamically import the map to avoid SSR issues
const GpsMap = dynamic(() => import('@/components/gps-map').then(mod => ({ default: mod.GpsMap })), {
  ssr: false,
  loading: () => <div className="h-96 bg-muted animate-pulse rounded-lg" />,
})

const mockActivities = [
  {
    id: '1',
    type: 'Installation',
    subtype: 'Water Installation',
    location: 'Zone A - Village 1',
    lat: -1.2667,
    lng: 36.7667,
    date: '2025-06-14',
    beneficiaries: 156,
    status: 'Completed',
    staff: 'James Mwangi',
    photos: 3,
  },
  {
    id: '2',
    type: 'Monitoring',
    subtype: 'System Maintenance',
    location: 'Zone B - Pump Station',
    lat: -1.3333,
    lng: 36.8333,
    date: '2025-06-13',
    beneficiaries: 0,
    status: 'In Progress',
    staff: 'Mary Kipchoge',
    photos: 5,
  },
  {
    id: '3',
    type: 'Delivery',
    subtype: 'Water Quality Monitoring',
    location: 'Zone C - Treatment Plant',
    lat: -1.4,
    lng: 36.9,
    date: '2025-06-12',
    beneficiaries: 0,
    status: 'Completed',
    staff: 'Peter Koech',
    photos: 2,
  },
]

const ACTIVITY_TYPES = {
  Installation: ['Water Installation', 'Tank Installation', 'Pump Installation'],
  Monitoring: ['System Maintenance', 'Water Quality Testing', 'Safety Inspection'],
  Delivery: ['Water Delivery', 'Material Distribution', 'Equipment Delivery'],
}

export default function ActivitiesPage() {
  const [showNewForm, setShowNewForm] = useState(false)
  const [selectedActivity, setSelectedActivity] = useState<string | null>(null)
  const [viewMode, setViewMode] = useState<'list' | 'map'>('list')

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Field Activities</h1>
          <p className="text-muted-foreground mt-1">Track and manage 9 types of field operations</p>
        </div>
        <Button onClick={() => setShowNewForm(!showNewForm)} className="gap-2">
          <Plus size={20} />
          New Activity
        </Button>
      </div>

      {/* View Toggle */}
      <div className="flex gap-2">
        <Button
          variant={viewMode === 'list' ? 'default' : 'outline'}
          onClick={() => setViewMode('list')}
        >
          List View
        </Button>
        <Button
          variant={viewMode === 'map' ? 'default' : 'outline'}
          onClick={() => setViewMode('map')}
        >
          Map View
        </Button>
      </div>

      {/* New Activity Form */}
      {showNewForm && (
        <Card className="border-primary/50 bg-primary/5">
          <CardHeader>
            <CardTitle>Create New Activity</CardTitle>
            <CardDescription>Log a new field activity with location and photos</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div>
              <label className="text-sm font-medium">Activity Type *</label>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-3">
                {Object.entries(ACTIVITY_TYPES).map(([category, subtypes]) => (
                  <div key={category} className="space-y-2">
                    <p className="text-sm font-semibold text-primary">{category}</p>
                    {subtypes.map((subtype) => (
                      <button
                        key={subtype}
                        className="block w-full text-left px-3 py-2 rounded border border-input hover:border-primary hover:bg-primary/5 transition-colors text-sm"
                      >
                        {subtype}
                      </button>
                    ))}
                  </div>
                ))}
              </div>
            </div>

            <PhotoUploader multiple={true} />

            <div className="flex gap-2 pt-4">
              <Button>Save Activity</Button>
              <Button variant="outline" onClick={() => setShowNewForm(false)}>
                Cancel
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Content based on view mode */}
      {viewMode === 'list' ? (
        <div className="space-y-4">
          {/* Search & Filter */}
          <div className="flex gap-2">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-3 text-muted-foreground" size={20} />
              <input
                type="text"
                placeholder="Search activities..."
                className="w-full pl-10 pr-4 py-2 rounded-lg border border-input bg-background text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
              />
            </div>
            <Button variant="outline" className="gap-2">
              <Filter size={20} />
              Filter
            </Button>
          </div>

          {/* Activities Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            {mockActivities.map((activity) => (
              <Card key={activity.id} className="cursor-pointer hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="flex justify-between items-start">
                    <div>
                      <CardTitle className="text-lg">{activity.subtype}</CardTitle>
                      <CardDescription className="flex items-center gap-1 mt-2">
                        <MapPin size={16} />
                        {activity.location}
                      </CardDescription>
                    </div>
                    <span
                      className={`px-3 py-1 rounded-full text-sm font-medium ${
                        activity.status === 'Completed'
                          ? 'bg-green-100 text-green-800'
                          : 'bg-blue-100 text-blue-800'
                      }`}
                    >
                      {activity.status}
                    </span>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 gap-3 text-sm">
                    <div>
                      <p className="text-muted-foreground">Category</p>
                      <p className="font-medium">{activity.type}</p>
                    </div>
                    <div>
                      <p className="text-muted-foreground">Staff</p>
                      <p className="font-medium">{activity.staff}</p>
                    </div>
                    <div>
                      <p className="text-muted-foreground">Date</p>
                      <p className="font-medium">{new Date(activity.date).toLocaleDateString()}</p>
                    </div>
                    {activity.beneficiaries > 0 && (
                      <div>
                        <p className="text-muted-foreground">Beneficiaries</p>
                        <p className="font-medium text-primary">{activity.beneficiaries}</p>
                      </div>
                    )}
                    <div>
                      <p className="text-muted-foreground">Photos</p>
                      <p className="font-medium">{activity.photos}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      ) : (
        <div className="space-y-4">
          <GpsMap
            locations={mockActivities.map((a) => ({
              id: a.id,
              lat: a.lat,
              lng: a.lng,
              name: a.subtype,
            }))}
          />

          {/* Activity Details from Map */}
          <Card>
            <CardHeader>
              <CardTitle>Activity Details</CardTitle>
              <CardDescription>Click on a location to view activity details</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-center text-muted-foreground py-8">
                Select a location on the map to view details
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  )
}
