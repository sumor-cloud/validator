import { describe, expect, it } from '@jest/globals'
import parseInfo from '../../src/parseInfo.js'
import format from '../../src/string/format.js'

describe('string formatter', () => {
  it('format trim', () => {
    const result = format(parseInfo({}), ' 123 ')
    expect(result).toBe('123')
  })
})
