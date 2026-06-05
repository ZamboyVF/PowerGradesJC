"use client"

import { useState } from "react"
import { AdminSidebar } from "@/components/admin/admin-sidebar"
import { AnalyticsView } from "@/components/admin/analytics-view"
import { CatalogView } from "@/components/admin/catalog-view"
import { OrdersView } from "@/components/admin/orders-view"

export default function AdminPage() {
  const [activeTab, setActiveTab] = useState<"analytics" | "catalog" | "orders">("catalog")

  return (
    <div className="min-h-screen bg-background">
      <AdminSidebar activeTab={activeTab} onTabChange={setActiveTab} />
      
      {/* Main content */}
      <main className="ml-64 min-h-screen p-8">
        {activeTab === "analytics" && <AnalyticsView />}
        {activeTab === "catalog" && <CatalogView />}
        {activeTab === "orders" && <OrdersView />}
      </main>
    </div>
  )
}
