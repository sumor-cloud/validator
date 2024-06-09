import { describe, expect, it } from '@jest/globals'

import getI18n from '../src/i18n/index.js'

describe('i18n', () => {
  it('official', () => {
    const i18n1 = getI18n('en', {})
    expect(i18n1('SUMOR_REQUIRED')).toEqual('Mandatory field')
    const i18n2 = getI18n('zh', {})
    expect(i18n2('SUMOR_REQUIRED')).toEqual('必填项')

    const i18n3 = getI18n('zh')
    expect(i18n3('SUMOR_REQUIRED')).toEqual('必填项')
  })
  it('custom', () => {
    const i18n = getI18n('en', {
      rule: [
        {
          code: 'DEMO_REQUIRED',
          message: 'Mandatory field!'
        },
        {
          code: 'DEMO_WARNING',
          message: 'This is a warning!'
        }
      ],
      en: {
        DEMO_REQUIRED: 'Mandatory field!',
        DEMO_WARNING: 'This is a warning!'
      }
    })
    expect(i18n('DEMO_REQUIRED')).toEqual('Mandatory field!')
    expect(i18n('DEMO_WARNING')).toEqual('This is a warning!')
  })
  it('translate', () => {
    const i18n = getI18n('zh', {
      rule: [
        {
          code: 'RULE1',
          expression: '^[a-zA-Z0-9]*$',
          message: 'only allow a-z, A-Z, 0-9'
        },
        {
          code: 'RULE2',
          expression: 'demo',
          message: 'need include demo'
        }
      ],
      i18n: {
        zh: {
          RULE1: '只允许输入字母和数字'
        }
      }
    })
    expect(i18n('RULE1')).toEqual('只允许输入字母和数字')
    expect(i18n('RULE2')).toEqual('need include demo')
  })
})
