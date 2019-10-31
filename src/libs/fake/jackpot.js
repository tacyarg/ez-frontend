import uuid from 'uuid/v4'

const user = {
  id: uuid(),
  image:
    'https://steamcdn-a.opskins.media/steamcommunity/public/images/avatars/f2/f20f3036e3182ce5c31b33e512dfdd3251b47d33_full.jpg',
  username: 'tacyarg',
  rank: 10,
}

function getGfuel() {
  return {
    userid: user.id,
    id: uuid(),
    price: 10,
    name: 'g-fuel',
    image:
      'https://static.wax.io/d-img/dynamic-apps/img/g-fuel-bundle-hydration-30-servings-x3-7c4e56b049.png',
  }
}

function getController() {
  return {
    userid: user.id,
    price: 20,
    name: 'controller',
    image:
      'https://static.wax.io/d-img/dynamic-apps/img/6a750b25693576c444dbcb20b13baf63.png',
  }
}

function getShoe() {
  return {
    userid: user.id,
    price: 30,
    name: 'shoe',
    image:
      'https://static.wax.io/d-img/dynamic-apps/img/php83uobc-dc13bb9432.png',
  }
}

function generateBet() {
  const items = [getGfuel(), getController(), getShoe()]

  const value = items.reduce((memo, item) => {
    memo += item.price
    return memo
  }, 0)

  return {
    color: '#e94c4c',
    id: uuid(),
    items,
    userid: user.id,
    value,
  }
}

module.exports = () => {
  const bets = [
    generateBet(),
    generateBet(),
    generateBet(),
    generateBet(),
    generateBet(),
  ]

  const items = bets.reduce((memo, b) => {
    return [...memo, ...b.items]
  }, [])

  const value = items.reduce((memo, item) => {
    memo += item.price
    return memo
  }, 0)

  const players = {}
  players[user.id] = user

  const game = {
    id: uuid(),
    state: 'open',
    type: 'itemJackpot',
    config: {
      betValueMax: 100000, // max value per bet
      betValueMin: 1, // min value per bet
      betItemLimit: 10, // max items per bet,
      roundItemLimit: 100,
      // duration: 2 * (60 * 1000), // total duration of the game
      duration: 30 * 1000,
      drawDuration: 5 * 1000,
      cooldownDuration: 12 * 1000,
      multibet: true,
      rake: 0.1,
    },
    players,
    items,
    bets,
    value,
    payouts: [],
    rake: [],
    refunds: [],
    timeleft: 0, // duration in s
    winner: null,
  }

  setInterval(() => {
    // if(game.state === 'rolling') return
    if (game.timeleft < 1) {
      game.timeleft = 100
    }
    game.timeleft -= 1
  }, 1000)

  // console.log(game);

  return game
}
