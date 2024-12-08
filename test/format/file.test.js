import { describe, expect, it } from '@jest/globals'
import parseInfo from '../../src/validate/parseInfo.js'
import format from '../../src/format/file.js'

describe('file formatter', () => {
  it('format empty', () => {
    const result = format(parseInfo({ type: 'file' }), null)
    expect(result).toEqual(null)
  })
  it('format multiply empty', () => {
    const result = format(parseInfo({ type: 'file', multiple: true }), null)
    expect(result).toEqual([])
  })
})
