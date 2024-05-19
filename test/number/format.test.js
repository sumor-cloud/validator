import { describe, expect, it } from '@jest/globals'
import parseInfo from '../../src/parseInfo.js'
import format from '../../src/number/format.js'

describe('number formatter', () => {
  it('format decimal', () => {
    expect(format(parseInfo({ type: 'number', decimal: 2 }), 1234567890.0123)).toBe(1234567890.01)
    expect(format(parseInfo({ type: 'number', decimal: 2 }), 1234567890.0163)).toBe(1234567890.02)
  })

  it('format string', () => {
    expect(format(parseInfo({ type: 'number' }), '1234567890')).toBe(1234567890)
    expect(format(parseInfo({ type: 'number' }), '1234567890.01')).toBe(1234567890.01)
    expect(format(parseInfo({ type: 'number' }), '1234567890.01.01')).toBe(1234567890.01)
    expect(format(parseInfo({ type: 'number', decimal: 2 }), '1234567890.0123')).toBe(1234567890.01)
    expect(format(parseInfo({ type: 'number', decimal: 2 }), '1234567890.0163')).toBe(1234567890.02)
  })

  it('format error', () => {
    expect(format(parseInfo({ type: 'number' }), '')).toBe(null)

    expect(isNaN(format(parseInfo({ type: 'number' }), ''))).toBe(false)
    expect(isNaN(format(parseInfo({ type: 'number' }), 'abc'))).toBe(true)
  })

  it('format default', () => {
    expect(format(parseInfo({ type: 'number', default: 123 }), '')).toBe(123)
    expect(format(parseInfo({ type: 'number', default: 123 }), null)).toBe(123)
    expect(format(parseInfo({ type: 'number', default: 123 }), undefined)).toBe(123)
    expect(format(parseInfo({ type: 'number', default: 123 }), '456')).toBe(456)
    expect(format(parseInfo({ type: 'number', default: 123 }), 456)).toBe(456)
  })
})
