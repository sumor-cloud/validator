# validator

A [Sumor Cloud](https://sumor.cloud) Tool.  
[More Documentation](https://sumor.cloud)

This is a lightweight validator for Node.JS.
It can validate the input string or number based on the rules you defined.

[![CI](https://github.com/sumor-cloud/validator/actions/workflows/ci.yml/badge.svg)](https://github.com/sumor-cloud/validator/actions/workflows/ci.yml)
[![Test](https://github.com/sumor-cloud/validator/actions/workflows/ut.yml/badge.svg)](https://github.com/sumor-cloud/validator/actions/workflows/ut.yml)
[![Coverage](https://github.com/sumor-cloud/validator/actions/workflows/coverage.yml/badge.svg)](https://github.com/sumor-cloud/validator/actions/workflows/coverage.yml)
[![Audit](https://github.com/sumor-cloud/validator/actions/workflows/audit.yml/badge.svg)](https://github.com/sumor-cloud/validator/actions/workflows/audit.yml)

## Installation

```bash
npm i @sumor/validator --save
```

## Prerequisites

### Node.JS version

Require Node.JS version 16.x or above

### require Node.JS ES module

As this package is written in ES module,
please change the following code in your `package.json` file:

```json
{
  "type": "module"
}
```

## Usage

### Validate String Usage

```js
import { validate } from '@sumor/validator'

const parameterInfo = {
  type: 'string',
  required: true,
  length: 10,
  rule: [
    // only allow a-z, A-Z, 0-9
    {
      code: 'ONLY_CHAR_DIGIT',
      expression: '^[a-zA-Z0-9]*$',
      message: 'only allow a-z, A-Z, 0-9'
    },
    // need include demo
    {
      code: 'INCLUDE_DEMO',
      expression: 'demo',
      message: 'need include demo'
    },
    // use function to check
    {
      code: 'LENGTH_GREATER_THAN_5',
      expression: value => {
        return value.length > 5
      },
      message: 'length should be greater than 5'
    }
  ],
  i18n: {
    zh: {
      ONLY_CHAR_DIGIT: '只允许输入字母和数字',
      INCLUDE_DEMO: '需要包含demo',
      LENGTH_GREATER_THAN_5: '长度应大于5'
    },
    'zh-TW': {
      ONLY_CHAR_DIGIT: '只允許輸入字母和數字',
      INCLUDE_DEMO: '需要包含demo',
      LENGTH_GREATER_THAN_5: '長度應大於5'
    }
  }
}

const messages1 = validate(parameterInfo, 'demo123456')
console.log(messages1) // []

const messages2 = validate(parameterInfo, 'de1234567')
console.log(messages2) // [ 'only allow a-z, A-Z, 0-9' ]

const messages3 = validate(parameterInfo, 'demo!')
console.log(messages3) // [ 'only allow a-z, A-Z, 0-9', 'need include demo' ]

const messages4 = validate(parameterInfo, 'de!mo')
console.log(messages4) // [ 'only allow a-z, A-Z, 0-9', 'need include demo' ]

const messages5 = validate(parameterInfo, 'de')
console.log(messages5) // [ 'only allow a-z, A-Z, 0-9', 'need include demo', 'length should be greater than 5' ]

// translate to zh
const messages6 = validate(parameterInfo, 'de', 'zh')
console.log(messages6) // [ '只允许输入字母和数字', '需要包含demo', '长度应大于5' ]

// translate to zh-TW
const messages7 = validate(parameterInfo, 'de', 'zh-TW')
console.log(messages7) // [ '只允許輸入字母和數字', '需要包含demo', '長度應大於5' ]
```

### Validate Number Usage

```js
import { validate } from '@sumor/validator'

const parameterInfo = {
  type: 'number',
  required: true,
  rule: [
    // need greater than 5
    {
      code: 'GREATER_THAN_5',
      expression: value => {
        return value > 5
      },
      message: 'value should be greater than 5'
    }
  ],
  i18n: {
    zh: {
      GREATER_THAN_5: '值应大于5'
    },
    'zh-TW': {
      GREATER_THAN_5: '值應大於5'
    }
  }
}

const messages1 = validate(parameterInfo, 6)
console.log(messages1) // []

const messages2 = validate(parameterInfo, 5)
console.log(messages2) // [ 'value should be greater than 5' ]

const messages3 = validate(parameterInfo, 4)
console.log(messages3) // [ 'value should be greater than 5' ]

// translate to zh
const messages4 = validate(parameterInfo, 4, 'zh')
console.log(messages4) // [ '值应大于5' ]

// translate to zh-TW
const messages5 = validate(parameterInfo, 4, 'zh-TW')
console.log(messages5) // [ '值應大於5' ]
```

### Format String Usage

##### Trim Usage

will remove the useless space for prefix and suffix

```js
import { format } from '@sumor/validator'

const parameterInfo = {
  type: 'string',
  trim: true // default is true for string type
}

const value = format(parameterInfo, ' demo ')
console.log(value) // will print "demo", useless space will be removed
```

##### Lowercase Usage

will convert the string to lowercase

```js
import { format } from '@sumor/validator'

const parameterInfo = {
  type: 'string',
  lowercase: true
}

const value = format(parameterInfo, 'Demo')
console.log(value) // will print "demo", all characters will be converted to lowercase
```

##### Uppercase Usage

will convert the string to uppercase

```js
import { format } from '@sumor/validator'

const parameterInfo = {
  type: 'string',
  uppercase: true
}

const value = format(parameterInfo, 'Demo')
console.log(value) // will print "DEMO", all characters will be converted to uppercase
```

### Format Number Usage

```js
import { format } from '@sumor/validator'

const parameterInfo = {
  type: 'number',
  decimal: 2
}

const value1 = format(parameterInfo, 1.234)
console.log(value1) // will print 1.23, only keep 2 decimal

const value2 = format(parameterInfo, '1.234')
console.log(value2) // will convert to number 1.23, only keep 2 decimal
```
