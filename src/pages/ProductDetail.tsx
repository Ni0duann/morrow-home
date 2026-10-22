import { useState } from 'react'
import { Link, useLocation, useParams } from 'react-router-dom'
import { useCart } from '@/cart/CartContext'
import { useToast } from '@/components/Toast'
import { getCategory, getProductBySlug } from '@/data/products'
import type { Badge, Product } from '@/data/products'
import { useI18n } from '@/i18n/I18nContext'
import type { TranslationKey } from '@/i18n/dictionary'
import { formatPrice } from '@/lib/format'
import NotFound from '@/pages/NotFound'

const badgeKeys: Record<Badge, TranslationKey> = {
  new: 'badge.new',
  bestseller: 'badge.bestseller',
  sale: 'badge.sale',
}

export default function ProductDetail() {
  const { slug } = useParams()
  const product = getProductBySlug(slug ?? '')

  if (!product) return <NotFound />
  return <ProductView key={product.id} product={product} />
}

function ProductView({ product }: { product: Product }) {
  const { t, localized } = useI18n()
  const { addItem } = useCart()
  const { showToast } = useToast()
  const location = useLocation()

  const [activeImage, setActiveImage] = useState(0)
  const firstAvailable = product.colors.find((entry) => entry.available) ?? product.colors[0]
  const [colorId, setColorId] = useState(firstAvailable?.id ?? '')

  const selectedColor = product.colors.find((entry) => entry.id === colorId)
  const canAdd = Boolean(selectedColor?.available)
  const name = localized(product.name)
  const category = getCategory(product.category)
  const from = (location.state as { from?: string } | null)?.from ?? '/'

  const handleAdd = () => {
    if (!selectedColor?.available) return
    addItem(product.id, selectedColor.id)
    showToast(t('toast.added'), { label: t('toast.viewCart'), to: '/cart' })
  }

  return (
    <div className="pb-24 pt-6 sm:pt-8 lg:pb-12">
      <Link to={from} className="text-sm text-warm transition-colors hover:text-ink">
        ← {t('product.back')}
      </Link>

      <div className="mt-6 grid gap-8 lg:grid-cols-2 lg:gap-14">
        <div>
          <div className="relative aspect-4/5 overflow-hidden rounded-2xl bg-sand">
            <img
              src={product.images[activeImage]}
              alt={t('product.imageAlt', { name, index: activeImage + 1 })}
              width={900}
              height={1125}
              fetchPriority="high"
              className="h-full w-full object-cover"
            />
          </div>
          <div className="mt-3 flex gap-3">
            {product.images.map((image, index) => (
              <button
                key={`${image}-${index}`}
                type="button"
                onClick={() => setActiveImage(index)}
                aria-label={t('product.imageAlt', { name, index: index + 1 })}
                aria-pressed={activeImage === index}
                className={`relative aspect-4/5 w-16 overflow-hidden rounded-lg border-2 transition-colors sm:w-20 ${
                  activeImage === index ? 'border-ink' : 'border-transparent hover:border-line'
                }`}
              >
                <img
                  src={image}
                  alt=""
                  loading="lazy"
                  decoding="async"
                  width={900}
                  height={1125}
                  className="h-full w-full object-cover"
                />
              </button>
            ))}
          </div>
        </div>

        <div className="lg:pt-2">
          <p className="text-[11px] uppercase tracking-[0.16em] text-warm">
            {localized(category.name)}
          </p>
          <h1 className="mt-3 text-balance font-display text-3xl leading-tight tracking-tight sm:text-4xl">
            {name}
          </h1>

          <div className="mt-4 flex flex-wrap items-baseline gap-x-3 gap-y-2">
            <span className="text-xl">{formatPrice(product.priceCents)}</span>
            {product.compareAtPriceCents && (
              <span className="text-sm text-warm/70 line-through">
                {formatPrice(product.compareAtPriceCents)}
              </span>
            )}
            {product.badge && (
              <span className="rounded-full bg-sand px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.12em] text-ink">
                {t(badgeKeys[product.badge])}
              </span>
            )}
          </div>

          <p className="mt-6 max-w-prose text-sm leading-7 text-warm">
            {localized(product.description)}
          </p>

          <div className="mt-8">
            <div className="flex items-center justify-between gap-4">
              <p className="text-sm font-medium">{t('product.color')}</p>
              <p className="text-sm text-warm">
                {selectedColor && localized(selectedColor.name)}
                {selectedColor && !selectedColor.available && ` — ${t('product.soldOut')}`}
              </p>
            </div>
            <div className="mt-3 flex items-center gap-3">
              {product.colors.map((entry) => (
                <button
                  key={entry.id}
                  type="button"
                  disabled={!entry.available}
                  onClick={() => setColorId(entry.id)}
                  aria-label={`${localized(entry.name)}${
                    entry.available ? '' : ` — ${t('product.soldOut')}`
                  }`}
                  aria-pressed={colorId === entry.id}
                  title={localized(entry.name)}
                  className={`relative h-9 w-9 rounded-full border transition-all ${
                    colorId === entry.id
                      ? 'border-ink ring-2 ring-ink ring-offset-2 ring-offset-ivory'
                      : 'border-ink/15 hover:border-ink/40'
                  } ${entry.available ? '' : 'cursor-not-allowed opacity-40'}`}
                  style={{ backgroundColor: entry.hex }}
                >
                  {!entry.available && (
                    <span
                      aria-hidden="true"
                      className="absolute left-1/2 top-1/2 h-px w-9 -translate-x-1/2 -translate-y-1/2 rotate-45 bg-ink/60"
                    />
                  )}
                </button>
              ))}
            </div>
          </div>

          <button
            type="button"
            onClick={handleAdd}
            disabled={!canAdd}
            className="mt-8 hidden w-full items-center justify-center rounded-full bg-ink px-6 py-3.5 text-sm font-medium text-ivory transition-colors hover:bg-ink/90 disabled:cursor-not-allowed disabled:opacity-40 lg:flex"
          >
            {canAdd ? t('product.addToCart') : t('product.soldOut')}
          </button>
        </div>
      </div>

      <div className="fixed inset-x-0 bottom-0 z-30 border-t border-line bg-ivory/95 px-4 py-3 backdrop-blur lg:hidden">
        <div className="mx-auto flex max-w-6xl items-center justify-between gap-4">
          <div className="min-w-0">
            <p className="text-sm font-medium">{formatPrice(product.priceCents)}</p>
            <p className="truncate text-xs text-warm">
              {selectedColor && localized(selectedColor.name)}
            </p>
          </div>
          <button
            type="button"
            onClick={handleAdd}
            disabled={!canAdd}
            className="shrink-0 rounded-full bg-ink px-6 py-3 text-sm font-medium text-ivory transition-colors hover:bg-ink/90 disabled:cursor-not-allowed disabled:opacity-40"
          >
            {canAdd ? t('product.addToCart') : t('product.soldOut')}
          </button>
        </div>
      </div>
    </div>
  )
}
