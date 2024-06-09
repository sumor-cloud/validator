import { describe, expect, it } from '@jest/globals'
import parseInfo from '../../src/validate/parseInfo.js'
import format from '../../src/format/array.js'

describe('array formatter', () => {
  it('format empty', () => {
    const result = format(parseInfo({ type: 'array' }), null)
    expect(result).toEqual([])
  })
  it('format trim', () => {
    const result1 = format(parseInfo({ type: 'array' }), [' 123 '])
    expect(result1).toEqual(['123'])
    const result2 = format(parseInfo({ type: 'array', trim: false }), [' 123 '])
    expect(result2).toEqual([' 123 '])
  })
  it('format upperCase', () => {
    const result = format(parseInfo({ type: 'array', upperCase: true }), ['abc'])
    expect(result).toEqual(['ABC'])
  })
  it('format lowerCase', () => {
    const result = format(parseInfo({ type: 'array', lowerCase: true }), ['ABC'])
    expect(result).toEqual(['abc'])
  })
  it('format default empty string', () => {
    const result = format(parseInfo({ type: 'array', default: 'abc' }), [''])
    expect(result).toEqual(['abc'])
  })
  it('format default has value', () => {
    const result = format(parseInfo({ type: 'array', default: 'abc' }), ['123'])
    expect(result).toEqual(['123'])
  })
  it('format decimal', () => {
    const result1 = format(parseInfo({ type: 'array', decimal: 0 }), [123.456])
    expect(result1).toEqual([123])
    const result2 = format(parseInfo({ type: 'array', decimal: 2 }), [123.456])
    expect(result2).toEqual([123.46])
    const result3 = format(parseInfo({ type: 'array' }), [123.456])
    expect(result3).toEqual([123.456])
  })
})
