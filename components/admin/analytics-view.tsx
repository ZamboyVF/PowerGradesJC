"use client"

import { DollarSign, ShoppingBag, Package, TrendingUp } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { useAdminStore, getAnalytics } from "@/lib/admin-store"

export function AnalyticsView() {
  const { orders, products } = useAdminStore()
  const analytics = getAnalytics(orders, products)

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold tracking-tight">Analytics Overview</h2>
        <p className="text-muted-foreground">Track your store performance and sales metrics.</p>
      </div>

      {/* Stats Grid */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card className="bg-card border-border">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Total Revenue</CardTitle>
            <DollarSign className="h-4 w-4 text-accent" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">${analytics.totalRevenue.toFixed(2)}</div>
            <p className="text-xs text-muted-foreground">From {analytics.totalOrders} orders</p>
          </CardContent>
        </Card>

        <Card className="bg-card border-border">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Total Orders</CardTitle>
            <ShoppingBag className="h-4 w-4 text-chart-2" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{analytics.totalOrders}</div>
            <p className="text-xs text-muted-foreground">Completed purchases</p>
          </CardContent>
        </Card>

        <Card className="bg-card border-border">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Products</CardTitle>
            <Package className="h-4 w-4 text-chart-4" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{analytics.totalProducts}</div>
            <p className="text-xs text-muted-foreground">Power Grades in catalog</p>
          </CardContent>
        </Card>

        <Card className="bg-card border-border">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Avg. Order Value</CardTitle>
            <TrendingUp className="h-4 w-4 text-chart-5" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">${analytics.averageOrderValue.toFixed(2)}</div>
            <p className="text-xs text-muted-foreground">Per transaction</p>
          </CardContent>
        </Card>
      </div>

      {/* Top Selling */}
      <Card className="bg-card border-border">
        <CardHeader>
          <CardTitle>Top Selling Power Grades</CardTitle>
          <CardDescription>Your best performing products by sales volume.</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {analytics.topSelling.length > 0 ? (
              analytics.topSelling.map((item, index) => (
                <div key={item.product?.id} className="flex items-center gap-4">
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-secondary text-sm font-bold">
                    #{index + 1}
                  </div>
                  <div className="h-12 w-20 overflow-hidden rounded-md">
                    <img
                      src={item.product?.imageAfter}
                      alt={item.product?.title}
                      className="h-full w-full object-cover"
                    />
                  </div>
                  <div className="flex-1">
                    <p className="font-medium">{item.product?.title}</p>
                    <p className="text-sm text-muted-foreground">{item.product?.category}</p>
                  </div>
                  <div className="text-right">
                    <p className="font-semibold">{item.count} sales</p>
                    <p className="text-sm text-muted-foreground">
                      ${((item.product?.price || 0) * item.count).toFixed(2)}
                    </p>
                  </div>
                </div>
              ))
            ) : (
              <p className="text-center text-muted-foreground py-8">No sales data yet</p>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
