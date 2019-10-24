const lodash = require('lodash')

exports.ONE_MINUTE_MS = 60 * 1000
exports.ONE_HOUR_MS = 60 * exports.ONE_MINUTE_MS
exports.ONE_DAY_MS = 24 * exports.ONE_HOUR_MS

exports.loop = async (fn, delay = 1000, max, count = 0, result) => {
  if (max && count >= max) return result
  result = await fn(count)
  await new Promise(res => setTimeout(res, delay))
  return exports.loop(fn, delay, max, count + 1, result)
}

exports.isEnvArray = (value = '') => {
  return value.toString().includes(',')
}

const isLower = new RegExp('^[a-z0-9]')
exports.isEnvParsable = key => {
  return isLower.test(key)
}

exports.parseEnvArray = value => {
  return lodash(value.split(','))
    .map(x => x.trim())
    .compact()
    .value()
}

exports.mapValues = (kv, valueFn) => {
  return lodash.reduce(
    kv,
    (result, value, key) => {
      result[key] = valueFn(value)
      return result
    },
    {}
  )
}

exports.parseEnv = env => {
  return lodash.reduce(
    env,
    (result, value, key) => {
      if (!exports.isEnvParsable(key)) return result
      const path = key.split('.')
      let val = value
      if (exports.isEnvArray(value)) {
        val = exports.parseEnvArray(value)
      }
      lodash.set(result, path, val)
      return result
    },
    {}
  )
}

exports.makeID = function(start, end) {
  return [start, end].join('_')
}

exports.formatJson = schema => {
  return JSON.stringify(schema, null, 2)
}