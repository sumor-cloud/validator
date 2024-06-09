import { describe, expect, it } from '@jest/globals'

import { validate, format } from '../src/index.js'
import official from '../src/i18n/official.js'

describe('entry', () => {
  it('trim with required', () => {
    const info = {
      required: true
    }
    const messages = validate(info, ' ')
    expect(messages).toEqual([
      {
        code: 'SUMOR_REQUIRED',
        message: official.en.SUMOR_REQUIRED
      }
    ])
  })
  it('trim with required', () => {
    const info = {
      length: 5
    }
    const value = 'ABCDEF'
    const messages = validate(info, value, 'en')
    expect(messages).toEqual([
      {
        code: 'SUMOR_STRING_LENGTH',
        message: official.en.SUMOR_STRING_LENGTH.replace('{length}', info.length)
      }
    ])
  })
  it('trim with required for i18n', () => {
    const info = {
      length: 5
    }
    const value = 'ABCDEF'

    const messages1 = validate(info, value, 'zh-CN')
    expect(messages1).toEqual([
      {
        code: 'SUMOR_STRING_LENGTH',
        message: official.zh.SUMOR_STRING_LENGTH.replace('{length}', info.length)
      }
    ])

    const messages2 = validate(info, value, 'ar-EG')
    expect(messages2).toEqual([
      {
        code: 'SUMOR_STRING_LENGTH',
        message: official.ar.SUMOR_STRING_LENGTH.replace('{length}', info.length)
      }
    ])

    const messages3 = validate(info, value, 'fr-FR')
    expect(messages3).toEqual([
      {
        code: 'SUMOR_STRING_LENGTH',
        message: official.fr.SUMOR_STRING_LENGTH.replace('{length}', info.length)
      }
    ])
  })
  it('rule', () => {
    const info = {
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
        }
      ],
      i18n: {
        zh: {
          RULE1: '只允许输入字母和数字',
          RULE2: '必须包含demo'
        }
      }
    }
    const messages1 = validate(info, 'demo123456', 'zh-TW')
    expect(messages1).toEqual([])
    const messages2 = validate(info, 'de1234567', 'zh-TW')
    expect(messages2).toEqual([
      {
        code: 'TMP_RULE_2',
        message: 'need include demo'
      }
    ])
    const messages3 = validate(info, 'demo!', 'zh-TW')
    expect(messages3).toEqual([
      {
        code: 'RULE1',
        message: '只允许输入字母和数字'
      }
    ])
    const messages4 = validate(info, 'de!mo', 'zh-TW')
    expect(messages4).toEqual([
      {
        code: 'RULE1',
        message: '只允许输入字母和数字'
      },
      {
        code: 'TMP_RULE_2',
        message: 'need include demo'
      }
    ])
  })
  it('rule for array and file', () => {
    const info = {
      type: 'array',
      rule: [
        // only allow a-z, A-Z, 0-9
        {
          code: 'RULE1',
          expression: '^[a-zA-Z0-9]*$',
          message: 'only allow a-z, A-Z, 0-9'
        },
        {
          code: 'RULE2',
          function: value => {
            return value.length > 3 && value.length < 6
          },
          message: 'value length must greater than 3 and less than 6'
        }
      ]
    }
    const messages1 = validate(info, ['demo!'])
    expect(messages1).toEqual([{ code: 'RULE1', message: 'only allow a-z, A-Z, 0-9' }])

    const messages2 = validate(info, ['demo12'])
    expect(messages2).toEqual([
      { code: 'RULE2', message: 'value length must greater than 3 and less than 6' }
    ])

    const info2 = {
      type: 'file',
      rule: [
        {
          code: 'RULE1',
          function: value => {
            return value.size < 10 * 1000 * 1000
          },
          message: 'file size must less than 10MB'
        }
      ]
    }

    const messages3 = validate(info2, [{ size: 10 * 1000 * 1000 + 1 }])
    expect(messages3).toEqual([{ code: 'RULE1', message: 'file size must less than 10MB' }])
  })
  it('number invalid check', () => {
    const info = {
      type: 'number'
    }
    const messages = validate(info, 'a12b', 'en')
    expect(messages).toEqual([
      {
        code: 'SUMOR_INVALID_NUMBER',
        message: official.en.SUMOR_INVALID_NUMBER.replace('{value}', 'a12b')
      }
    ])
  })
  it('number length check', () => {
    const info = {
      type: 'number',
      length: 5
    }
    const messages = validate(info, '123456', 'en')
    expect(messages).toEqual([
      {
        code: 'SUMOR_NUMBER_LENGTH',
        message: official.en.SUMOR_NUMBER_LENGTH.replace('{length}', 5)
      }
    ])
  })
  it('function rule', () => {
    const info = {
      type: 'number',
      rule: [
        {
          code: 'RULE1',
          function: (value, info, language) => {
            return value > 100
          },
          message: 'need value > 100, current value is {value}'
        }
      ],
      i18n: {
        zh: {
          RULE1: '必须大于100，当前值是{value}'
        }
      }
    }

    const messages1 = validate(info, '101', 'en')
    expect(messages1).toEqual([])
    const messages2 = validate(info, '99', 'en')
    expect(messages2).toEqual([
      {
        code: 'RULE1',
        message: 'need value > 100, current value is 99'
      }
    ])
    const messages3 = validate(info, '99', 'zh')
    expect(messages3).toEqual([
      {
        code: 'RULE1',
        message: '必须大于100，当前值是99'
      }
    ])
  })
  it('format string', () => {
    const info = {
      type: 'string'
    }
    const value = '  abc  '
    const formattedValue = format(info, value)
    expect(formattedValue).toEqual('abc')
  })
  it('format number', () => {
    const info = {
      type: 'number'
    }
    const value = '  123  '
    const formattedValue = format(info, value)
    expect(formattedValue).toEqual(123)
  })
  it('change output to error', () => {
    const info = {
      error: true,
      type: 'string',
      required: true
    }
    const value = ' '
    const errors = validate(info, value)
    const error = errors[0]
    expect(error.name).toEqual('SumorError')
    expect(error.code).toEqual('SUMOR_REQUIRED')
    expect(error.message).toEqual(official.en.SUMOR_REQUIRED)
  })
})
