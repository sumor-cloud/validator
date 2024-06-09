export default (info, value) => {
  if (value === undefined || value === '') {
    value = null
  }

  // default value
  if (value === null) {
    if (info.default) {
      value = info.default
    } else {
      return null
    }
  }

  // convert to number
  if (typeof value !== 'number') {
    value = parseFloat(value)
  }

  if (isNaN(value)) {
    return NaN
  }

  if (info.decimal !== null) {
    value = parseFloat(value.toFixed(info.decimal))
  }

  return value
}
