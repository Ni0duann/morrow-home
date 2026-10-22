import { Link } from 'react-router-dom'
import { MAX_QUANTITY, useCart } from '@/cart/CartContext'
import QuantityStepper from '@/components/QuantityStepper'
import { useToast } from '@/components/Toast'
import { useI18n } from '@/i18n/I18nContext'
import { formatPrice } from '@/lib/format'

export default function Cart() {
  const { items, itemCount, subtotalCents, increment, decrement, removeItem } = useCart()
  const { t, localized } = useI18n()
  const { showToast } = useToast()

  if (items.length === 0) {
    return (
      <section className="flex min-h-[60vh] flex-col items-center justify-center py-20 text-center">
        <div className="flex h-14 w-14 items-center justify-center rounded-full bg-sand">
          <svg
            aria-hidden="true"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.4"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="h-6 w-6 text-warm"
          >
            <path d="M6 8h12l-1 12H7L6 8Z" />
            <path d="M9 8V6.5a3 3 0 0 1 6 0V8" />
          </svg>
        </div>
        <h1 className="mt-6 font-display text-3xl tracking-tight">{t('cart.emptyTitle')}</h1>
        <p className="mt-2 max-w-sm text-sm text-warm">{t('cart.emptyBody')}</p>
        <Link
          to="/"
          className="mt-8 rounded-full bg-ink px-6 py-3 text-sm font-medium text-ivory transition-colors hover:bg-ink/90"
        >
          {t('cart.browse')}
        </Link>
      </section>
    )
  }

  const countLabel = itemCount === 1 ? t('cart.itemOne') : t('cart.itemMany', { count: itemCount })

  return (
    <section className="py-8 sm:py-12">
      <div className="flex flex-wrap items-baseline justify-between gap-2">
        <h1 className="font-display text-3xl tracking-tight sm:text-4xl">{t('cart.title')}</h1>
        <p className="text-sm text-warm">{countLabel}</p>
      </div>

      <div className="mt-8 grid gap-10 lg:grid-cols-[1fr_360px] lg:items-start">
        <ul aria-label={t('a11y.cartItems')} className="divide-y divide-line border-y border-line">
          {items.map((item) => {
            const name = localized(item.product.name)
            const color = localized(item.color.name)
            return (
              <li
                key={item.key}
                className="grid grid-cols-[80px_1fr] gap-4 py-5 sm:grid-cols-[96px_1fr_auto] sm:gap-6"
              >
                <Link
                  to={`/products/${item.product.slug}`}
                  className="relative aspect-4/5 overflow-hidden rounded-lg bg-sand"
                >
                  <img
                    src={item.product.images[0]}
                    alt={name}
                    loading="lazy"
                    decoding="async"
                    width={900}
                    height={1125}
                    className="h-full w-full object-cover"
                  />
                </Link>

                <div className="min-w-0">
                  <div className="flex items-start justify-between gap-4">
                    <div className="min-w-0">
                      <Link
                        to={`/products/${item.product.slug}`}
                        className="text-sm font-medium text-ink hover:underline"
                      >
                        {name}
                      </Link>
                      <p className="mt-1 text-xs text-warm">{color}</p>
                      <p className="mt-1 text-xs text-warm">
                        {t('cart.unitPrice', { price: formatPrice(item.product.priceCents) })}
                      </p>
                    </div>
                    <p className="shrink-0 text-sm font-medium sm:hidden">
                      {formatPrice(item.lineTotalCents)}
                    </p>
                  </div>

                  <div className="mt-4 flex items-center justify-between gap-4">
                    <QuantityStepper
                      quantity={item.quantity}
                      max={MAX_QUANTITY}
                      decreaseLabel={t('cart.decrease')}
                      increaseLabel={t('cart.increase')}
                      onDecrease={() => decrement(item.product.id, item.color.id)}
                      onIncrease={() => increment(item.product.id, item.color.id)}
                    />
                    <button
                      type="button"
                      onClick={() => removeItem(item.product.id, item.color.id)}
                      aria-label={t('cart.removeItem', { name })}
                      className="text-xs text-warm underline underline-offset-4 transition-colors hover:text-ink"
                    >
                      {t('cart.remove')}
                    </button>
                  </div>
                </div>

                <p className="hidden text-right text-sm font-medium sm:block">
                  {formatPrice(item.lineTotalCents)}
                </p>
              </li>
            )
          })}
        </ul>

        <aside className="rounded-2xl border border-line bg-white/60 p-6 lg:sticky lg:top-24">
          <div className="flex items-center justify-between text-sm">
            <span>{t('cart.subtotal')}</span>
            <span className="text-base font-medium">{formatPrice(subtotalCents)}</span>
          </div>
          <p className="mt-3 text-xs leading-5 text-warm">{t('cart.summaryNote')}</p>
          <button
            type="button"
            onClick={() => showToast(t('cart.demoCheckout'))}
            className="mt-6 w-full rounded-full bg-ink px-5 py-3 text-sm font-medium text-ivory transition-colors hover:bg-ink/90"
          >
            {t('cart.checkout')}
          </button>
          <Link
            to="/"
            className="mt-4 block text-center text-xs text-warm underline underline-offset-4 transition-colors hover:text-ink"
          >
            {t('cart.continue')}
          </Link>
        </aside>
      </div>
    </section>
  )
}
