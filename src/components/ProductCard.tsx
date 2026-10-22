import { Link, useLocation } from 'react-router-dom'
import { getCategory } from '@/data/products'
import type { Badge, Product } from '@/data/products'
import { useI18n } from '@/i18n/I18nContext'
import type { TranslationKey } from '@/i18n/dictionary'
import { formatPrice } from '@/lib/format'

const badgeKeys: Record<Badge, TranslationKey> = {
  new: 'badge.new',
  bestseller: 'badge.bestseller',
  sale: 'badge.sale',
}

export default function ProductCard({ product }: { product: Product }) {
  const { t, localized } = useI18n()
  const location = useLocation()
  const category = getCategory(product.category)
  const name = localized(product.name)
  const from = `${location.pathname}${location.search}`

  return (
    <Link
      to={`/products/${product.slug}`}
      state={{ from }}
      className="group block rounded-xl focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-ink"
    >
      <div className="relative aspect-4/5 overflow-hidden rounded-xl bg-sand">
        <img
          src={product.images[0]}
          alt=""
          loading="lazy"
          decoding="async"
          width={900}
          height={1125}
          sizes="(min-width: 1024px) 25vw, (min-width: 768px) 33vw, 50vw"
          className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-[1.03]"
        />
        <img
          src={product.images[1]}
          alt=""
          loading="lazy"
          decoding="async"
          width={900}
          height={1125}
          sizes="(min-width: 1024px) 25vw, (min-width: 768px) 33vw, 50vw"
          className="absolute inset-0 h-full w-full object-cover opacity-0 transition-[opacity,transform] duration-500 group-hover:scale-[1.03] group-hover:opacity-100"
        />
        {product.badge && (
          <span
            className={`absolute left-3 top-3 rounded-full px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.12em] ${
              product.badge === 'sale' ? 'bg-clay text-ivory' : 'bg-ivory/90 text-ink backdrop-blur'
            }`}
          >
            {t(badgeKeys[product.badge])}
          </span>
        )}
      </div>

      <div className="mt-3 space-y-1">
        <p className="text-[11px] uppercase tracking-[0.14em] text-warm">
          {localized(category.name)}
        </p>
        <h3 className="text-sm font-medium leading-snug text-ink">{name}</h3>
        <div className="flex items-baseline gap-2 text-sm">
          <span>{formatPrice(product.priceCents)}</span>
          {product.compareAtPriceCents && (
            <span className="text-warm/70 line-through">
              {formatPrice(product.compareAtPriceCents)}
            </span>
          )}
        </div>
        <div className="flex items-center gap-1.5 pt-1">
          {product.colors.map((entry) => (
            <span
              key={entry.id}
              title={localized(entry.name)}
              aria-hidden="true"
              className="h-2.5 w-2.5 rounded-full border border-ink/10"
              style={{ backgroundColor: entry.hex, opacity: entry.available ? 1 : 0.35 }}
            />
          ))}
        </div>
      </div>
    </Link>
  )
}
