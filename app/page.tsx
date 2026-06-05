"use client"

import { useState, useMemo } from "react"
import { Header } from "@/components/header"
import { FilterSidebar } from "@/components/filter-sidebar"
import { ProductCard } from "@/components/product-card"
import { ProductDetailModal } from "@/components/product-detail-modal"
import { CartDrawer } from "@/components/cart-drawer"
import { MobileFilterSheet } from "@/components/mobile-filter-sheet"
import { powerGrades, PowerGrade } from "@/lib/store"

export default function Home() {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedProfiles, setSelectedProfiles] = useState<string[]>([])
  const [selectedCameras, setSelectedCameras] = useState<string[]>([])
  const [selectedScenarios, setSelectedScenarios] = useState<string[]>([])
  const [selectedProduct, setSelectedProduct] = useState<PowerGrade | null>(null)
  const [isCartOpen, setIsCartOpen] = useState(false)

  const filteredProducts = useMemo(() => {
    return powerGrades.filter((product) => {
      const matchesSearch =
        searchQuery === "" ||
        product.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.camera.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.scenario.toLowerCase().includes(searchQuery.toLowerCase())

      const matchesProfile =
        selectedProfiles.length === 0 || selectedProfiles.includes(product.category)

      const matchesCamera =
        selectedCameras.length === 0 || selectedCameras.includes(product.camera)

      const matchesScenario =
        selectedScenarios.length === 0 || selectedScenarios.includes(product.scenario)

      return matchesSearch && matchesProfile && matchesCamera && matchesScenario
    })
  }, [searchQuery, selectedProfiles, selectedCameras, selectedScenarios])

  return (
    <div className="flex min-h-screen flex-col bg-background">
      <Header
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        onCartClick={() => setIsCartOpen(true)}
      />

      <div className="flex flex-1">
        <div className="hidden lg:block">
          <FilterSidebar
            selectedProfiles={selectedProfiles}
            selectedCameras={selectedCameras}
            selectedScenarios={selectedScenarios}
            onProfileChange={setSelectedProfiles}
            onCameraChange={setSelectedCameras}
            onScenarioChange={setSelectedScenarios}
          />
        </div>

        <main className="flex-1 p-4 lg:p-6">
          <div className="mb-4 flex items-center justify-between">
            <div>
              <h1 className="text-xl font-semibold text-foreground lg:text-2xl">
                Power Grades Catalog
              </h1>
              <p className="text-sm text-muted-foreground">
                {filteredProducts.length} {filteredProducts.length === 1 ? "grade" : "grades"} available
              </p>
            </div>
            <MobileFilterSheet
              selectedProfiles={selectedProfiles}
              selectedCameras={selectedCameras}
              selectedScenarios={selectedScenarios}
              onProfileChange={setSelectedProfiles}
              onCameraChange={setSelectedCameras}
              onScenarioChange={setSelectedScenarios}
            />
          </div>

          {filteredProducts.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-16 text-center">
              <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-secondary">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="text-muted-foreground"
                >
                  <circle cx="11" cy="11" r="8" />
                  <path d="m21 21-4.3-4.3" />
                </svg>
              </div>
              <h3 className="mb-1 font-semibold text-foreground">No grades found</h3>
              <p className="text-sm text-muted-foreground">
                Try adjusting your search or filters
              </p>
            </div>
          ) : (
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {filteredProducts.map((product) => (
                <ProductCard
                  key={product.id}
                  product={product}
                  onClick={() => setSelectedProduct(product)}
                />
              ))}
            </div>
          )}
        </main>
      </div>

      <ProductDetailModal
        product={selectedProduct}
        open={!!selectedProduct}
        onClose={() => setSelectedProduct(null)}
      />

      <CartDrawer open={isCartOpen} onClose={() => setIsCartOpen(false)} />
    </div>
  )
}
