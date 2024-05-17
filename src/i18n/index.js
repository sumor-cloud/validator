import getI18n from './getI18n.js'
export default (language, info) => {
  info = info || {}
  const i18n = info.i18n || {}
  const config = {
    origin: {},
    ...i18n
  }
  for (const i in info.rule) {
    const rule = info.rule[i]
    config.origin[rule.id] = rule.message
  }
  return getI18n(language, config)
}
