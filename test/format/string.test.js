import { describe, expect, it } from '@jest/globals'
import parseInfo from '../../src/validate/parseInfo.js'
import format from '../../src/format/string.js'

describe('string formatter', () => {
  it('format trim', () => {
    const result = format(parseInfo({}), ' 123 ')
    expect(result).toEqual('123')
  })
  it('format upperCase', () => {
    const result = format(parseInfo({ upperCase: true }), 'abc')
    expect(result).toEqual('ABC')
  })
  it('format lowerCase', () => {
    const result = format(parseInfo({ lowerCase: true }), 'ABC')
    expect(result).toEqual('abc')
  })
  it('format default empty string', () => {
    const result = format(parseInfo({ default: 'abc' }), '')
    expect(result).toEqual('abc')
  })
  it('format default null', () => {
    const result = format(parseInfo({ default: 'abc' }), null)
    expect(result).toEqual('abc')
  })
  it('format default undefined', () => {
    const result = format(parseInfo({ default: 'abc' }), undefined)
    expect(result).toEqual('abc')
  })
  it('format default has value', () => {
    const result = format(parseInfo({ default: 'abc' }), '123')
    expect(result).toEqual('123')
  })
  it('format object value', () => {
    const result = format(parseInfo({}), { a: 1 })
    expect(result).toEqual('{"a":1}')
  })
  it('format number value', () => {
    const result = format(parseInfo({}), 123)
    expect(result).toEqual('123')
  })
  it('format null', () => {
    const result = format(parseInfo({}), null)
    expect(result).toEqual(null)
  })
  it('format undefined', () => {
    const result = format(parseInfo({}), undefined)
    expect(result).toEqual(null)
  })
})
