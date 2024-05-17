import official from './official.js'
import getI18n from '@sumor/i18n'
export default (language, config) => {
  const mergedConfig = Object.assign({}, config)
  for (const language in official) {
    mergedConfig[language] = mergedConfig[language] || {}
    for (const key in official[language]) {
      mergedConfig[language][key] = mergedConfig[language][key] || official[language][key]
    }
  }
  return getI18n(language, mergedConfig)
}
