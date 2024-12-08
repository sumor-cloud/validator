export default (info, value) => {
  if (value === undefined || value === null) {
    if (info.multiple !== true) {
      return null
    } else {
      return []
    }
  }

  return value
}
