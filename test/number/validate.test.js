import { describe, expect, it } from '@jest/globals'
import parseInfo from '../../src/parseInfo.js'
import format from '../../src/number/format.js'
import validate from '../../src/number/validate.js'

describe('Number Validator', () => {
  it('validate length', () => {
    const parameterInfo = parseInfo({
      type: 'number',
      required: true,
      length: 5
    })

    const value1 = '12345'
    const messages1 = validate(parameterInfo, format(parameterInfo, value1))
    expect(messages1).toEqual([])

    const value2 = '123456'
    const messages2 = validate(parameterInfo, format(parameterInfo, value2))
    expect(messages2).toEqual(['SUMOR_NUMBER_LENGTH'])
  })

  it('validate required', () => {
    const parameterInfo = parseInfo({
      type: 'number',
      required: true,
      length: 5
    })

    const value1 = '12345'
    const messages1 = validate(parameterInfo, format(parameterInfo, value1))
    expect(messages1).toEqual([])

    const value2 = ''
    const messages2 = validate(parameterInfo, format(parameterInfo, value2))
    expect(messages2).toEqual(['SUMOR_REQUIRED'])

    const value3 = null
    const messages3 = validate(parameterInfo, format(parameterInfo, value3))
    expect(messages3).toEqual(['SUMOR_REQUIRED'])

    const value4 = undefined
    const messages4 = validate(parameterInfo, format(parameterInfo, value4))
    expect(messages4).toEqual(['SUMOR_REQUIRED'])
  })
})
