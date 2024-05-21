import official from './official.js'
export default (language, info) => {
  info = info || {}
  const i18n = info.i18n || {}
  const config = {
    origin: {},
    ...i18n
  }
  for (const i in info.rule) {
    const rule = info.rule[i]
    config.origin[rule.code] = rule.message
  }
  const mergedConfig = Object.assign({}, config)
  for (const language in official) {
    mergedConfig[language] = mergedConfig[language] || {}
    for (const key in official[language]) {
      mergedConfig[language][key] = mergedConfig[language][key] || official[language][key]
    }
  }
  return mergedConfig
}
