'use client'

import { useEffect, useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { MapPin } from 'lucide-react'
import dynamic from 'next/dynamic'

// Dynamically import leaflet components only on client
const MapContainer = dynamic(
  async () => {
    const { MapContainer } = await import('react-leaflet')
    return MapContainer
  },
  { ssr: false }
)

const TileLayer = dynamic(
  async () => {
    const { TileLayer } = await import('react-leaflet')
    return TileLayer
  },
  { ssr: false }
)

const Marker = dynamic(
  async () => {
    const { Marker } = await import('react-leaflet')
    return Marker
  },
  { ssr: false }
)

const Popup = dynamic(
  async () => {
    const { Popup } = await import('react-leaflet')
    return Popup
  },
  { ssr: false }
)

interface GpsMapProps {
  locations?: Array<{ id: string; lat: number; lng: number; name: string }>
  center?: [number, number]
  zoom?: number
}

export function GpsMap({ 
  locations = [
    { id: '1', lat: -1.2667, lng: 36.7667, name: 'Zone A - Village 1' },
    { id: '2', lat: -1.3333, lng: 36.8333, name: 'Zone B - Pump Station' },
    { id: '3', lat: -1.4, lng: 36.9, name: 'Zone C - Treatment Plant' },
  ],
  center = [-1.3333, 36.8333],
  zoom = 11,
}: GpsMapProps) {
  const [isClient, setIsClient] = useState(false)
  const [cssLoaded, setCssLoaded] = useState(false)

  useEffect(() => {
    setIsClient(true)
    // Load CSS only on client
    import('leaflet/dist/leaflet.css').then(() => setCssLoaded(true))
  }, [])

  if (!isClient || !cssLoaded) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <MapPin className="h-5 w-5" />
            GPS Map
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-96 bg-muted animate-pulse rounded-lg" />
        </CardContent>
      </Card>
    )
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <MapPin className="h-5 w-5" />
          GPS Map - Field Locations
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="h-96 border rounded-lg overflow-hidden">
          <MapContainer center={center as any} zoom={zoom} style={{ height: '100%', width: '100%' }}>
            <TileLayer
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              attribution='&copy; OpenStreetMap contributors'
            />
            {locations.map((location) => (
              <Marker key={location.id} position={[location.lat, location.lng] as any}>
                <Popup>{location.name}</Popup>
              </Marker>
            ))}
          </MapContainer>
        </div>
      </CardContent>
    </Card>
  )
}
