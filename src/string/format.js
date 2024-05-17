export default (info, value) => {
  if (info.trim) {
    value = value.trim()
  }

  return value
}
