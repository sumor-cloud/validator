import { describe, expect, it } from '@jest/globals'
import parseInfo from '../../src/parseInfo.js'
import format from '../../src/file/format.js'

describe('file formatter', () => {
  it('format empty', () => {
    const result = format(parseInfo({}), null)
    expect(result).toEqual([])
  })
})
