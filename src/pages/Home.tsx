import { useMemo } from 'react'
import { useSearchParams } from 'react-router-dom'
import ProductCard from '@/components/ProductCard'
import { categories, filterProducts, isCategoryId, isSortOption } from '@/data/products'
import type { CategoryId, SortOption } from '@/data/products'
import { useI18n } from '@/i18n/I18nContext'
import type { TranslationKey } from '@/i18n/dictionary'

const sortKeys: Record<SortOption, TranslationKey> = {
  featured: 'catalog.sort.featured',
  'price-asc': 'catalog.sort.priceAsc',
  'price-desc': 'catalog.sort.priceDesc',
}

export default function Home() {
  const [params, setParams] = useSearchParams()
  const { t, localized } = useI18n()

  const query = params.get('q') ?? ''
  const categoryParam = params.get('category')
  const category: CategoryId | 'all' = isCategoryId(categoryParam) ? categoryParam : 'all'
  const sortParam = params.get('sort')
  const sort: SortOption = isSortOption(sortParam) ? sortParam : 'featured'

  const results = useMemo(
    () => filterProducts({ query, category, sort }),
    [query, category, sort],
  )

  const updateParams = (patch: Record<string, string>, replace = false) => {
    setParams(
      (current) => {
        const next = new URLSearchParams(current)
        for (const [key, value] of Object.entries(patch)) {
          if (value) next.set(key, value)
          else next.delete(key)
        }
        return next
      },
      { replace },
    )
  }

  const resultLabel =
    results.length === 1 ? t('catalog.resultsOne') : t('catalog.resultsMany', { count: results.length })

  return (
    <div>
      <section className="grid items-center gap-8 py-10 sm:py-14 lg:grid-cols-2 lg:gap-14 lg:py-16">
        <div>
          <p className="text-[11px] uppercase tracking-[0.22em] text-clay">{t('hero.eyebrow')}</p>
          <h1 className="mt-4 max-w-xl text-balance font-display text-4xl leading-[1.08] tracking-tight sm:text-5xl lg:text-6xl">
            {t('hero.title')}
          </h1>
          <p className="mt-5 max-w-md text-sm leading-7 text-warm">{t('hero.body')}</p>
          <a
            href="#catalog"
            className="mt-8 inline-flex items-center gap-2 rounded-full bg-ink px-6 py-3 text-sm font-medium text-ivory transition-colors hover:bg-ink/90"
          >
            {t('hero.cta')}
            <span aria-hidden="true">↓</span>
          </a>
        </div>

        <div className="relative aspect-4/3 overflow-hidden rounded-2xl bg-sand">
          <img
            src={`${import.meta.env.BASE_URL}images/hero.webp`}
            alt=""
            width={900}
            height={675}
            fetchPriority="high"
            className="h-full w-full object-cover"
          />
        </div>
      </section>

      <section id="catalog" className="scroll-mt-24 border-t border-line py-10 sm:py-12">
        <div className="flex flex-wrap items-end justify-between gap-3">
          <h2 className="font-display text-2xl tracking-tight sm:text-3xl">{t('catalog.title')}</h2>
          <p aria-live="polite" className="text-sm text-warm">
            {resultLabel}
          </p>
        </div>

        <div className="mt-6 flex flex-col gap-4">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <div className="relative w-full sm:max-w-xs">
              <svg
                aria-hidden="true"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.6"
                strokeLinecap="round"
                className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-warm"
              >
                <circle cx="11" cy="11" r="6.5" />
                <path d="m16 16 4 4" />
              </svg>
              <input
                type="search"
                value={query}
                onChange={(event) => updateParams({ q: event.target.value }, true)}
                aria-label={t('catalog.search')}
                placeholder={t('catalog.search')}
                className="h-10 w-full rounded-full border border-line bg-white/60 pl-10 pr-10 text-sm text-ink placeholder:text-warm/70 focus:border-ink focus:outline-none"
              />
              {query && (
                <button
                  type="button"
                  aria-label={t('catalog.searchClear')}
                  onClick={() => updateParams({ q: '' }, true)}
                  className="absolute right-2 top-1/2 flex h-6 w-6 -translate-y-1/2 items-center justify-center rounded-full text-warm hover:bg-sand hover:text-ink"
                >
                  ×
                </button>
              )}
            </div>

            <div className="relative w-full sm:w-52">
              <select
                value={sort}
                onChange={(event) =>
                  updateParams({ sort: event.target.value === 'featured' ? '' : event.target.value })
                }
                aria-label={t('catalog.sort')}
                className="h-10 w-full appearance-none rounded-full border border-line bg-white/60 px-4 pr-10 text-sm text-ink focus:border-ink focus:outline-none"
              >
                {(Object.keys(sortKeys) as SortOption[]).map((option) => (
                  <option key={option} value={option}>
                    {t(sortKeys[option])}
                  </option>
                ))}
              </select>
              <svg
                aria-hidden="true"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.6"
                strokeLinecap="round"
                className="pointer-events-none absolute right-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-warm"
              >
                <path d="m7 10 5 5 5-5" />
              </svg>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-2" role="group" aria-label={t('catalog.category')}>
            <button
              type="button"
              onClick={() => updateParams({ category: '' })}
              aria-pressed={category === 'all'}
              className={`rounded-full border px-3.5 py-1.5 text-xs font-medium transition-colors ${
                category === 'all'
                  ? 'border-ink bg-ink text-ivory'
                  : 'border-line bg-white/40 text-warm hover:border-ink hover:text-ink'
              }`}
            >
              {t('catalog.all')}
            </button>
            {categories.map((entry) => (
              <button
                key={entry.id}
                type="button"
                onClick={() => updateParams({ category: entry.id })}
                aria-pressed={category === entry.id}
                className={`rounded-full border px-3.5 py-1.5 text-xs font-medium transition-colors ${
                  category === entry.id
                    ? 'border-ink bg-ink text-ivory'
                    : 'border-line bg-white/40 text-warm hover:border-ink hover:text-ink'
                }`}
              >
                {localized(entry.name)}
              </button>
            ))}
          </div>
        </div>

        {results.length > 0 ? (
          <div className="mt-8 grid grid-cols-2 gap-x-4 gap-y-8 md:grid-cols-3 lg:grid-cols-4 lg:gap-x-6">
            {results.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        ) : (
          <div className="mt-16 flex flex-col items-center py-10 text-center">
            <h3 className="font-display text-2xl">{t('catalog.emptyTitle')}</h3>
            <p className="mt-2 max-w-sm text-sm text-warm">{t('catalog.emptyBody')}</p>
            <button
              type="button"
              onClick={() => setParams({})}
              className="mt-6 rounded-full border border-ink px-5 py-2.5 text-sm font-medium text-ink transition-colors hover:bg-ink hover:text-ivory"
            >
              {t('catalog.clearFilters')}
            </button>
          </div>
        )}
      </section>
    </div>
  )
}
