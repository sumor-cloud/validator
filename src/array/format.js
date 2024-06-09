export default (info, value) => {
  if (value === undefined || value === null) {
    value = []
  }

  for (const i in value) {
    if (info.default !== undefined) {
      if (value[i] === undefined || value[i] === null || value[i] === '') {
        value[i] = info.default
      }
    }

    if (typeof value[i] === 'string') {
      if (info.trim) {
        value[i] = value[i].trim()
      }

      // lowerCase value
      if (info.lowerCase) {
        value[i] = value[i].toLowerCase()
      }

      // upperCase value
      if (info.upperCase) {
        value[i] = value[i].toUpperCase()
      }
    }

    if (typeof value[i] === 'number') {
      if (info.decimal > 0) {
        value[i] = parseFloat(value[i].toFixed(info.decimal))
      }
    }
  }

  return value
}
