"use client"

import { useState } from "react"
import { Plus, Pencil, Trash2, Search } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog"
import { useAdminStore } from "@/lib/admin-store"
import { PowerGrade } from "@/lib/store"
import { AddProductModal } from "./add-product-modal"

export function CatalogView() {
  const { products, deleteProduct } = useAdminStore()
  const [searchQuery, setSearchQuery] = useState("")
  const [addModalOpen, setAddModalOpen] = useState(false)
  const [editingProduct, setEditingProduct] = useState<PowerGrade | null>(null)
  const [deletingProduct, setDeletingProduct] = useState<PowerGrade | null>(null)

  const filteredProducts = products.filter(
    (product) =>
      product.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.scenario.toLowerCase().includes(searchQuery.toLowerCase())
  )

  const handleEdit = (product: PowerGrade) => {
    setEditingProduct(product)
    setAddModalOpen(true)
  }

  const handleDelete = (product: PowerGrade) => {
    setDeletingProduct(product)
  }

  const confirmDelete = () => {
    if (deletingProduct) {
      deleteProduct(deletingProduct.id)
      setDeletingProduct(null)
    }
  }

  const handleModalClose = (open: boolean) => {
    setAddModalOpen(open)
    if (!open) {
      setEditingProduct(null)
    }
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">Catalog Management</h2>
          <p className="text-muted-foreground">Manage your Power Grades inventory.</p>
        </div>
        <Button onClick={() => setAddModalOpen(true)} className="bg-accent text-accent-foreground hover:bg-accent/90">
          <Plus className="mr-2 h-4 w-4" />
          Add New Power Grade
        </Button>
      </div>

      {/* Search */}
      <div className="relative">
        <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
        <Input
          placeholder="Search by title, category, or scenario..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="pl-10 bg-input border-border"
        />
      </div>

      {/* Table */}
      <div className="rounded-lg border border-border overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow className="border-border hover:bg-transparent">
              <TableHead className="w-24">Thumbnail</TableHead>
              <TableHead>Title</TableHead>
              <TableHead>Price</TableHead>
              <TableHead>Categories</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredProducts.length > 0 ? (
              filteredProducts.map((product) => (
                <TableRow key={product.id} className="border-border">
                  <TableCell>
                    <div className="relative h-12 w-20 overflow-hidden rounded-md">
                      <img
                        src={product.imageAfter}
                        alt={product.title}
                        className="h-full w-full object-cover"
                      />
                    </div>
                  </TableCell>
                  <TableCell>
                    <div>
                      <p className="font-medium">{product.title}</p>
                      <p className="text-sm text-muted-foreground line-clamp-1">
                        {product.camera}
                      </p>
                    </div>
                  </TableCell>
                  <TableCell>
                    <span className="font-semibold text-accent">
                      ${product.price.toFixed(2)}
                    </span>
                  </TableCell>
                  <TableCell>
                    <div className="flex flex-wrap gap-1">
                      <Badge variant="secondary" className="bg-secondary text-secondary-foreground">
                        {product.category}
                      </Badge>
                      <Badge variant="outline" className="border-border">
                        {product.scenario}
                      </Badge>
                    </div>
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end gap-2">
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => handleEdit(product)}
                        className="h-8 w-8 text-muted-foreground hover:text-foreground"
                      >
                        <Pencil className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => handleDelete(product)}
                        className="h-8 w-8 text-muted-foreground hover:text-destructive"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={5} className="h-24 text-center text-muted-foreground">
                  {searchQuery ? "No products match your search." : "No products in catalog."}
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      {/* Product count */}
      <p className="text-sm text-muted-foreground">
        Showing {filteredProducts.length} of {products.length} products
      </p>

      {/* Add/Edit Modal */}
      <AddProductModal
        open={addModalOpen}
        onOpenChange={handleModalClose}
        editingProduct={editingProduct}
      />

      {/* Delete Confirmation */}
      <AlertDialog open={!!deletingProduct} onOpenChange={() => setDeletingProduct(null)}>
        <AlertDialogContent className="bg-card border-border">
          <AlertDialogHeader>
            <AlertDialogTitle>Delete Power Grade</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to delete &quot;{deletingProduct?.title}&quot;? This action cannot
              be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel className="border-border">Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={confirmDelete}
              className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
            >
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  )
}
