import { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react'
import type { ReactNode } from 'react'
import { Link } from 'react-router-dom'

type ToastAction = { label: string; to: string }

type ToastState = {
  message: string
  action?: ToastAction
}

type ToastContextValue = {
  showToast: (message: string, action?: ToastAction) => void
}

const ToastContext = createContext<ToastContextValue | null>(null)

export function ToastProvider({ children }: { children: ReactNode }) {
  const [toast, setToast] = useState<ToastState | null>(null)

  const showToast = useCallback((message: string, action?: ToastAction) => {
    setToast({ message, action })
  }, [])

  useEffect(() => {
    if (!toast) return
    const timer = window.setTimeout(() => setToast(null), 3200)
    return () => window.clearTimeout(timer)
  }, [toast])

  const value = useMemo<ToastContextValue>(() => ({ showToast }), [showToast])

  return (
    <ToastContext.Provider value={value}>
      {children}
      {toast && (
        <div className="pointer-events-none fixed inset-x-0 bottom-24 z-50 flex justify-center px-4">
          <div
            role="status"
            aria-live="polite"
            className="pointer-events-auto flex items-center gap-3 rounded-full bg-ink px-5 py-3 text-sm text-ivory shadow-xl"
          >
            <span>{toast.message}</span>
            {toast.action && (
              <Link
                to={toast.action.to}
                onClick={() => setToast(null)}
                className="rounded-full font-medium underline underline-offset-4 hover:text-sand focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-ivory"
              >
                {toast.action.label}
              </Link>
            )}
          </div>
        </div>
      )}
    </ToastContext.Provider>
  )
}

export function useToast(): ToastContextValue {
  const context = useContext(ToastContext)
  if (!context) throw new Error('useToast must be used inside ToastProvider')
  return context
}
