"use client"

import { create } from "zustand"

export interface PowerGrade {
  id: string
  title: string
  category: string
  camera: string
  scenario: string
  price: number
  imageBefore: string
  imageAfter: string
  description: string
  nodeStructure: string
  compatibility: string[]
}

interface CartItem {
  product: PowerGrade
  quantity: number
}

interface StoreState {
  cart: CartItem[]
  addToCart: (product: PowerGrade) => void
  removeFromCart: (productId: string) => void
  clearCart: () => void
  getCartTotal: () => number
  getCartCount: () => number
}

export const useStore = create<StoreState>((set, get) => ({
  cart: [],
  addToCart: (product) => {
    set((state) => {
      const existingItem = state.cart.find((item) => item.product.id === product.id)
      if (existingItem) {
        return state
      }
      return { cart: [...state.cart, { product, quantity: 1 }] }
    })
  },
  removeFromCart: (productId) => {
    set((state) => ({
      cart: state.cart.filter((item) => item.product.id !== productId),
    }))
  },
  clearCart: () => set({ cart: [] }),
  getCartTotal: () => {
    const state = get()
    return state.cart.reduce((total, item) => total + item.product.price * item.quantity, 0)
  },
  getCartCount: () => {
    const state = get()
    return state.cart.length
  },
}))

export const powerGrades: PowerGrade[] = [
  {
    id: "1",
    title: "Golden Hour Cinematic",
    category: "Rec.709",
    camera: "Sony S-Log3",
    scenario: "Cinematic",
    price: 2.50,
    imageBefore: "https://images.unsplash.com/photo-1518837695005-2083093ee35b?w=800&q=80",
    imageAfter: "https://images.unsplash.com/photo-1507400492013-162706c8c05e?w=800&q=80",
    description: "A warm, golden cinematic look perfect for sunset scenes and romantic moments. Features lifted shadows and golden highlights.",
    nodeStructure: "3 Nodes: Color Space Transform > Primary Correction > Film Emulation",
    compatibility: ["DaVinci Resolve 17+", "DaVinci Resolve 18+", "DaVinci Resolve 19"],
  },
  {
    id: "2",
    title: "Neon Nightclub",
    category: "HDR",
    camera: "RED raw",
    scenario: "Nightclub",
    price: 2.50,
    imageBefore: "https://images.unsplash.com/photo-1574391884720-bbc3740c59d1?w=800&q=80",
    imageAfter: "https://images.unsplash.com/photo-1571266028243-d220c6a74fe4?w=800&q=80",
    description: "Vibrant neon colors with deep blacks. Perfect for music videos and nightlife scenes with strong color separation.",
    nodeStructure: "4 Nodes: CST > Contrast > Saturation Boost > Glow",
    compatibility: ["DaVinci Resolve 18+", "DaVinci Resolve 19"],
  },
  {
    id: "3",
    title: "Nordic Minimal",
    category: "Log",
    camera: "ARRI LogC",
    scenario: "Studio",
    price: 2.50,
    imageBefore: "https://images.unsplash.com/photo-1604014237800-1c9102c219da?w=800&q=80",
    imageAfter: "https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?w=800&q=80",
    description: "Clean, desaturated Nordic look with cool tones. Ideal for interior design, architecture, and product shots.",
    nodeStructure: "2 Nodes: Log to Rec.709 > Desaturation Curve",
    compatibility: ["DaVinci Resolve 17+", "DaVinci Resolve 18+", "DaVinci Resolve 19"],
  },
  {
    id: "4",
    title: "Vintage Film 70s",
    category: "Rec.709",
    camera: "Apple ProRes",
    scenario: "Vintage",
    price: 2.50,
    imageBefore: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&q=80",
    imageAfter: "https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=800&q=80",
    description: "Authentic 70s film emulation with faded blacks, warm highlights, and subtle grain. Great for nostalgic content.",
    nodeStructure: "5 Nodes: CST > Lift/Gamma/Gain > Halation > Grain > Vignette",
    compatibility: ["DaVinci Resolve 17+", "DaVinci Resolve 18+", "DaVinci Resolve 19"],
  },
  {
    id: "5",
    title: "Teal & Orange",
    category: "RAW",
    camera: "Lumix V-Log",
    scenario: "Cinematic",
    price: 2.50,
    imageBefore: "https://images.unsplash.com/photo-1682687982501-1e58ab814714?w=800&q=80",
    imageAfter: "https://images.unsplash.com/photo-1682695797221-8164ff1fafc9?w=800&q=80",
    description: "The classic Hollywood blockbuster look. Complementary teal shadows and orange skin tones for maximum visual impact.",
    nodeStructure: "3 Nodes: CST > HSL Qualifier > Color Wheels",
    compatibility: ["DaVinci Resolve 18+", "DaVinci Resolve 19"],
  },
  {
    id: "6",
    title: "Documentary Natural",
    category: "Log",
    camera: "Sony S-Log3",
    scenario: "Outdoors",
    price: 2.50,
    imageBefore: "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=800&q=80",
    imageAfter: "https://images.unsplash.com/photo-1426604966848-d7adac402bff?w=800&q=80",
    description: "Natural, true-to-life colors with subtle contrast enhancement. Perfect for documentaries and nature content.",
    nodeStructure: "2 Nodes: S-Log3 to Rec.709 > Subtle Contrast",
    compatibility: ["DaVinci Resolve 17+", "DaVinci Resolve 18+", "DaVinci Resolve 19"],
  },
  {
    id: "7",
    title: "Moody Bar Scene",
    category: "HDR",
    camera: "RED raw",
    scenario: "Bar",
    price: 2.50,
    imageBefore: "https://images.unsplash.com/photo-1572116469696-31de0f17cc34?w=800&q=80",
    imageAfter: "https://images.unsplash.com/photo-1514933651103-005eec06c04b?w=800&q=80",
    description: "Dark, moody atmosphere with warm practicals and deep shadows. Ideal for bar scenes and intimate settings.",
    nodeStructure: "4 Nodes: CST > Shadow Crush > Warm Highlights > Vignette",
    compatibility: ["DaVinci Resolve 18+", "DaVinci Resolve 19"],
  },
  {
    id: "8",
    title: "High Fashion",
    category: "Rec.709",
    camera: "ARRI LogC",
    scenario: "Studio",
    price: 2.50,
    imageBefore: "https://images.unsplash.com/photo-1509631179647-0177331693ae?w=800&q=80",
    imageAfter: "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=800&q=80",
    description: "High contrast, punchy look with rich blacks and creamy skin tones. Perfect for fashion and beauty content.",
    nodeStructure: "3 Nodes: LogC to Rec.709 > S-Curve > Skin Tone Protection",
    compatibility: ["DaVinci Resolve 17+", "DaVinci Resolve 18+", "DaVinci Resolve 19"],
  },
  {
    id: "9",
    title: "Bleach Bypass",
    category: "RAW",
    camera: "Apple ProRes",
    scenario: "Cinematic",
    price: 2.50,
    imageBefore: "https://images.unsplash.com/photo-1533450718592-29d45635f0a9?w=800&q=80",
    imageAfter: "https://images.unsplash.com/photo-1478098711619-5ab0b478d6e6?w=800&q=80",
    description: "Classic bleach bypass film look with reduced saturation and increased contrast. Great for gritty, dramatic scenes.",
    nodeStructure: "3 Nodes: Desaturation > High Contrast > Silver Retention",
    compatibility: ["DaVinci Resolve 17+", "DaVinci Resolve 18+", "DaVinci Resolve 19"],
  },
  {
    id: "10",
    title: "Summer Vibes",
    category: "Log",
    camera: "Lumix V-Log",
    scenario: "Outdoors",
    price: 2.50,
    imageBefore: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=800&q=80",
    imageAfter: "https://images.unsplash.com/photo-1473496169904-658ba7c44d8a?w=800&q=80",
    description: "Bright, airy summer look with lifted shadows and warm tones. Perfect for travel vlogs and lifestyle content.",
    nodeStructure: "3 Nodes: V-Log to Rec.709 > Lift Shadows > Warm Grade",
    compatibility: ["DaVinci Resolve 18+", "DaVinci Resolve 19"],
  },
  {
    id: "11",
    title: "Cyberpunk City",
    category: "HDR",
    camera: "Sony S-Log3",
    scenario: "Nightclub",
    price: 2.50,
    imageBefore: "https://images.unsplash.com/photo-1480714378408-67cf0d13bc1b?w=800&q=80",
    imageAfter: "https://images.unsplash.com/photo-1519501025264-65ba15a82390?w=800&q=80",
    description: "Futuristic cyberpunk aesthetic with strong magenta and cyan tones. Perfect for sci-fi and urban night scenes.",
    nodeStructure: "4 Nodes: CST > Split Toning > Glow > Color Isolation",
    compatibility: ["DaVinci Resolve 18+", "DaVinci Resolve 19"],
  },
  {
    id: "12",
    title: "Classic B&W",
    category: "Rec.709",
    camera: "ARRI LogC",
    scenario: "Studio",
    price: 2.50,
    imageBefore: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=800&q=80",
    imageAfter: "https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?w=800&q=80",
    description: "Timeless black and white with beautiful tonal range and subtle film grain. Ideal for portraits and artistic work.",
    nodeStructure: "3 Nodes: Desaturation > Zone System Contrast > Film Grain",
    compatibility: ["DaVinci Resolve 17+", "DaVinci Resolve 18+", "DaVinci Resolve 19"],
  },
]
