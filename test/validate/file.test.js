import { describe, expect, it } from '@jest/globals'
import parseInfo from '../../src/validate/parseInfo.js'
import format from '../../src/format/file.js'
import validate from '../../src/validate/basic/file.js'

describe('File Validator', () => {
  it('validate length', () => {
    const parameterInfo = parseInfo({
      type: 'file',
      length: 3
    })

    const value1 = [{ size: 4 }]
    const messages1 = validate(parameterInfo, format(parameterInfo, value1))
    expect(messages1).toEqual([])

    const value2 = [{ size: 4 }, { size: 4 }, { size: 4 }, { size: 4 }]
    const messages2 = validate(parameterInfo, format(parameterInfo, value2))
    expect(messages2).toEqual(['SUMOR_FILE_LENGTH'])
  })

  it('validate required', () => {
    const parameterInfo = parseInfo({
      type: 'file',
      required: true
    })

    const value1 = [{ size: 4 }]
    const messages1 = validate(parameterInfo, format(parameterInfo, value1))
    expect(messages1).toEqual([])

    const value2 = []
    const messages2 = validate(parameterInfo, format(parameterInfo, value2))
    expect(messages2).toEqual(['SUMOR_REQUIRED'])
  })
})
