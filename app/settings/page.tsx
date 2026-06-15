'use client'

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Settings, Bell, Lock, Users, HelpCircle, FileText } from 'lucide-react'

export default function SettingsPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-foreground">Settings</h1>
        <p className="text-muted-foreground mt-1">Manage application settings and preferences</p>
      </div>

      {/* Settings Sections */}
      <div className="space-y-4">
        {/* Account Settings */}
        <Card>
          <CardHeader>
            <div className="flex items-center gap-3">
              <div className="p-2 bg-primary/10 rounded-lg">
                <Lock size={20} className="text-primary" />
              </div>
              <div>
                <CardTitle>Account Security</CardTitle>
                <CardDescription>Manage password and authentication settings</CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <Button variant="outline">Update Password</Button>
          </CardContent>
        </Card>

        {/* Notifications */}
        <Card>
          <CardHeader>
            <div className="flex items-center gap-3">
              <div className="p-2 bg-blue-100 rounded-lg">
                <Bell size={20} className="text-blue-600" />
              </div>
              <div>
                <CardTitle>Notifications</CardTitle>
                <CardDescription>Configure email and SMS alerts</CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <Button variant="outline">Manage Notifications</Button>
          </CardContent>
        </Card>

        {/* Team Management */}
        <Card>
          <CardHeader>
            <div className="flex items-center gap-3">
              <div className="p-2 bg-green-100 rounded-lg">
                <Users size={20} className="text-green-600" />
              </div>
              <div>
                <CardTitle>Team Management</CardTitle>
                <CardDescription>Manage team members and roles</CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <Button variant="outline">Manage Teams</Button>
          </CardContent>
        </Card>

        {/* System Configuration */}
        <Card>
          <CardHeader>
            <div className="flex items-center gap-3">
              <div className="p-2 bg-purple-100 rounded-lg">
                <Settings size={20} className="text-purple-600" />
              </div>
              <div>
                <CardTitle>System Configuration</CardTitle>
                <CardDescription>Configure system-wide settings</CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <Button variant="outline">System Settings</Button>
          </CardContent>
        </Card>

        {/* Documentation */}
        <Card>
          <CardHeader>
            <div className="flex items-center gap-3">
              <div className="p-2 bg-amber-100 rounded-lg">
                <FileText size={20} className="text-amber-600" />
              </div>
              <div>
                <CardTitle>Documentation</CardTitle>
                <CardDescription>Access help and documentation</CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <Button variant="outline">View Help Center</Button>
          </CardContent>
        </Card>

        {/* Support */}
        <Card>
          <CardHeader>
            <div className="flex items-center gap-3">
              <div className="p-2 bg-cyan-100 rounded-lg">
                <HelpCircle size={20} className="text-cyan-600" />
              </div>
              <div>
                <CardTitle>Support</CardTitle>
                <CardDescription>Contact support team for assistance</CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <Button variant="outline">Contact Support</Button>
          </CardContent>
        </Card>
      </div>

      {/* About Section */}
      <Card>
        <CardHeader>
          <CardTitle>About WATSAN</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-2 text-sm">
            <p><strong>Version:</strong> 1.0.0</p>
            <p><strong>Last Updated:</strong> June 15, 2025</p>
            <p className="text-muted-foreground">WATSAN Technical Staff Operations Monitor - Streamlining water and sanitation management</p>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
