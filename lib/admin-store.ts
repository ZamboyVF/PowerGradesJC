"use client"

import { create } from "zustand"
import { PowerGrade, powerGrades } from "./store"

export interface Order {
  id: string
  customerEmail: string
  customerName: string
  items: { product: PowerGrade; quantity: number }[]
  total: number
  status: "completed" | "pending" | "refunded"
  date: string
  paymentMethod: string
}

interface AdminState {
  products: PowerGrade[]
  orders: Order[]
  addProduct: (product: Omit<PowerGrade, "id">) => void
  updateProduct: (id: string, product: Partial<PowerGrade>) => void
  deleteProduct: (id: string) => void
}

// Mock orders data
const mockOrders: Order[] = [
  {
    id: "ORD-001",
    customerEmail: "filmmaker@studio.com",
    customerName: "James Anderson",
    items: [
      { product: powerGrades[0], quantity: 1 },
      { product: powerGrades[1], quantity: 1 },
    ],
    total: 5.00,
    status: "completed",
    date: "2024-01-15T10:30:00Z",
    paymentMethod: "Credit Card",
  },
  {
    id: "ORD-002",
    customerEmail: "colorist@post.io",
    customerName: "Sarah Chen",
    items: [
      { product: powerGrades[2], quantity: 1 },
      { product: powerGrades[4], quantity: 1 },
      { product: powerGrades[7], quantity: 1 },
    ],
    total: 7.50,
    status: "completed",
    date: "2024-01-14T15:45:00Z",
    paymentMethod: "PayPal",
  },
  {
    id: "ORD-003",
    customerEmail: "video@agency.com",
    customerName: "Michael Torres",
    items: [{ product: powerGrades[10], quantity: 1 }],
    total: 2.50,
    status: "pending",
    date: "2024-01-14T09:15:00Z",
    paymentMethod: "Credit Card",
  },
  {
    id: "ORD-004",
    customerEmail: "dp@cinema.net",
    customerName: "Emma Williams",
    items: [
      { product: powerGrades[3], quantity: 1 },
      { product: powerGrades[5], quantity: 1 },
      { product: powerGrades[8], quantity: 1 },
      { product: powerGrades[11], quantity: 1 },
    ],
    total: 10.00,
    status: "completed",
    date: "2024-01-13T18:20:00Z",
    paymentMethod: "Credit Card",
  },
  {
    id: "ORD-005",
    customerEmail: "editor@media.co",
    customerName: "David Kim",
    items: [{ product: powerGrades[6], quantity: 1 }],
    total: 2.50,
    status: "refunded",
    date: "2024-01-12T11:00:00Z",
    paymentMethod: "PayPal",
  },
  {
    id: "ORD-006",
    customerEmail: "producer@films.com",
    customerName: "Lisa Park",
    items: [
      { product: powerGrades[1], quantity: 1 },
      { product: powerGrades[9], quantity: 1 },
    ],
    total: 5.00,
    status: "completed",
    date: "2024-01-11T14:30:00Z",
    paymentMethod: "Credit Card",
  },
]

export const useAdminStore = create<AdminState>((set) => ({
  products: [...powerGrades],
  orders: mockOrders,
  addProduct: (product) => {
    set((state) => ({
      products: [
        ...state.products,
        { ...product, id: `${Date.now()}` },
      ],
    }))
  },
  updateProduct: (id, updates) => {
    set((state) => ({
      products: state.products.map((p) =>
        p.id === id ? { ...p, ...updates } : p
      ),
    }))
  },
  deleteProduct: (id) => {
    set((state) => ({
      products: state.products.filter((p) => p.id !== id),
    }))
  },
}))

// Analytics helpers
export function getAnalytics(orders: Order[], products: PowerGrade[]) {
  const completedOrders = orders.filter((o) => o.status === "completed")
  const totalRevenue = completedOrders.reduce((sum, o) => sum + o.total, 0)
  const totalOrders = completedOrders.length
  const totalProducts = products.length

  // Count sales per product
  const salesCount: Record<string, number> = {}
  completedOrders.forEach((order) => {
    order.items.forEach((item) => {
      salesCount[item.product.id] = (salesCount[item.product.id] || 0) + item.quantity
    })
  })

  // Get top selling grades
  const topSelling = Object.entries(salesCount)
    .map(([id, count]) => ({
      product: products.find((p) => p.id === id),
      count,
    }))
    .filter((item) => item.product)
    .sort((a, b) => b.count - a.count)
    .slice(0, 5)

  return {
    totalRevenue,
    totalOrders,
    totalProducts,
    topSelling,
    averageOrderValue: totalOrders > 0 ? totalRevenue / totalOrders : 0,
  }
}
