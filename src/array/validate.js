export default (info, value) => {
  const messages = []

  if (info.required && value.length === 0) {
    messages.push('SUMOR_REQUIRED')
    return messages
  }

  if (info.length > 0 && value.length > info.length) {
    messages.push('SUMOR_ARRAY_LENGTH')
  }

  for (const rule of info.rule) {
    if (rule.expression) {
      const regexp = new RegExp(rule.expression)
      if (!regexp.test(value)) {
        messages.push(rule.code)
      }
    }
  }

  return messages
}
