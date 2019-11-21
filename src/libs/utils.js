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

exports.makeID = function (start, end) {
  return [start, end].join('_')
}

exports.Authenticate = async function (actions, tokenid) {
  if (tokenid == null) {
    return exports.Authenticate(actions, await actions.auth.call('token'))
  }

  return actions.auth
    .call('authenticate', tokenid)
    .then(userid => {
      window.localStorage.setItem('tokenid', tokenid)
      return { userid, tokenid }
    })
    .catch(err => {
      return exports.Authenticate(actions)
    })
}

exports.formatJson = schema => {
  return JSON.stringify(schema, null, 2)
}

exports.findCurrentRound = (data = {}) => {
  return Object.values(data)
    .sort(function (a, b) {
      return a.created - b.created
    })
    .pop()
}


exports.parseValue = function (data = 0) {
  return Number(data).toLocaleString(undefined, {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  })
}

exports.parseCoinflip = coinflip => {
  const {
    players = [],
    bets = [],
    winner,
    config,
    timeleft = 0,
    history= [],
  } = coinflip

  const Player1 = players[0]
  const Player1Bet = bets[0]
  const Player2 = players[1]
  const Player2Bet = bets[1]
  const selection = config.selections.find(b => Player1Bet.selection !== b)
  const time = Math.floor(timeleft / 1000) || 0
  const gameWinner = players.find(p => p.id === winner)

  return {
    ...coinflip,
    Player1,
    Player1Bet,
    Player2,
    Player2Bet,
    selection,
    time,
    gameWinner,
    winner,
    winnerBet: bets.find(b => b.userid === winner),
    // lastStateUpdate: history[history.length - 1].updated
  }
}