'use client'

import { useEffect, useState } from 'react'
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet'
import 'leaflet/dist/leaflet.css'
import L from 'leaflet'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'

// Fix Leaflet icon issue
const icon = L.icon({
  iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
  iconRetinaUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41],
})

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
  center = [-1.3, 36.8],
  zoom = 10,
}: GpsMapProps) {
  const [isClient, setIsClient] = useState(false)

  useEffect(() => {
    setIsClient(true)
  }, [])

  if (!isClient) {
    return <div className="bg-muted h-96 rounded-lg flex items-center justify-center">Loading map...</div>
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>GPS Map</CardTitle>
        <CardDescription>Field locations and facilities</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="h-96 rounded-lg overflow-hidden border border-input">
          <MapContainer center={center} zoom={zoom} style={{ height: '100%', width: '100%' }}>
            <TileLayer
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            />
            {locations.map((location) => (
              <Marker key={location.id} position={[location.lat, location.lng]} icon={icon}>
                <Popup>{location.name}</Popup>
              </Marker>
            ))}
          </MapContainer>
        </div>
      </CardContent>
    </Card>
  )
}
