import React, { useState, useEffect } from 'react'
import Wiring from '../../libs/wiring'
import Wheel from './Wheel'

const Spinner = ({
  state = 'open',
  items = [],
  value = 5.43,
  bets = [],
  outcome = null,
}) => {
  const [counter, setCounter] = useState(0)
  const [config, setData] = useState({ spinnerBets: bets })
  const currentBets = !isRolling ? bets : data.spinnerBets

  useEffect(() => {
    const config = spinnerConfig(outcome)
    setData(config)
  }, [outcome])

  const [isRolling, setIsRolling] = useState(false)

  useEffect(() => {
    if (state === 'cooldown') setIsRolling(true)
    if (state === 'open') setIsRolling(false)
  }, [state])

  const spinnerConfig = outcome => {
    // outcome = outcome * 100
    // calculate all bet percentages
    const spread = bets.map(bet => {
      const p = (bet.value / value) * 100
      setCounter(counter + p)
      return p
    })
    console.log('percents', spread)

    // calculate outcome offset
    const offset = spread.reduce((memo, p) => {
      if (outcome < p && outcome + 0.05 > p) {
        memo = -0.45
      } else if (outcome > p && outcome - 0.05 < p) {
        memo = 0.1
      }
      return memo
    }, 0)

    //add more width
    let spinnerBets = [...bets]
    while (spinnerBets.length < bets.length * 10) {
      spinnerBets = [...spinnerBets, ...bets]
    }

    const width = spinnerBets.reduce((memo, b) => {
      memo += (b.value / value) * 100
      return memo
    }, 0)

    return {
      spread,
      offset,
      outcome, // 0/1
      translateX: outcome * 100 + 550 + offset,
      //        translateX: outcome + 50 + offset + 500,
      spinnerBets,
      width,
      // winningIndex:
    }
  }

  return (
    <Wheel
      isRolling={isRolling}
      config={config}
      items={items}
      outcome={outcome}
      bets={currentBets}
      value={value}
    />
  )
}

Spinner.CurrentJackpotRound = Wiring.connectMemo(Spinner, ({ jackpot }) => {
  const { provable, state, items, value, bets, players } = jackpot
  return {
    state,
    items,
    value,
    bets,
    players,
    outcome: provable ? provable.outcome : null,
  }
})

export default Spinner