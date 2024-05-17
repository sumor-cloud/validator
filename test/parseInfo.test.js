import { describe, expect, it } from '@jest/globals'
import parseInfo from '../src/parseInfo.js'

describe('parse info', () => {
  it('string', () => {
    const result1 = parseInfo()
    expect(result1).toStrictEqual({
      type: 'string',
      required: false,
      minLength: 0,
      length: 0,
      trim: true,
      rule: []
    })

    const result2 = parseInfo({
      length: '10'
    })
    expect(result2.length).toBe(10)

    const result3 = parseInfo({
      length: '10e'
    })
    expect(result3.length).toBe(10)

    const result4 = parseInfo({
      length: 'a0e'
    })
    expect(result4.length).toBe(0)

    const result5 = parseInfo({
      rule: [{}]
    })
    expect(result5.rule[0].id).toBe('TMP_RULE_1')
    expect(result5.rule[0].message).toBe('')
  })
  it('number', () => {
    const result1 = parseInfo({
      type: 'number'
    })
    expect(result1.type).toBe('number')
    expect(result1.required).toBe(false)
    expect(result1.trim).toBe(false)
    expect(result1.decimal).toBe(0)
  })
})
