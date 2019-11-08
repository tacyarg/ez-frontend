import uuid from 'uuid/v4'

const user = {
  id: uuid(),
  image:
    'https://steamcdn-a.opskins.media/steamcommunity/public/images/avatars/f2/f20f3036e3182ce5c31b33e512dfdd3251b47d33_full.jpg',
  username: 'tacyarg',
  rank: 10,
}

module.exports = () => {
  const TOTAL_PLAYERS = 100
  let count = 0
  const players = []

  while (count++ < TOTAL_PLAYERS) {
    players.push(user)
  }

  return players
}
