"use client"

import Image from "next/image"
import { Plus } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import { PowerGrade, useStore } from "@/lib/store"

interface ProductCardProps {
  product: PowerGrade
  onClick: () => void
}

export function ProductCard({ product, onClick }: ProductCardProps) {
  const addToCart = useStore((state) => state.addToCart)
  const cart = useStore((state) => state.cart)
  const isInCart = cart.some((item) => item.product.id === product.id)

  const handleAddToCart = (e: React.MouseEvent) => {
    e.stopPropagation()
    addToCart(product)
  }

  return (
    <Card
      className="group cursor-pointer overflow-hidden border-border bg-card transition-all hover:border-accent hover:shadow-lg hover:shadow-accent/10"
      onClick={onClick}
    >
      <CardContent className="p-0">
        <div className="relative aspect-video overflow-hidden">
          <div className="absolute inset-0 flex">
            <div className="relative w-1/2 overflow-hidden">
              <Image
                src={product.imageBefore}
                alt={`${product.title} before`}
                fill
                className="object-cover transition-transform group-hover:scale-105"
                sizes="(max-width: 768px) 50vw, 25vw"
              />
              <div className="absolute bottom-2 left-2 rounded bg-background/80 px-1.5 py-0.5 text-[10px] font-medium text-foreground backdrop-blur-sm">
                Before
              </div>
            </div>
            <div className="relative w-1/2 overflow-hidden">
              <Image
                src={product.imageAfter}
                alt={`${product.title} after`}
                fill
                className="object-cover transition-transform group-hover:scale-105"
                sizes="(max-width: 768px) 50vw, 25vw"
              />
              <div className="absolute bottom-2 right-2 rounded bg-accent/90 px-1.5 py-0.5 text-[10px] font-medium text-accent-foreground backdrop-blur-sm">
                After
              </div>
            </div>
          </div>
          <div className="absolute left-1/2 top-0 h-full w-px -translate-x-1/2 bg-background/50" />
        </div>

        <div className="p-4">
          <div className="mb-2 flex flex-wrap gap-1.5">
            <Badge variant="secondary" className="text-[10px]">
              {product.camera}
            </Badge>
            <Badge variant="outline" className="text-[10px]">
              {product.scenario}
            </Badge>
          </div>

          <h3 className="mb-1 line-clamp-1 text-sm font-semibold text-card-foreground">
            {product.title}
          </h3>

          <div className="flex items-center justify-between">
            <span className="text-lg font-bold text-card-foreground">
              ${product.price.toFixed(2)}
            </span>
            <Button
              size="sm"
              variant={isInCart ? "secondary" : "default"}
              className="h-8 w-8 p-0"
              onClick={handleAddToCart}
              disabled={isInCart}
            >
              <Plus className={`h-4 w-4 ${isInCart ? "rotate-45" : ""}`} />
              <span className="sr-only">
                {isInCart ? "Added to cart" : "Add to cart"}
              </span>
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
