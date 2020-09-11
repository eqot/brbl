import formatMessage from 'format-message'

const SUPPORTED_LOCALES = ['en', 'ja', 'ja-Hira']

type Options = {
  ellipsis?: boolean
}

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

  label(id: string, options?: Options): string {
    let label = formatMessage(id)

    if (options && options.ellipsis) {
      label += '...'
    }

    return label
  }
}

const translations = new Translations()

export { translations }
