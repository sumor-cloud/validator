export default info => {
  info = info || {}
  info.type = info.type || 'string'
  info.required = info.required === true
  info.length = parseInt(info.length)
  if (isNaN(info.length)) info.length = 0
  info.minLength = parseInt(info.minLength)
  if (isNaN(info.minLength)) info.minLength = 0

  info.rule = info.rule || []

  if (info.type === 'string' || info.type === 'array') {
    info.trim = info.trim !== false
  } else {
    info.trim = false
  }

  if (info.type === 'number' || info.type === 'array') {
    if (info.decimal === undefined) {
      info.decimal = null
    }
    if (info.decimal !== null) {
      info.decimal = parseInt(info.decimal)
      if (isNaN(info.decimal)) info.decimal = null
    }
  }

  for (let i = 0; i < info.rule.length; i++) {
    const rule = info.rule[i]
    rule.code = rule.code || `TMP_RULE_${i + 1}`
    rule.message = rule.message || ''
  }

  return info
}
