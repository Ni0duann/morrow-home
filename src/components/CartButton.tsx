import { Link } from 'react-router-dom'
import { useCart } from '@/cart/CartContext'
import { useI18n } from '@/i18n/I18nContext'

export default function CartButton() {
  const { itemCount } = useCart()
  const { t } = useI18n()
  const label = itemCount > 0 ? t('nav.cartCount', { count: itemCount }) : t('nav.cart')

  return (
    <Link
      to="/cart"
      aria-label={label}
      className="relative inline-flex h-9 w-9 items-center justify-center rounded-full text-ink transition-colors hover:bg-sand"
    >
      <svg
        aria-hidden="true"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="h-5 w-5"
      >
        <path d="M6 8h12l-1 12H7L6 8Z" />
        <path d="M9 8V6.5a3 3 0 0 1 6 0V8" />
      </svg>
      {itemCount > 0 && (
        <span className="absolute -right-0.5 -top-0.5 flex h-4 min-w-4 items-center justify-center rounded-full bg-clay px-1 text-[10px] font-semibold leading-none text-ivory">
          {itemCount > 9 ? '9+' : itemCount}
        </span>
      )}
    </Link>
  )
}
