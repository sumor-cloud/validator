export default (info, value) => {
  if (value === undefined || value === null || value === '') {
    return null
  }

  if (typeof value !== 'number') {
    value = parseFloat(value)
  }

  if (isNaN(value)) {
    return NaN
  }

  if (info.decimal > 0) {
    value = parseFloat(value.toFixed(info.decimal))
  }

  return value
}
