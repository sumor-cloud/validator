import { describe, expect, it } from '@jest/globals'
import parseInfo from '../../src/validate/parseInfo.js'
import format from '../../src/format/array.js'
import validate from '../../src/validate/basic/array.js'

describe('Array Validator', () => {
  it('validate length', () => {
    const parameterInfo = parseInfo({
      type: 'array',
      length: 3
    })

    const value1 = ['123', '456', '789']
    const messages1 = validate(parameterInfo, format(parameterInfo, value1))
    expect(messages1).toEqual([])

    const value2 = ['123', '456', '789', '012']
    const messages2 = validate(parameterInfo, format(parameterInfo, value2))
    expect(messages2).toEqual(['SUMOR_ARRAY_LENGTH'])
  })

  it('validate required', () => {
    const parameterInfo = parseInfo({
      type: 'array',
      required: true
    })

    const value1 = ['123']
    const messages1 = validate(parameterInfo, format(parameterInfo, value1))
    expect(messages1).toEqual([])

    const value2 = []
    const messages2 = validate(parameterInfo, format(parameterInfo, value2))
    expect(messages2).toEqual(['SUMOR_REQUIRED'])
  })
})
