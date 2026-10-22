import { Link, NavLink, Outlet } from 'react-router-dom'

export default function Layout() {
  return (
    <div className="flex min-h-screen flex-col bg-white text-neutral-900">
      <header className="sticky top-0 z-40 border-b border-neutral-200 bg-white/90 backdrop-blur">
        <div className="mx-auto flex h-16 w-full max-w-6xl items-center justify-between px-4 sm:px-6">
          <Link to="/" className="text-lg font-semibold tracking-tight">
            Shop
          </Link>
          <nav className="flex items-center gap-6 text-sm">
            <NavLink
              to="/"
              end
              className={({ isActive }) =>
                isActive ? 'font-medium text-neutral-900' : 'text-neutral-500 hover:text-neutral-900'
              }
            >
              Products
            </NavLink>
            <NavLink
              to="/cart"
              className={({ isActive }) =>
                isActive ? 'font-medium text-neutral-900' : 'text-neutral-500 hover:text-neutral-900'
              }
            >
              Cart
            </NavLink>
          </nav>
        </div>
      </header>

      <main className="mx-auto w-full max-w-6xl flex-1 px-4 py-8 sm:px-6 sm:py-10">
        <Outlet />
      </main>

      <footer className="border-t border-neutral-200 py-6 text-center text-xs text-neutral-500">
        Demo store — no real checkout.
      </footer>
    </div>
  )
}
