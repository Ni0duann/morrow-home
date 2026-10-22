import { createContext, useCallback, useContext, useEffect, useMemo, useReducer } from 'react'
import type { ReactNode } from 'react'
import { products } from '@/data/products'
import type { Colorway, Product } from '@/data/products'

export const MAX_QUANTITY = 10
export const CART_STORAGE_KEY = 'morrow.cart.v1'

export type CartLine = {
  productId: string
  colorId: string
  quantity: number
}

export type CartItem = {
  key: string
  product: Product
  color: Colorway
  quantity: number
  lineTotalCents: number
}

type CartState = { lines: CartLine[] }

type CartAction =
  | { type: 'add'; productId: string; colorId: string }
  | { type: 'increment'; productId: string; colorId: string }
  | { type: 'decrement'; productId: string; colorId: string }
  | { type: 'remove'; productId: string; colorId: string }

type CartContextValue = {
  items: CartItem[]
  itemCount: number
  subtotalCents: number
  addItem: (productId: string, colorId: string) => void
  increment: (productId: string, colorId: string) => void
  decrement: (productId: string, colorId: string) => void
  removeItem: (productId: string, colorId: string) => void
}

const CartContext = createContext<CartContextValue | null>(null)

const lineKey = (productId: string, colorId: string) => `${productId}:${colorId}`

function productById(productId: string): Product | undefined {
  return products.find((product) => product.id === productId)
}

function colorById(product: Product | undefined, colorId: string): Colorway | undefined {
  return product?.colors.find((entry) => entry.id === colorId)
}

function isValidLine(value: unknown): value is CartLine {
  if (typeof value !== 'object' || value === null) return false
  const candidate = value as Record<string, unknown>
  if (
    typeof candidate.productId !== 'string' ||
    typeof candidate.colorId !== 'string' ||
    typeof candidate.quantity !== 'number'
  ) {
    return false
  }
  if (
    !Number.isInteger(candidate.quantity) ||
    candidate.quantity < 1 ||
    candidate.quantity > MAX_QUANTITY
  ) {
    return false
  }
  return Boolean(colorById(productById(candidate.productId), candidate.colorId))
}

function readStoredLines(): CartLine[] {
  try {
    const raw = localStorage.getItem(CART_STORAGE_KEY)
    if (!raw) return []
    const parsed: unknown = JSON.parse(raw)
    if (!Array.isArray(parsed)) return []

    const merged = new Map<string, CartLine>()
    for (const value of parsed) {
      if (!isValidLine(value)) continue
      const key = lineKey(value.productId, value.colorId)
      const existing = merged.get(key)
      if (existing) {
        existing.quantity = Math.min(MAX_QUANTITY, existing.quantity + value.quantity)
      } else {
        merged.set(key, { ...value })
      }
    }
    return [...merged.values()]
  } catch {
    return []
  }
}

function createInitialState(): CartState {
  return { lines: readStoredLines() }
}

function increase(state: CartState, productId: string, colorId: string): CartState {
  const product = productById(productId)
  if (!colorById(product, colorId)) return state

  const key = lineKey(productId, colorId)
  const existing = state.lines.find((line) => lineKey(line.productId, line.colorId) === key)
  if (!existing) return { lines: [...state.lines, { productId, colorId, quantity: 1 }] }
  if (existing.quantity >= MAX_QUANTITY) return state

  return {
    lines: state.lines.map((line) =>
      lineKey(line.productId, line.colorId) === key
        ? { ...line, quantity: line.quantity + 1 }
        : line,
    ),
  }
}

function cartReducer(state: CartState, action: CartAction): CartState {
  const key = lineKey(action.productId, action.colorId)

  switch (action.type) {
    case 'add':
    case 'increment':
      return increase(state, action.productId, action.colorId)
    case 'decrement':
      return {
        lines: state.lines.map((line) =>
          lineKey(line.productId, line.colorId) === key && line.quantity > 1
            ? { ...line, quantity: line.quantity - 1 }
            : line,
        ),
      }
    case 'remove':
      return {
        lines: state.lines.filter((line) => lineKey(line.productId, line.colorId) !== key),
      }
  }
}

export function CartProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(cartReducer, undefined, createInitialState)

  useEffect(() => {
    try {
      localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(state.lines))
    } catch {
      // 存储不可用时保持内存状态，不影响本次会话。
    }
  }, [state.lines])

  const items = useMemo<CartItem[]>(() => {
    return state.lines.flatMap((line) => {
      const product = productById(line.productId)
      const color = colorById(product, line.colorId)
      if (!product || !color) return []
      return [
        {
          key: lineKey(line.productId, line.colorId),
          product,
          color,
          quantity: line.quantity,
          lineTotalCents: product.priceCents * line.quantity,
        },
      ]
    })
  }, [state.lines])

  const itemCount = useMemo(
    () => items.reduce((total, item) => total + item.quantity, 0),
    [items],
  )

  const subtotalCents = useMemo(
    () => items.reduce((total, item) => total + item.lineTotalCents, 0),
    [items],
  )

  const addItem = useCallback((productId: string, colorId: string) => {
    dispatch({ type: 'add', productId, colorId })
  }, [])

  const increment = useCallback((productId: string, colorId: string) => {
    dispatch({ type: 'increment', productId, colorId })
  }, [])

  const decrement = useCallback((productId: string, colorId: string) => {
    dispatch({ type: 'decrement', productId, colorId })
  }, [])

  const removeItem = useCallback((productId: string, colorId: string) => {
    dispatch({ type: 'remove', productId, colorId })
  }, [])

  const value = useMemo<CartContextValue>(
    () => ({ items, itemCount, subtotalCents, addItem, increment, decrement, removeItem }),
    [items, itemCount, subtotalCents, addItem, increment, decrement, removeItem],
  )

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>
}

export function useCart(): CartContextValue {
  const context = useContext(CartContext)
  if (!context) throw new Error('useCart must be used inside CartProvider')
  return context
}
