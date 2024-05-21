import defineError from '@sumor/error'
import getI18nConfig from '../i18n/getI18nConfig.js'

export default (language, info) => {
  const i18nConfig = getI18nConfig(language, info)
  return defineError({
    language,
    code: i18nConfig.origin,
    i18n: i18nConfig
  })
}
