import { describe, expect, it } from '@jest/globals'
import parseInfo from '../../src/parseInfo.js'
import format from '../../src/string/format.js'
import validate from '../../src/string/validate.js'

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

  it('validate', () => {
    const parameterInfo = parseInfo({
      type: 'string',
      required: true,
      length: 10,
      rule: [
        // only allow a-z, A-Z, 0-9
        {
          code: 'RULE1',
          expression: '^[a-zA-Z0-9]*$',
          message: 'only allow a-z, A-Z, 0-9'
        },
        // need include demo
        {
          expression: 'demo',
          message: 'need include demo'
        },
        {
          code: 'DUMMY_RULE',
          message: 'dummy rule'
        }
      ],
      i18n: {
        zh: {
          RULE1: '只允许输入字母和数字',
          RULE2: '必须包含demo'
        }
      }
    })

    const value1 = 'demo123456'
    const messages1 = validate(parameterInfo, format(parameterInfo, value1))
    expect(messages1).toEqual([])

    const value2 = 'de1234567'
    const messages2 = validate(parameterInfo, format(parameterInfo, value2))
    expect(messages2).toEqual(['TMP_RULE_2'])

    const value3 = 'demo!'
    const messages3 = validate(parameterInfo, format(parameterInfo, value3))
    expect(messages3).toEqual(['RULE1'])

    const value4 = 'de!mo'
    const messages4 = validate(parameterInfo, format(parameterInfo, value4))
    expect(messages4).toEqual(['RULE1', 'TMP_RULE_2'])
  })
})
