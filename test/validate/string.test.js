import { describe, expect, it } from '@jest/globals'
import parseInfo from '../../src/validate/parseInfo.js'
import format from '../../src/format/string.js'
import validate from '../../src/validate/basic/string.js'

describe('String Validator', () => {
  it('validate not trim', () => {
    const parameterInfo = parseInfo({
      type: 'string',
      required: true,
      trim: false
    })
    const value = ' '
    const messages = validate(parameterInfo, format(parameterInfo, value))
    expect(messages).toEqual([])
  })

  it('validate trim required', () => {
    const parameterInfo = parseInfo({
      type: 'string',
      required: true,
      trim: true
    })
    const value = ' '

    const messages = validate(parameterInfo, format(parameterInfo, value))
    expect(messages).toEqual(['SUMOR_REQUIRED'])
  })

  it('validate length', () => {
    const parameterInfo = parseInfo({
      type: 'string',
      required: true,
      length: 5
    })

    const value1 = '12345'
    const messages1 = validate(parameterInfo, format(parameterInfo, value1))
    expect(messages1).toEqual([])

    const value2 = '123456'
    const messages2 = validate(parameterInfo, format(parameterInfo, value2))
    expect(messages2).toEqual(['SUMOR_STRING_LENGTH'])
  })
})
