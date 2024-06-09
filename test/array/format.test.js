import { describe, expect, it } from '@jest/globals'
import parseInfo from '../../src/parseInfo.js'
import format from '../../src/array/format.js'

describe('array formatter', () => {
  it('format empty', () => {
    const result = format(parseInfo({}), null)
    expect(result).toEqual([])
  })
  it('format trim', () => {
    const result = format(parseInfo({}), [' 123 '])
    expect(result).toEqual(['123'])
  })
  it('format upperCase', () => {
    const result = format(parseInfo({ upperCase: true }), ['abc'])
    expect(result).toEqual(['ABC'])
  })
  it('format lowerCase', () => {
    const result = format(parseInfo({ lowerCase: true }), ['ABC'])
    expect(result).toEqual(['abc'])
  })
  it('format default empty string', () => {
    const result = format(parseInfo({ default: 'abc' }), [''])
    expect(result).toEqual(['abc'])
  })
  it('format default has value', () => {
    const result = format(parseInfo({ default: 'abc' }), ['123'])
    expect(result).toEqual(['123'])
  })
})
