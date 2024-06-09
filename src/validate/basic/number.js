export default (info, value) => {
  const messages = []

  if (isNaN(value)) {
    messages.push('SUMOR_INVALID_NUMBER')
    return messages
  }

  if (info.required && value === null) {
    messages.push('SUMOR_REQUIRED')
    return messages
  }

  const length = parseInt(value).toString().length
  if (info.length > 0 && length > info.length) {
    messages.push('SUMOR_NUMBER_LENGTH')
  }

  return messages
}
