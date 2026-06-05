"use client"

import { BarChart3, Package, ShoppingCart, Settings, LogOut, Palette } from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import Link from "next/link"

interface AdminSidebarProps {
  activeTab: "analytics" | "catalog" | "orders"
  onTabChange: (tab: "analytics" | "catalog" | "orders") => void
}

const navItems = [
  { id: "analytics" as const, label: "Analytics", icon: BarChart3 },
  { id: "catalog" as const, label: "Catalog", icon: Package },
  { id: "orders" as const, label: "Orders", icon: ShoppingCart },
]

export function AdminSidebar({ activeTab, onTabChange }: AdminSidebarProps) {
  return (
    <aside className="fixed left-0 top-0 z-40 flex h-screen w-64 flex-col border-r border-border bg-sidebar">
      {/* Logo */}
      <div className="flex h-16 items-center gap-3 border-b border-sidebar-border px-6">
        <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-accent">
          <Palette className="h-5 w-5 text-accent-foreground" />
        </div>
        <div>
          <h1 className="text-sm font-semibold text-sidebar-foreground">Power Grades</h1>
          <p className="text-xs text-muted-foreground">Admin Dashboard</p>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 space-y-1 p-4">
        <p className="mb-3 px-3 text-xs font-medium uppercase tracking-wider text-muted-foreground">
          Management
        </p>
        {navItems.map((item) => (
          <button
            key={item.id}
            onClick={() => onTabChange(item.id)}
            className={cn(
              "flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors",
              activeTab === item.id
                ? "bg-sidebar-accent text-sidebar-accent-foreground"
                : "text-muted-foreground hover:bg-sidebar-accent/50 hover:text-sidebar-foreground"
            )}
          >
            <item.icon className="h-5 w-5" />
            {item.label}
          </button>
        ))}
      </nav>

      {/* Footer */}
      <div className="border-t border-sidebar-border p-4">
        <Link href="/">
          <Button variant="ghost" className="w-full justify-start gap-3 text-muted-foreground hover:text-foreground">
            <LogOut className="h-5 w-5" />
            Back to Store
          </Button>
        </Link>
      </div>
    </aside>
  )
}
