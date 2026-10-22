import { useI18n } from '@/i18n/I18nContext'
import type { Locale } from '@/i18n/types'

const options: Array<{ value: Locale; label: string; lang: string }> = [
  { value: 'en', label: 'EN', lang: 'en' },
  { value: 'zh', label: '中文', lang: 'zh-CN' },
]

export default function LocaleToggle() {
  const { locale, setLocale, t } = useI18n()

  return (
    <div
      role="group"
      aria-label={t('nav.language')}
      className="inline-flex items-center rounded-full border border-line p-0.5"
    >
      {options.map((option) => {
        const active = locale === option.value
        return (
          <button
            key={option.value}
            type="button"
            lang={option.lang}
            aria-pressed={active}
            onClick={() => setLocale(option.value)}
            className={`rounded-full px-2.5 py-1 text-xs font-medium transition-colors ${
              active ? 'bg-ink text-ivory' : 'text-warm hover:text-ink'
            }`}
          >
            {option.label}
          </button>
        )
      })}
    </div>
  )
}
