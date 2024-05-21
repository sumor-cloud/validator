import parseInfo from './parseInfo.js'
import stringFormat from './string/format.js'
import stringValidate from './string/validate.js'
import numberFormat from './number/format.js'
import numberValidate from './number/validate.js'
import getI18n from './i18n/index.js'
import getError from './error/index.js'

const format = (info, value) => {
  info = parseInfo(info)
  info.error = !!info.error // if error is true, will return error object

  let formattedValue = value

  switch (info.type) {
    case 'string':
      formattedValue = stringFormat(info, value)
      break
    case 'number':
      formattedValue = numberFormat(info, value)
      break
  }

  return formattedValue
}

const validate = (info, value, language = 'en-US') => {
  info = parseInfo(info)

  let formattedValue = value
  let valueLength = 0
  let messages = []

  switch (info.type) {
    case 'string':
      formattedValue = stringFormat(info, value)
      messages = stringValidate(info, formattedValue)
      if (formattedValue) {
        valueLength = formattedValue.length
      }
      break
    case 'number':
      formattedValue = numberFormat(info, value)
      messages = numberValidate(info, formattedValue)
      if (!isNaN(formattedValue)) {
        valueLength = parseInt(formattedValue, 10).toString().length
      }
      break
  }

  for (const rule of info.rule) {
    if (rule.function) {
      const result = rule.function(formattedValue, info, language)
      if (!result) {
        messages.push(rule.code)
      }
    }
  }

  if (info.error) {
    const ValidationError = getError(language, info)
    messages = messages.map(message => {
      return new ValidationError(message, {
        value,
        currentLength: valueLength,
        ...info
      })
    })
  } else {
    const i18n = getI18n(language, info)
    messages = messages.map(message => {
      return {
        code: message,
        message: i18n(message, {
          value,
          currentLength: valueLength,
          ...info
        })
      }
    })
  }

  return messages
}

export { validate, format }

export default {
  validate,
  format
}
