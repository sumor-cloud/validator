import getI18n from '@sumor/i18n'
import getI18nConfig from './getI18nConfig.js'
export default (language, info) => {
  return getI18n(language, getI18nConfig(language, info))
}
