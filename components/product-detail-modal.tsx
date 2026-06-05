"use client"

import { useState } from "react"
import Image from "next/image"
import { X } from "lucide-react"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Slider } from "@/components/ui/slider"
import { PowerGrade, useStore } from "@/lib/store"

interface ProductDetailModalProps {
  product: PowerGrade | null
  open: boolean
  onClose: () => void
}

export function ProductDetailModal({ product, open, onClose }: ProductDetailModalProps) {
  const [sliderValue, setSliderValue] = useState([50])
  const addToCart = useStore((state) => state.addToCart)
  const cart = useStore((state) => state.cart)
  const isInCart = product ? cart.some((item) => item.product.id === product.id) : false

  if (!product) return null

  const handleAddToCart = () => {
    addToCart(product)
  }

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl border-border bg-card p-0">
        <DialogHeader className="sr-only">
          <DialogTitle>{product.title}</DialogTitle>
        </DialogHeader>
        <button
          onClick={onClose}
          className="absolute right-4 top-4 z-10 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
        >
          <X className="h-5 w-5 text-foreground" />
          <span className="sr-only">Close</span>
        </button>

        <div className="grid gap-6 lg:grid-cols-2">
          <div className="relative aspect-video lg:aspect-square">
            <div className="absolute inset-0 overflow-hidden rounded-tl-lg lg:rounded-bl-lg lg:rounded-tl-lg">
              <Image
                src={product.imageBefore}
                alt={`${product.title} before`}
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
            </div>
            <div
              className="absolute inset-0 overflow-hidden"
              style={{ clipPath: `inset(0 0 0 ${sliderValue[0]}%)` }}
            >
              <Image
                src={product.imageAfter}
                alt={`${product.title} after`}
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
            </div>
            <div
              className="absolute top-0 h-full w-0.5 bg-accent shadow-lg"
              style={{ left: `${sliderValue[0]}%` }}
            >
              <div className="absolute left-1/2 top-1/2 flex h-8 w-8 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-accent text-accent-foreground shadow-lg">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="m9 18 6-6-6-6" />
                  <path d="m15 18-6-6 6-6" />
                </svg>
              </div>
            </div>
            <div className="absolute bottom-4 left-4 rounded bg-background/80 px-2 py-1 text-xs font-medium backdrop-blur-sm">
              Before
            </div>
            <div className="absolute bottom-4 right-4 rounded bg-accent/90 px-2 py-1 text-xs font-medium text-accent-foreground backdrop-blur-sm">
              After
            </div>
          </div>

          <div className="flex flex-col p-6 lg:py-8">
            <div className="mb-3 flex flex-wrap gap-2">
              <Badge variant="secondary">{product.category}</Badge>
              <Badge variant="outline">{product.camera}</Badge>
              <Badge variant="outline">{product.scenario}</Badge>
            </div>

            <h2 className="mb-3 text-2xl font-bold text-card-foreground">{product.title}</h2>

            <p className="mb-4 text-sm leading-relaxed text-muted-foreground">
              {product.description}
            </p>

            <div className="mb-4 rounded-lg bg-secondary p-4">
              <h4 className="mb-2 text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                Node Structure
              </h4>
              <p className="text-sm text-secondary-foreground">{product.nodeStructure}</p>
            </div>

            <div className="mb-6">
              <h4 className="mb-2 text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                Compatibility
              </h4>
              <div className="flex flex-wrap gap-1.5">
                {product.compatibility.map((version) => (
                  <Badge key={version} variant="secondary" className="text-xs">
                    {version}
                  </Badge>
                ))}
              </div>
            </div>

            <div className="mb-6">
              <p className="mb-2 text-xs font-medium text-muted-foreground">
                Drag to compare Before / After
              </p>
              <Slider
                value={sliderValue}
                onValueChange={setSliderValue}
                max={100}
                step={1}
                className="w-full"
              />
            </div>

            <div className="mt-auto">
              <Button
                size="lg"
                className="w-full text-base"
                onClick={handleAddToCart}
                disabled={isInCart}
              >
                {isInCart ? "Added to Cart" : `Add to Cart - $${product.price.toFixed(2)}`}
              </Button>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
