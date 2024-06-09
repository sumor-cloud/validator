export default (info, value) => {
  const messages = []

  if (info.required && value.length === 0) {
    messages.push('SUMOR_REQUIRED')
    return messages
  }

  if (info.length > 0 && value.length > info.length) {
    messages.push('SUMOR_FILE_LENGTH')
  }

  return messages
}
