import { describe, expect, it } from '@jest/globals'
import parseInfo from '../../src/validate/parseInfo.js'
import format from '../../src/format/number.js'

describe('number formatter', () => {
  it('format decimal', () => {
    expect(format(parseInfo({ type: 'number', decimal: 2 }), 1234567890.0123)).toEqual(
      1234567890.01
    )
    expect(format(parseInfo({ type: 'number', decimal: 2 }), 1234567890.0163)).toEqual(
      1234567890.02
    )
    expect(format(parseInfo({ type: 'number', decimal: 0 }), 1234567890.0163)).toEqual(1234567890)
    expect(format(parseInfo({ type: 'number', decimal: 'wrong' }), 1234567890.0163)).toEqual(
      1234567890.0163
    )
    expect(format(parseInfo({ type: 'number' }), 1234567890.0163)).toEqual(1234567890.0163)
  })

  it('format string', () => {
    expect(format(parseInfo({ type: 'number' }), '1234567890')).toEqual(1234567890)
    expect(format(parseInfo({ type: 'number' }), '1234567890.01')).toEqual(1234567890.01)
    expect(format(parseInfo({ type: 'number' }), '1234567890.01.01')).toEqual(1234567890.01)
    expect(format(parseInfo({ type: 'number', decimal: 2 }), '1234567890.0123')).toEqual(
      1234567890.01
    )
    expect(format(parseInfo({ type: 'number', decimal: 2 }), '1234567890.0163')).toEqual(
      1234567890.02
    )
  })

  it('format error', () => {
    expect(format(parseInfo({ type: 'number' }), '')).toEqual(null)

    expect(isNaN(format(parseInfo({ type: 'number' }), ''))).toEqual(false)
    expect(isNaN(format(parseInfo({ type: 'number' }), 'abc'))).toEqual(true)
  })

  it('format default', () => {
    expect(format(parseInfo({ type: 'number', default: 123 }), '')).toEqual(123)
    expect(format(parseInfo({ type: 'number', default: 123 }), null)).toEqual(123)
    expect(format(parseInfo({ type: 'number', default: 123 }), undefined)).toEqual(123)
    expect(format(parseInfo({ type: 'number', default: 123 }), '456')).toEqual(456)
    expect(format(parseInfo({ type: 'number', default: 123 }), 456)).toEqual(456)
  })
})
