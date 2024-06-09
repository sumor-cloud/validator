import { describe, expect, it } from '@jest/globals'
import parseInfo from '../../src/validate/parseInfo.js'
import format from '../../src/format/string.js'
import validate from '../../src/validate/index.js'

describe('String Validator', () => {
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
    expect(messages2).toEqual([
      {
        code: 'TMP_RULE_2',
        message: 'need include demo'
      }
    ])

    const value3 = 'demo!'
    const messages3 = validate(parameterInfo, format(parameterInfo, value3))
    expect(messages3).toEqual([
      {
        code: 'RULE1',
        message: 'only allow a-z, A-Z, 0-9'
      }
    ])

    const value4 = 'de!mo'
    const messages4 = validate(parameterInfo, format(parameterInfo, value4))
    expect(messages4).toEqual([
      {
        code: 'RULE1',
        message: 'only allow a-z, A-Z, 0-9'
      },
      {
        code: 'TMP_RULE_2',
        message: 'need include demo'
      }
    ])
  })
})
