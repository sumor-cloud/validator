import parseInfo from '../validate/parseInfo.js'
import stringFormat from './string.js'
import numberFormat from './number.js'
import arrayFormat from './array.js'
import fileFormat from './file.js'

export default (info, value) => {
  info = parseInfo(info)
  info.error = !!info.error // if error is true, will return error object

  let formattedValue = value

  switch (info.type) {
    case 'string':
      formattedValue = stringFormat(info, value)
      break
    case 'number':
      formattedValue = numberFormat(info, value)
      break
    case 'array':
      formattedValue = arrayFormat(info, value)
      break
    case 'file':
      formattedValue = fileFormat(info, value)
      break
  }

  return formattedValue
}
