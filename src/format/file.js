export default (info, value) => {
  if (value === undefined || value === null) {
    value = []
  }

  return value
}
