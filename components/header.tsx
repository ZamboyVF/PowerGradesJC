"use client"

import { Search, ShoppingCart, Settings } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { useStore } from "@/lib/store"
import Link from "next/link"

interface HeaderProps {
  searchQuery: string
  onSearchChange: (query: string) => void
  onCartClick: () => void
}

export function Header({ searchQuery, onSearchChange, onCartClick }: HeaderProps) {
  const cartCount = useStore((state) => state.getCartCount())

  return (
    <header className="sticky top-0 z-50 border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="flex h-16 items-center justify-between px-4 lg:px-6">
        <div className="flex items-center gap-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-md bg-primary">
            <span className="text-sm font-bold text-primary-foreground">PG</span>
          </div>
          <span className="hidden text-lg font-semibold sm:inline-block">Power Grades</span>
        </div>

        <div className="flex flex-1 items-center justify-center px-4 lg:px-8">
          <div className="relative w-full max-w-md">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Search power grades..."
              className="h-9 w-full bg-secondary pl-9"
              value={searchQuery}
              onChange={(e) => onSearchChange(e.target.value)}
            />
          </div>
        </div>

        <div className="flex items-center gap-2">
          <Link href="/admin">
            <Button variant="ghost" size="icon" className="text-muted-foreground hover:text-foreground">
              <Settings className="h-5 w-5" />
              <span className="sr-only">Admin Dashboard</span>
            </Button>
          </Link>
          <Button
            variant="ghost"
            size="icon"
            className="relative"
            onClick={onCartClick}
          >
            <ShoppingCart className="h-5 w-5" />
            {cartCount > 0 && (
              <span className="absolute -right-1 -top-1 flex h-5 w-5 items-center justify-center rounded-full bg-accent text-xs font-medium text-accent-foreground">
                {cartCount}
              </span>
            )}
            <span className="sr-only">Shopping cart</span>
          </Button>
        </div>
      </div>
    </header>
  )
}
