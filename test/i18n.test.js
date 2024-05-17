import { describe, expect, it } from '@jest/globals'

import getI18n from '../src/i18n/getI18n.js'
import getI18nFromConfig from '../src/i18n/index.js'

describe('i18n', () => {
  it('official', () => {
    const i18n1 = getI18n('en', {})
    expect(i18n1('SUMOR_REQUIRED')).toBe('Mandatory field')
    const i18n2 = getI18n('zh', {})
    expect(i18n2('SUMOR_REQUIRED')).toBe('必填项')

    const i18n3 = getI18nFromConfig('zh')
    expect(i18n3('SUMOR_REQUIRED')).toBe('必填项')
  })
  it('custom', () => {
    const i18n = getI18n('en', {
      en: {
        SUMOR_REQUIRED: 'Mandatory field!',
        DEMO_WARNING: 'This is a warning!'
      }
    })
    expect(i18n('SUMOR_REQUIRED')).toBe('Mandatory field!')
    expect(i18n('DEMO_WARNING')).toBe('This is a warning!')
  })
  it('merge', () => {
    const i18n = getI18nFromConfig('zh', {
      rule: [
        {
          id: 'RULE1',
          expression: '^[a-zA-Z0-9]*$',
          message: 'only allow a-z, A-Z, 0-9'
        },
        {
          id: 'RULE2',
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
    expect(i18n('RULE1')).toBe('只允许输入字母和数字')
    expect(i18n('RULE2')).toBe('need include demo')
  })
})
