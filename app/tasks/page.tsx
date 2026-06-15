'use client'

import { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Plus, Trash2, CheckCircle, Clock } from 'lucide-react'

const mockTasks = [
  { id: '1', title: 'Install water pump at Zone A', status: 'completed', priority: 'high', dueDate: '2025-06-10', assignee: 'James Mwangi' },
  { id: '2', title: 'System maintenance inspection', status: 'in_progress', priority: 'medium', dueDate: '2025-06-15', assignee: 'Mary Kipchoge' },
  { id: '3', title: 'Water quality testing', status: 'todo', priority: 'high', dueDate: '2025-06-16', assignee: 'Peter Koech' },
  { id: '4', title: 'Equipment calibration', status: 'todo', priority: 'medium', dueDate: '2025-06-20', assignee: 'Sarah Omondi' },
]

const statusColors = {
  todo: { bg: 'bg-gray-100', text: 'text-gray-800', label: 'To Do' },
  in_progress: { bg: 'bg-blue-100', text: 'text-blue-800', label: 'In Progress' },
  completed: { bg: 'bg-green-100', text: 'text-green-800', label: 'Completed' },
}

export default function TasksPage() {
  const [tasks, setTasks] = useState(mockTasks)

  const toggleTask = (id: string) => {
    setTasks(tasks.map(task =>
      task.id === id
        ? { ...task, status: task.status === 'completed' ? 'todo' : 'completed' }
        : task
    ))
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Tasks</h1>
          <p className="text-muted-foreground mt-1">Manage team tasks and assignments</p>
        </div>
        <Button className="gap-2">
          <Plus size={20} />
          New Task
        </Button>
      </div>

      {/* Task Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="pt-6">
            <div className="text-2xl font-bold text-primary">{tasks.length}</div>
            <p className="text-sm text-muted-foreground">Total Tasks</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="text-2xl font-bold text-blue-600">{tasks.filter(t => t.status === 'in_progress').length}</div>
            <p className="text-sm text-muted-foreground">In Progress</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="text-2xl font-bold text-green-600">{tasks.filter(t => t.status === 'completed').length}</div>
            <p className="text-sm text-muted-foreground">Completed</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="text-2xl font-bold text-amber-600">{tasks.filter(t => t.status === 'todo').length}</div>
            <p className="text-sm text-muted-foreground">To Do</p>
          </CardContent>
        </Card>
      </div>

      {/* Tasks List */}
      <div className="space-y-3">
        {tasks.map((task) => (
          <Card key={task.id}>
            <CardContent className="pt-6">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-3">
                    <button
                      onClick={() => toggleTask(task.id)}
                      className={`mt-1 ${task.status === 'completed' ? 'text-green-600' : 'text-gray-400'}`}
                    >
                      <CheckCircle size={24} />
                    </button>
                    <div>
                      <h3 className={`font-medium ${task.status === 'completed' ? 'line-through text-muted-foreground' : 'text-foreground'}`}>
                        {task.title}
                      </h3>
                      <p className="text-sm text-muted-foreground mt-1">Assigned to {task.assignee}</p>
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <span className={`px-2 py-1 rounded text-xs font-medium ${statusColors[task.status as keyof typeof statusColors].bg} ${statusColors[task.status as keyof typeof statusColors].text}`}>
                    {statusColors[task.status as keyof typeof statusColors].label}
                  </span>
                  <button className="text-muted-foreground hover:text-destructive">
                    <Trash2 size={18} />
                  </button>
                </div>
              </div>
              <p className="text-xs text-muted-foreground mt-3">Due: {new Date(task.dueDate).toLocaleDateString()}</p>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
