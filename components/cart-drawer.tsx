"use client"

import Image from "next/image"
import { X, CreditCard } from "lucide-react"
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { ScrollArea } from "@/components/ui/scroll-area"
import { useStore } from "@/lib/store"

interface CartDrawerProps {
  open: boolean
  onClose: () => void
}

export function CartDrawer({ open, onClose }: CartDrawerProps) {
  const cart = useStore((state) => state.cart)
  const removeFromCart = useStore((state) => state.removeFromCart)
  const getCartTotal = useStore((state) => state.getCartTotal)

  const total = getCartTotal()

  return (
    <Sheet open={open} onOpenChange={onClose}>
      <SheetContent className="flex w-full flex-col border-border bg-card sm:max-w-md">
        <SheetHeader>
          <SheetTitle className="text-card-foreground">Shopping Cart</SheetTitle>
        </SheetHeader>

        {cart.length === 0 ? (
          <div className="flex flex-1 flex-col items-center justify-center text-center">
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
                <circle cx="8" cy="21" r="1" />
                <circle cx="19" cy="21" r="1" />
                <path d="M2.05 2.05h2l2.66 12.42a2 2 0 0 0 2 1.58h9.78a2 2 0 0 0 1.95-1.57l1.65-7.43H5.12" />
              </svg>
            </div>
            <h3 className="mb-1 font-semibold text-card-foreground">Your cart is empty</h3>
            <p className="text-sm text-muted-foreground">
              Add some Power Grades to get started
            </p>
          </div>
        ) : (
          <>
            <ScrollArea className="flex-1 -mx-6 px-6">
              <div className="space-y-4 py-4">
                {cart.map(({ product }) => (
                  <div
                    key={product.id}
                    className="flex gap-3 rounded-lg border border-border bg-secondary/50 p-3"
                  >
                    <div className="relative h-16 w-24 shrink-0 overflow-hidden rounded-md">
                      <Image
                        src={product.imageAfter}
                        alt={product.title}
                        fill
                        className="object-cover"
                        sizes="96px"
                      />
                    </div>
                    <div className="flex flex-1 flex-col justify-between">
                      <div>
                        <h4 className="line-clamp-1 text-sm font-medium text-card-foreground">
                          {product.title}
                        </h4>
                        <p className="text-xs text-muted-foreground">{product.camera}</p>
                      </div>
                      <p className="text-sm font-semibold text-card-foreground">
                        ${product.price.toFixed(2)}
                      </p>
                    </div>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-8 w-8 shrink-0 text-muted-foreground hover:text-destructive"
                      onClick={() => removeFromCart(product.id)}
                    >
                      <X className="h-4 w-4" />
                      <span className="sr-only">Remove {product.title}</span>
                    </Button>
                  </div>
                ))}
              </div>
            </ScrollArea>

            <div className="space-y-4 pt-4">
              <Separator />
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">
                  Total ({cart.length} {cart.length === 1 ? "item" : "items"})
                </span>
                <span className="text-xl font-bold text-card-foreground">
                  ${total.toFixed(2)}
                </span>
              </div>

              <div className="space-y-2">
                <Button className="w-full gap-2" size="lg">
                  <CreditCard className="h-4 w-4" />
                  Pay with Credit / Debit Card
                  <span className="ml-auto flex items-center gap-1 opacity-60">
                    <svg viewBox="0 0 24 24" className="h-4 w-4" fill="currentColor">
                      <path d="M9.5 4.5C9.5 3.67 10.17 3 11 3h2c.83 0 1.5.67 1.5 1.5v1h-5v-1zM5 7h14c1.1 0 2 .9 2 2v10c0 1.1-.9 2-2 2H5c-1.1 0-2-.9-2-2V9c0-1.1.9-2 2-2z" />
                    </svg>
                    <svg viewBox="0 0 24 24" className="h-4 w-4" fill="currentColor">
                      <circle cx="7" cy="12" r="5" />
                      <circle cx="17" cy="12" r="5" opacity="0.7" />
                    </svg>
                  </span>
                </Button>
                <Button
                  variant="outline"
                  className="w-full gap-2 border-[#FFC439] bg-[#FFC439] text-[#003087] hover:bg-[#FFD700] hover:text-[#003087]"
                  size="lg"
                >
                  <svg viewBox="0 0 24 24" className="h-5 w-5" fill="currentColor">
                    <path d="M7.076 21.337H2.47a.641.641 0 0 1-.633-.74L4.944 3.72a.766.766 0 0 1 .757-.64h7.324c2.458 0 4.166.524 5.082 1.556.894 1.007.969 2.254.224 3.707l-.003.006c-.987 1.91-2.787 3.056-5.358 3.414-.336.047-.7.07-1.089.07H9.43l-.984 5.88a.64.64 0 0 1-.632.537H7.076zm11.288-11.7c-.037.208-.08.404-.13.59-.714 2.726-2.82 3.843-5.588 3.843h-.89l-.696 4.41h2.406a.641.641 0 0 0 .633-.537l.026-.137.502-3.182.032-.176a.641.641 0 0 1 .632-.537h.399c2.58 0 4.598-1.049 5.188-4.084.247-1.269.119-2.328-.534-3.072a2.56 2.56 0 0 0-.73-.558c.18.647.26 1.362.174 2.144l.576-.704z" />
                  </svg>
                  Pay with PayPal
                </Button>
              </div>

              <p className="text-center text-xs text-muted-foreground">
                Secure checkout powered by Stripe
              </p>
            </div>
          </>
        )}
      </SheetContent>
    </Sheet>
  )
}
