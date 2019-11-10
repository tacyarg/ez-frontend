const user = {
  id: 'tacyarg',
  image:
    'https://steamcdn-a.opskins.media/steamcommunity/public/images/avatars/f2/f20f3036e3182ce5c31b33e512dfdd3251b47d33_full.jpg',
  username: 'tacyarg',
  rank: 1,
}

const item = {
  name: 'g-fuel',
  image:
    'https://static.wax.io/d-img/dynamic-apps/img/g-fuel-bundle-hydration-30-servings-x3-7c4e56b049.png',
}

const item_two = {
  name: 'controller',
  image:
    'https://static.wax.io/d-img/dynamic-apps/img/6a750b25693576c444dbcb20b13baf63.png',
}

const item_three = {
  name: 'shoe',
  image:
    'https://static.wax.io/d-img/dynamic-apps/img/php83uobc-dc13bb9432.png',
}

const config = (props = {}) => {
  return {
    betValueMax: 100000, // max value per bet
    betValueMin: 2.5, // min value per bet
    betItemLimit: 10, // max items per bet
    duration: 60 * (60 * 1000), // the time the game remains open.
    drawDuration: 15 * 1000,
    cooldownDuration: 10 * 1000,
    selections: ['heads', 'tails'],
    rake: 0.1,
    discrepancyMin: 0.95,
    discrepancyMax: 1.05,
    ...props,
  }
}

module.exports = () => {
  const coinflips = []

  for (var i = 0; i < 10; i++) {
    coinflips.push({
      config: config(),
      players: [user, user],
      items: [
        item,
        item_two,
        item,
        item_two,
        item_three,
        item,
        item,
        item_two,
        item,
        item_two,
        item_three,
        item,
      ],
      state: 'open',
      value: 4.2,
      winner: null,
    })
  }

  return coinflips
}
