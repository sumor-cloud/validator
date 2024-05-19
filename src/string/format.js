export default (info, value) => {
  if (value === undefined) {
    value = null
  }

  // convert to string
  if (value !== null && typeof value !== 'string') {
    if (typeof value === 'object') {
      value = JSON.stringify(value)
    } else {
      value = value.toString()
    }
  }

  // default value
  if (info.default !== undefined) {
    if (value === null || value === '') {
      value = info.default
    }
  }

  if (value !== null) {
    // trim value
    if (info.trim) {
      value = value.trim()
    }

    // lowerCase value
    if (info.lowerCase) {
      value = value.toLowerCase()
    }

    // upperCase value
    if (info.upperCase) {
      value = value.toUpperCase()
    }
  }

  return value
}
