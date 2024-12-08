export default (info, value) => {
  info = info || {}
  const messages = []

  if (info.multiple !== true) {
    if (value === undefined || value === null) {
      messages.push('SUMOR_REQUIRED')
      return messages
    }
  } else {
    if (value === undefined || value === null) {
      value = []
    }
    if (info.required && value.length === 0) {
      messages.push('SUMOR_REQUIRED')
      return messages
    }
    if (info.length > 0 && value.length > info.length) {
      messages.push('SUMOR_FILE_LENGTH')
    }
  }

  return messages
}
