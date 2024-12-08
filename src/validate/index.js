import parseInfo from './parseInfo.js'
import stringValidate from './basic/string.js'
import numberValidate from './basic/number.js'
import arrayValidate from './basic/array.js'
import fileValidate from './basic/file.js'

import format from '../format/index.js'

import getI18n from '../i18n/index.js'
import getError from '../error/index.js'

export default (info, value, language = 'en-US') => {
  info = parseInfo(info)

  const formattedValue = format(info, value)
  let valueLength = 0
  let messages = []

  switch (info.type) {
    case 'string':
      messages = stringValidate(info, formattedValue)
      if (formattedValue) {
        valueLength = formattedValue.length
      }
      break
    case 'number':
      messages = numberValidate(info, formattedValue)
      if (!isNaN(formattedValue)) {
        valueLength = parseInt(formattedValue, 10).toString().length
      }
      break
    case 'array':
      messages = arrayValidate(info, formattedValue)
      valueLength = formattedValue.length
      break
    case 'file':
      messages = fileValidate(info, formattedValue)
      if (!formattedValue) {
        valueLength = 0
      } else {
        valueLength = formattedValue.length
      }
      break
  }

  const convertMessageResult = (code, params, errors) => {
    if (info.error) {
      const ValidationError = getError(code, info)
      return new ValidationError(code, params, errors)
    } else {
      const i18n = getI18n(language, info)
      const result = {
        code,
        message: i18n(code, params)
      }
      if (errors) {
        result.errors = errors
      }
      return result
    }
  }

  // covert standard code to message
  messages = messages.map(code => {
    return convertMessageResult(code, {
      value,
      currentLength: valueLength,
      ...info
    })
  })

  const verifyRule = (rules, value) => {
    const ruleMessages = []
    for (const rule of rules) {
      if (rule.function) {
        const rulePassed = rule.function(value, info, language)
        if (!rulePassed) {
          ruleMessages.push(convertMessageResult(rule.code, { value }))
        }
      }
      if (rule.expression) {
        const regexp = new RegExp(rule.expression)
        if (!regexp.test(value)) {
          ruleMessages.push(convertMessageResult(rule.code, { value }))
        }
      }
    }
    return ruleMessages
  }

  if (info.type === 'array' || info.type === 'file') {
    for (const index in formattedValue) {
      const item = formattedValue[index]
      const errors = verifyRule(info.rule, item)
      if (errors.length > 0) {
        messages.push(
          convertMessageResult('SUMOR_ITEM_RULE_FAILED', { index: parseInt(index) + 1 }, errors)
        )
      }
    }
  } else {
    messages = messages.concat(verifyRule(info.rule, formattedValue))
  }

  return messages
}
