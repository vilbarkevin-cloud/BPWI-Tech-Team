'use client'

import { useState, useRef } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Upload, X, Camera } from 'lucide-react'

interface PhotoUploaderProps {
  onUpload?: (files: File[]) => void
  multiple?: boolean
}

export function PhotoUploader({ onUpload, multiple = true }: PhotoUploaderProps) {
  const [photos, setPhotos] = useState<File[]>([])
  const [previews, setPreviews] = useState<string[]>([])
  const fileInputRef = useRef<HTMLInputElement>(null)
  const cameraInputRef = useRef<HTMLInputElement>(null)

  const handleFileSelect = (files: FileList | null) => {
    if (!files) return

    const newPhotos = Array.from(files)
    const allowedFiles = multiple ? newPhotos : newPhotos.slice(0, 1)

    setPhotos(prev => multiple ? [...prev, ...allowedFiles] : allowedFiles)

    // Create previews
    allowedFiles.forEach(file => {
      const reader = new FileReader()
      reader.onload = (e) => {
        setPreviews(prev => [...prev, e.target?.result as string])
      }
      reader.readAsDataURL(file)
    })

    if (onUpload) {
      onUpload(allowedFiles)
    }
  }

  const removePhoto = (index: number) => {
    setPhotos(prev => prev.filter((_, i) => i !== index))
    setPreviews(prev => prev.filter((_, i) => i !== index))
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Camera size={20} />
          Photo Documentation
        </CardTitle>
        <CardDescription>Upload photos of field activities</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Upload Area */}
        <div
          className="border-2 border-dashed border-input rounded-lg p-8 text-center cursor-pointer hover:border-primary hover:bg-primary/5 transition-colors"
          onClick={() => fileInputRef.current?.click()}
        >
          <Upload className="mx-auto text-muted-foreground mb-2" size={32} />
          <p className="font-medium text-foreground">Click to upload photos</p>
          <p className="text-sm text-muted-foreground">or drag and drop</p>
          <p className="text-xs text-muted-foreground mt-1">PNG, JPG, GIF up to 10MB</p>
        </div>

        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          multiple={multiple}
          onChange={(e) => handleFileSelect(e.target.files)}
          className="hidden"
        />

        {/* Camera Input (Mobile) */}
        <input
          ref={cameraInputRef}
          type="file"
          accept="image/*"
          capture="environment"
          multiple={multiple}
          onChange={(e) => handleFileSelect(e.target.files)}
          className="hidden"
        />

        <div className="flex gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => fileInputRef.current?.click()}
            className="flex-1"
          >
            <Upload size={16} className="mr-2" />
            Choose Files
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => cameraInputRef.current?.click()}
            className="flex-1"
          >
            <Camera size={16} className="mr-2" />
            Take Photo
          </Button>
        </div>

        {/* Photo Preview Grid */}
        {previews.length > 0 && (
          <div>
            <p className="text-sm font-medium mb-3">Uploaded Photos ({previews.length})</p>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              {previews.map((preview, index) => (
                <div key={index} className="relative group">
                  <img
                    src={preview}
                    alt={`Preview ${index + 1}`}
                    className="w-full h-24 object-cover rounded-lg border border-input"
                  />
                  <button
                    onClick={() => removePhoto(index)}
                    className="absolute top-1 right-1 bg-destructive text-destructive-foreground rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity"
                  >
                    <X size={14} />
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Stats */}
        {photos.length > 0 && (
          <div className="bg-muted p-3 rounded-lg text-sm">
            <p><strong>Total size:</strong> {(photos.reduce((sum, f) => sum + f.size, 0) / 1024 / 1024).toFixed(2)} MB</p>
            <p><strong>Files:</strong> {photos.length}</p>
          </div>
        )}
      </CardContent>
    </Card>
  )
}
