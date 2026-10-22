import { Link } from 'react-router-dom'
import { useI18n } from '@/i18n/I18nContext'

export default function NotFound() {
  const { t } = useI18n()

  return (
    <section className="flex min-h-[60vh] flex-col items-center justify-center py-20 text-center">
      <p className="text-[11px] uppercase tracking-[0.22em] text-clay">{t('notFound.eyebrow')}</p>
      <h1 className="mt-3 text-balance font-display text-3xl tracking-tight sm:text-4xl">
        {t('notFound.title')}
      </h1>
      <p className="mt-3 max-w-sm text-sm leading-6 text-warm">{t('notFound.body')}</p>
      <Link
        to="/"
        className="mt-8 rounded-full bg-ink px-6 py-3 text-sm font-medium text-ivory transition-colors hover:bg-ink/90"
      >
        {t('notFound.back')}
      </Link>
    </section>
  )
}
