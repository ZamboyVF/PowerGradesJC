"use client"

import { useState, useRef, useCallback } from "react"
import { X, Upload, Loader2, Plus, Trash2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { useAdminStore } from "@/lib/admin-store"
import { PowerGrade } from "@/lib/store"
import { cn } from "@/lib/utils"

interface AddProductModalProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  editingProduct?: PowerGrade | null
}

const colorProfiles = ["RAW", "Log", "Rec.709", "HDR"]
const mediaTypes = ["Apple", "Sony", "Lumix", "ARRI", "RED"]
const scenarios = ["Bar", "Nightclub", "Outdoors", "Studio", "Cinematic", "Vintage"]

interface FileUploadZoneProps {
  label: string
  accept: string
  file: File | null
  preview?: string
  onFileSelect: (file: File | null) => void
  uploading?: boolean
}

function FileUploadZone({ label, accept, file, preview, onFileSelect, uploading }: FileUploadZoneProps) {
  const inputRef = useRef<HTMLInputElement>(null)
  const [isDragging, setIsDragging] = useState(false)

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(true)
  }, [])

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(false)
  }, [])

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(false)
    const droppedFile = e.dataTransfer.files[0]
    if (droppedFile) {
      onFileSelect(droppedFile)
    }
  }, [onFileSelect])

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0]
    if (selectedFile) {
      onFileSelect(selectedFile)
    }
  }

  return (
    <div className="space-y-2">
      <Label>{label}</Label>
      <div
        onClick={() => inputRef.current?.click()}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        className={cn(
          "relative flex min-h-32 cursor-pointer flex-col items-center justify-center rounded-lg border-2 border-dashed transition-colors",
          isDragging
            ? "border-accent bg-accent/10"
            : "border-border hover:border-accent/50 hover:bg-secondary/30",
          file && "border-chart-2"
        )}
      >
        <input
          ref={inputRef}
          type="file"
          accept={accept}
          onChange={handleFileChange}
          className="hidden"
        />
        
        {uploading ? (
          <div className="flex flex-col items-center gap-2">
            <Loader2 className="h-8 w-8 animate-spin text-accent" />
            <span className="text-sm text-muted-foreground">Uploading...</span>
          </div>
        ) : file ? (
          <div className="flex flex-col items-center gap-2 p-4">
            {preview ? (
              <img src={preview} alt="Preview" className="h-16 w-24 rounded object-cover" />
            ) : (
              <div className="flex h-12 w-12 items-center justify-center rounded bg-chart-2/20">
                <Upload className="h-6 w-6 text-chart-2" />
              </div>
            )}
            <span className="text-sm font-medium text-foreground">{file.name}</span>
            <Button
              type="button"
              variant="ghost"
              size="sm"
              onClick={(e) => {
                e.stopPropagation()
                onFileSelect(null)
              }}
              className="text-destructive hover:text-destructive"
            >
              <Trash2 className="mr-1 h-4 w-4" />
              Remove
            </Button>
          </div>
        ) : (
          <div className="flex flex-col items-center gap-2 p-4">
            <Upload className="h-8 w-8 text-muted-foreground" />
            <span className="text-sm text-muted-foreground">
              Drag & drop or click to upload
            </span>
            <span className="text-xs text-muted-foreground/70">
              {accept.includes("image") ? "PNG, JPG up to 10MB" : ".drx, .dpx files"}
            </span>
          </div>
        )}
      </div>
    </div>
  )
}

export function AddProductModal({ open, onOpenChange, editingProduct }: AddProductModalProps) {
  const { addProduct, updateProduct } = useAdminStore()
  const [saving, setSaving] = useState(false)

  // Form state
  const [title, setTitle] = useState(editingProduct?.title || "")
  const [description, setDescription] = useState(editingProduct?.description || "")
  const [price, setPrice] = useState(editingProduct?.price?.toString() || "2.50")
  const [nodeStructure, setNodeStructure] = useState(editingProduct?.nodeStructure || "")
  const [selectedColorProfile, setSelectedColorProfile] = useState(editingProduct?.category || "")
  const [selectedMedia, setSelectedMedia] = useState<string[]>(
    editingProduct?.camera ? [editingProduct.camera.split(" ")[0]] : []
  )
  const [selectedScenarios, setSelectedScenarios] = useState<string[]>(
    editingProduct?.scenario ? [editingProduct.scenario] : []
  )

  // File state
  const [beforeImage, setBeforeImage] = useState<File | null>(null)
  const [afterImage, setAfterImage] = useState<File | null>(null)
  const [gradeFile, setGradeFile] = useState<File | null>(null)
  const [beforePreview, setBeforePreview] = useState(editingProduct?.imageBefore || "")
  const [afterPreview, setAfterPreview] = useState(editingProduct?.imageAfter || "")

  const handleBeforeImageSelect = (file: File | null) => {
    setBeforeImage(file)
    if (file) {
      const reader = new FileReader()
      reader.onloadend = () => setBeforePreview(reader.result as string)
      reader.readAsDataURL(file)
    } else {
      setBeforePreview("")
    }
  }

  const handleAfterImageSelect = (file: File | null) => {
    setAfterImage(file)
    if (file) {
      const reader = new FileReader()
      reader.onloadend = () => setAfterPreview(reader.result as string)
      reader.readAsDataURL(file)
    } else {
      setAfterPreview("")
    }
  }

  const toggleMediaSelection = (media: string) => {
    setSelectedMedia((prev) =>
      prev.includes(media) ? prev.filter((m) => m !== media) : [...prev, media]
    )
  }

  const toggleScenarioSelection = (scenario: string) => {
    setSelectedScenarios((prev) =>
      prev.includes(scenario) ? prev.filter((s) => s !== scenario) : [...prev, scenario]
    )
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setSaving(true)

    // Simulate save delay
    await new Promise((resolve) => setTimeout(resolve, 1000))

    const productData = {
      title,
      description,
      price: parseFloat(price),
      nodeStructure,
      category: selectedColorProfile,
      camera: selectedMedia.join(", ") || "Universal",
      scenario: selectedScenarios[0] || "General",
      compatibility: ["DaVinci Resolve 17+", "DaVinci Resolve 18+", "DaVinci Resolve 19"],
      imageBefore: beforePreview || "https://images.unsplash.com/photo-1518837695005-2083093ee35b?w=800&q=80",
      imageAfter: afterPreview || "https://images.unsplash.com/photo-1507400492013-162706c8c05e?w=800&q=80",
    }

    if (editingProduct) {
      updateProduct(editingProduct.id, productData)
    } else {
      addProduct(productData)
    }

    setSaving(false)
    onOpenChange(false)
    
    // Reset form
    setTitle("")
    setDescription("")
    setPrice("2.50")
    setNodeStructure("")
    setSelectedColorProfile("")
    setSelectedMedia([])
    setSelectedScenarios([])
    setBeforeImage(null)
    setAfterImage(null)
    setGradeFile(null)
    setBeforePreview("")
    setAfterPreview("")
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-h-[90vh] max-w-3xl overflow-y-auto bg-card border-border">
        <DialogHeader>
          <DialogTitle>{editingProduct ? "Edit Power Grade" : "Add New Power Grade"}</DialogTitle>
          <DialogDescription>
            {editingProduct
              ? "Update the details of your Power Grade."
              : "Fill in the details to add a new Power Grade to your catalog."}
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-6 pt-4">
          {/* Basic Info */}
          <div className="grid gap-4 md:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="title">Title</Label>
              <Input
                id="title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="e.g., Golden Hour Cinematic"
                required
                className="bg-input border-border"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="price">Price ($)</Label>
              <Input
                id="price"
                type="number"
                step="0.01"
                min="0"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                className="bg-input border-border"
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Describe the look and ideal use cases for this Power Grade..."
              rows={3}
              className="bg-input border-border resize-none"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="nodeStructure">Node Structure</Label>
            <Input
              id="nodeStructure"
              value={nodeStructure}
              onChange={(e) => setNodeStructure(e.target.value)}
              placeholder="e.g., CST > Contrast > Glow"
              className="bg-input border-border"
            />
            <p className="text-xs text-muted-foreground">
              Define the node pipeline structure (use {">"} to separate nodes)
            </p>
          </div>

          {/* Categories */}
          <div className="space-y-4">
            <div>
              <Label className="mb-3 block">Color Profile</Label>
              <div className="flex flex-wrap gap-2">
                {colorProfiles.map((profile) => (
                  <Button
                    key={profile}
                    type="button"
                    variant={selectedColorProfile === profile ? "default" : "outline"}
                    size="sm"
                    onClick={() => setSelectedColorProfile(profile)}
                    className={cn(
                      selectedColorProfile === profile
                        ? "bg-accent text-accent-foreground"
                        : "border-border"
                    )}
                  >
                    {profile}
                  </Button>
                ))}
              </div>
            </div>

            <div>
              <Label className="mb-3 block">Camera / Media Compatibility</Label>
              <div className="grid grid-cols-2 gap-2 md:grid-cols-3">
                {mediaTypes.map((media) => (
                  <label
                    key={media}
                    className="flex cursor-pointer items-center gap-2 rounded-lg border border-border bg-secondary/30 p-3 transition-colors hover:bg-secondary/50"
                  >
                    <Checkbox
                      checked={selectedMedia.includes(media)}
                      onCheckedChange={() => toggleMediaSelection(media)}
                    />
                    <span className="text-sm">{media}</span>
                  </label>
                ))}
              </div>
            </div>

            <div>
              <Label className="mb-3 block">Scenarios</Label>
              <div className="grid grid-cols-2 gap-2 md:grid-cols-3">
                {scenarios.map((scenario) => (
                  <label
                    key={scenario}
                    className="flex cursor-pointer items-center gap-2 rounded-lg border border-border bg-secondary/30 p-3 transition-colors hover:bg-secondary/50"
                  >
                    <Checkbox
                      checked={selectedScenarios.includes(scenario)}
                      onCheckedChange={() => toggleScenarioSelection(scenario)}
                    />
                    <span className="text-sm">{scenario}</span>
                  </label>
                ))}
              </div>
            </div>
          </div>

          {/* File Uploads */}
          <div className="space-y-4">
            <Label className="text-base font-semibold">Upload Files</Label>
            <div className="grid gap-4 md:grid-cols-3">
              <FileUploadZone
                label="Before Image"
                accept="image/*"
                file={beforeImage}
                preview={beforePreview}
                onFileSelect={handleBeforeImageSelect}
              />
              <FileUploadZone
                label="After Image"
                accept="image/*"
                file={afterImage}
                preview={afterPreview}
                onFileSelect={handleAfterImageSelect}
              />
              <FileUploadZone
                label="Power Grade File"
                accept=".drx,.dpx"
                file={gradeFile}
                onFileSelect={setGradeFile}
              />
            </div>
          </div>

          {/* Actions */}
          <div className="flex justify-end gap-3 border-t border-border pt-4">
            <Button
              type="button"
              variant="outline"
              onClick={() => onOpenChange(false)}
              className="border-border"
            >
              Cancel
            </Button>
            <Button type="submit" disabled={saving} className="bg-accent text-accent-foreground hover:bg-accent/90">
              {saving ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Saving...
                </>
              ) : editingProduct ? (
                "Update Power Grade"
              ) : (
                <>
                  <Plus className="mr-2 h-4 w-4" />
                  Add Power Grade
                </>
              )}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  )
}
