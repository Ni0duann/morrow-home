import { Link, Outlet } from 'react-router-dom'
import CartButton from '@/components/CartButton'
import LocaleToggle from '@/components/LocaleToggle'
import { useI18n } from '@/i18n/I18nContext'

export default function Layout() {
  const { t } = useI18n()

  return (
    <div className="flex min-h-screen flex-col bg-ivory text-ink">
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-50 focus:rounded-full focus:bg-ink focus:px-4 focus:py-2 focus:text-sm focus:text-ivory"
      >
        {t('a11y.skip')}
      </a>

      <header className="sticky top-0 z-40 border-b border-line bg-ivory/90 backdrop-blur">
        <div className="mx-auto flex h-16 w-full max-w-6xl items-center justify-between px-4 sm:px-6">
          <Link
            to="/"
            className="font-display text-[1.35rem] font-medium tracking-tight text-ink"
          >
            Morrow<span className="text-clay">.</span>
          </Link>

          <nav aria-label={t('a11y.mainNav')} className="flex items-center gap-2 sm:gap-3">
            <LocaleToggle />
            <CartButton />
          </nav>
        </div>
      </header>

      <main
        id="main"
        tabIndex={-1}
        className="mx-auto w-full max-w-6xl flex-1 px-4 sm:px-6 focus-visible:outline-none"
      >
        <Outlet />
      </main>

      <footer className="border-t border-line">
        <div className="mx-auto flex w-full max-w-6xl flex-col gap-2 px-4 py-6 text-xs text-warm sm:flex-row sm:items-center sm:justify-between sm:px-6">
          <p>{t('footer.demo')}</p>
          <a
            href="https://unsplash.com"
            target="_blank"
            rel="noreferrer"
            className="hover:text-ink"
          >
            {t('footer.credit')}
          </a>
        </div>
      </footer>
    </div>
  )
}
