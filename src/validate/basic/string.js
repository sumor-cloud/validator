export default (info, value) => {
  const messages = []

  if (info.required && value.length === 0) {
    messages.push('SUMOR_REQUIRED')
  }

  if (info.length > 0 && value.length > info.length) {
    messages.push('SUMOR_STRING_LENGTH')
  }

  return messages
}
