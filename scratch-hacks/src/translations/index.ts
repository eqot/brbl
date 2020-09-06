import formatMessage from 'format-message'

const SUPPORTED_LOCALES = ['en', 'ja', 'ja-Hira']

class Translations {
  initialize(locale?: string) {
    if (locale !== formatMessage.setup().locale) {
      formatMessage.setup({ locale })
    }

    formatMessage.setup({
      locale,
      translations: SUPPORTED_LOCALES.reduce(
        (acc, locale) => Object.assign(acc, { [locale]: require(`./${locale}.json`) }),
        {}
      ),
    })
  }

  label(id: string): string {
    return formatMessage(id)
  }
}

const translations = new Translations()

export { translations }
