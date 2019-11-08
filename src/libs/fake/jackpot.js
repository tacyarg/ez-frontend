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

  const players = [user]
  let game = {
    bets: [
      {
        color: '#f9a538',
        id: '82739a81-62a1-4dbb-97b2-dc27691b12f4',
        items: [
          {
            canDeposit: false,
            canGift: true,
            canSell: true,
            canTrade: true,
            canWithdraw: true,
            cid: '15717727',
            color: 'd32ee6',
            id: '53141db4-f40d-44af-aa1f-14afda4a21f2',
            image:
              'https://static.wax.io/d-img/dynamic-apps/img/3242f38103e0b1f551654aff2aaa0e0c.png',
            lastUserid: 'bc1e0874-72e0-4c92-87a3-ca9c2a51e617',
            location: 'Local',
            name: 'Hydration - Dragon Fruit Tub (30 Servings)',
            price: 25.99,
            rarity: null,
            type: 'items',
            userid: '4a0e0caf-9fe3-4b72-b515-21ef2cec16a2',
          },
        ],
        joined: 1573024620569,
        type: 'items',
        userid: 'bc1e0874-72e0-4c92-87a3-ca9c2a51e617',
        value: 25.99,
      },
      {
        color: '#ff0048',
        id: '48638e23-0e8b-499a-a30c-2c7fa8b24af3',
        items: [
          {
            canDeposit: false,
            canGift: true,
            canSell: true,
            canTrade: true,
            canWithdraw: true,
            cid: '19122761',
            color: '#777777',
            id: 'ea51daac-642c-4178-8b79-9634fbf25190',
            image:
              'https://files.opskins.media/file/vgo-img/item/wax-key-600.png',
            lastUserid: '7d75d989-fa67-4e5f-841d-ca505699b7a6',
            location: 'Local',
            name: 'WAX Key',
            price: 2.5,
            rarity: null,
            type: 'items',
            userid: '4a0e0caf-9fe3-4b72-b515-21ef2cec16a2',
          },
          {
            canDeposit: false,
            canGift: true,
            canSell: true,
            canTrade: true,
            canWithdraw: true,
            cid: '11887847',
            color: '#777777',
            id: 'fdffa2e4-0997-415d-882b-f69562a228ce',
            image:
              'https://files.opskins.media/file/vgo-img/item/wax-key-600.png',
            lastUserid: '7d75d989-fa67-4e5f-841d-ca505699b7a6',
            location: 'Local',
            name: 'WAX Key',
            price: 2.5,
            rarity: null,
            type: 'items',
            userid: '4a0e0caf-9fe3-4b72-b515-21ef2cec16a2',
          },
          {
            canDeposit: false,
            canGift: true,
            canSell: true,
            canTrade: true,
            canWithdraw: true,
            cid: '11950750',
            color: '#777777',
            id: '5e898ee1-9bd5-4d26-91a5-14968237f35e',
            image:
              'https://files.opskins.media/file/vgo-img/item/wax-key-600.png',
            lastUserid: '7d75d989-fa67-4e5f-841d-ca505699b7a6',
            location: 'Local',
            name: 'WAX Key',
            price: 2.5,
            rarity: null,
            type: 'items',
            userid: '4a0e0caf-9fe3-4b72-b515-21ef2cec16a2',
          },
          {
            canDeposit: false,
            canGift: true,
            canSell: true,
            canTrade: true,
            canWithdraw: true,
            cid: '11888066',
            color: '#777777',
            id: 'a4f171a7-9636-467c-ad4c-46469c26eaed',
            image:
              'https://files.opskins.media/file/vgo-img/item/wax-key-600.png',
            lastUserid: '7d75d989-fa67-4e5f-841d-ca505699b7a6',
            location: 'Local',
            name: 'WAX Key',
            price: 2.5,
            rarity: null,
            type: 'items',
            userid: '4a0e0caf-9fe3-4b72-b515-21ef2cec16a2',
          },
          {
            canDeposit: false,
            canGift: true,
            canSell: true,
            canTrade: true,
            canWithdraw: true,
            cid: '11890157',
            color: '#777777',
            id: '3f5a4ff8-3d6a-4a61-92b0-95c97ff4b66c',
            image:
              'https://files.opskins.media/file/vgo-img/item/wax-key-600.png',
            lastUserid: '7d75d989-fa67-4e5f-841d-ca505699b7a6',
            location: 'Local',
            name: 'WAX Key',
            price: 2.5,
            rarity: null,
            type: 'items',
            userid: '4a0e0caf-9fe3-4b72-b515-21ef2cec16a2',
          },
          {
            canDeposit: false,
            canGift: true,
            canSell: true,
            canTrade: true,
            canWithdraw: true,
            cid: '19229192',
            color: '#777777',
            id: '447b88b2-cbb2-4b03-8d6c-8639480792ac',
            image:
              'https://files.opskins.media/file/vgo-img/item/wax-key-600.png',
            lastUserid: '7d75d989-fa67-4e5f-841d-ca505699b7a6',
            location: 'Local',
            name: 'WAX Key',
            price: 2.5,
            rarity: null,
            type: 'items',
            userid: '4a0e0caf-9fe3-4b72-b515-21ef2cec16a2',
          },
        ],
        joined: 1573024631659,
        type: 'items',
        userid: '7d75d989-fa67-4e5f-841d-ca505699b7a6',
        value: 15,
      },
    ],
    config: {
      betItemLimit: 10,
      betValueMax: 100000,
      betValueMin: 1,
      cooldownDuration: 12000,
      drawDuration: 5000,
      duration: 30000,
      multibet: true,
      rake: 0.1,
    },
    created: 1573024544120,
    done: true,
    history: [
      { state: 'open', updated: 1573024631852 },
      { state: 'running', updated: 1573024662067 },
      { state: 'draw', updated: 1573024663851 },
      { state: 'rake', updated: 1573024664863 },
      { state: 'cooldown', updated: 1573024676957 },
      { state: 'payout', updated: 1573024677964 },
      { state: 'ended', updated: 1573024678082 },
      { state: 'Wait Payouts', updated: 1573024679090 },
    ],
    id: '4a0e0caf-9fe3-4b72-b515-21ef2cec16a2',
    items: [
      {
        canDeposit: false,
        canGift: true,
        canSell: true,
        canTrade: true,
        canWithdraw: true,
        cid: '15717727',
        color: 'd32ee6',
        id: '53141db4-f40d-44af-aa1f-14afda4a21f2',
        image:
          'https://static.wax.io/d-img/dynamic-apps/img/3242f38103e0b1f551654aff2aaa0e0c.png',
        lastUserid: 'bc1e0874-72e0-4c92-87a3-ca9c2a51e617',
        location: 'Local',
        name: 'Hydration - Dragon Fruit Tub (30 Servings)',
        price: 25.99,
        rarity: null,
        type: 'items',
        userid: '4a0e0caf-9fe3-4b72-b515-21ef2cec16a2',
      },
      {
        canDeposit: false,
        canGift: true,
        canSell: true,
        canTrade: true,
        canWithdraw: true,
        cid: '19122761',
        color: '#777777',
        id: 'ea51daac-642c-4178-8b79-9634fbf25190',
        image: 'https://files.opskins.media/file/vgo-img/item/wax-key-600.png',
        lastUserid: '7d75d989-fa67-4e5f-841d-ca505699b7a6',
        location: 'Local',
        name: 'WAX Key',
        price: 2.5,
        rarity: null,
        type: 'items',
        userid: '4a0e0caf-9fe3-4b72-b515-21ef2cec16a2',
      },
      {
        canDeposit: false,
        canGift: true,
        canSell: true,
        canTrade: true,
        canWithdraw: true,
        cid: '11887847',
        color: '#777777',
        id: 'fdffa2e4-0997-415d-882b-f69562a228ce',
        image: 'https://files.opskins.media/file/vgo-img/item/wax-key-600.png',
        lastUserid: '7d75d989-fa67-4e5f-841d-ca505699b7a6',
        location: 'Local',
        name: 'WAX Key',
        price: 2.5,
        rarity: null,
        type: 'items',
        userid: '4a0e0caf-9fe3-4b72-b515-21ef2cec16a2',
      },
      {
        canDeposit: false,
        canGift: true,
        canSell: true,
        canTrade: true,
        canWithdraw: true,
        cid: '11950750',
        color: '#777777',
        id: '5e898ee1-9bd5-4d26-91a5-14968237f35e',
        image: 'https://files.opskins.media/file/vgo-img/item/wax-key-600.png',
        lastUserid: '7d75d989-fa67-4e5f-841d-ca505699b7a6',
        location: 'Local',
        name: 'WAX Key',
        price: 2.5,
        rarity: null,
        type: 'items',
        userid: '4a0e0caf-9fe3-4b72-b515-21ef2cec16a2',
      },
      {
        canDeposit: false,
        canGift: true,
        canSell: true,
        canTrade: true,
        canWithdraw: true,
        cid: '11888066',
        color: '#777777',
        id: 'a4f171a7-9636-467c-ad4c-46469c26eaed',
        image: 'https://files.opskins.media/file/vgo-img/item/wax-key-600.png',
        lastUserid: '7d75d989-fa67-4e5f-841d-ca505699b7a6',
        location: 'Local',
        name: 'WAX Key',
        price: 2.5,
        rarity: null,
        type: 'items',
        userid: '4a0e0caf-9fe3-4b72-b515-21ef2cec16a2',
      },
      {
        canDeposit: false,
        canGift: true,
        canSell: true,
        canTrade: true,
        canWithdraw: true,
        cid: '11890157',
        color: '#777777',
        id: '3f5a4ff8-3d6a-4a61-92b0-95c97ff4b66c',
        image: 'https://files.opskins.media/file/vgo-img/item/wax-key-600.png',
        lastUserid: '7d75d989-fa67-4e5f-841d-ca505699b7a6',
        location: 'Local',
        name: 'WAX Key',
        price: 2.5,
        rarity: null,
        type: 'items',
        userid: '4a0e0caf-9fe3-4b72-b515-21ef2cec16a2',
      },
      {
        canDeposit: false,
        canGift: true,
        canSell: true,
        canTrade: true,
        canWithdraw: true,
        cid: '19229192',
        color: '#777777',
        id: '447b88b2-cbb2-4b03-8d6c-8639480792ac',
        image: 'https://files.opskins.media/file/vgo-img/item/wax-key-600.png',
        lastUserid: '7d75d989-fa67-4e5f-841d-ca505699b7a6',
        location: 'Local',
        name: 'WAX Key',
        price: 2.5,
        rarity: null,
        type: 'items',
        userid: '4a0e0caf-9fe3-4b72-b515-21ef2cec16a2',
      },
    ],
    payoutReceipts: ['4a0e0caf-9fe3-4b72-b515-21ef2cec16a2'],
    payouts: [
      {
        game: 'Jackpot',
        gameid: '4a0e0caf-9fe3-4b72-b515-21ef2cec16a2',
        id: '4a0e0caf-9fe3-4b72-b515-21ef2cec16a2',
        itemids: [
          '53141db4-f40d-44af-aa1f-14afda4a21f2',
          'ea51daac-642c-4178-8b79-9634fbf25190',
          'fdffa2e4-0997-415d-882b-f69562a228ce',
          '5e898ee1-9bd5-4d26-91a5-14968237f35e',
          'a4f171a7-9636-467c-ad4c-46469c26eaed',
          '3f5a4ff8-3d6a-4a61-92b0-95c97ff4b66c',
          '447b88b2-cbb2-4b03-8d6c-8639480792ac',
        ],
        message: 'Jackpot Win',
        userid: '7d75d989-fa67-4e5f-841d-ca505699b7a6',
        value: 40.989999999999995,
      },
    ],
    players: [
      {
        avatar:
          'https://steamcdn-a.opskins.media/steamcommunity/public/images/avatars/f2/f20f3036e3182ce5c31b33e512dfdd3251b47d33_full.jpg',
        created: 1573010108605,
        expresstradeurl: 'https://trade.wax.io/t/3667841/6eX2NLWh',
        id: 'bc1e0874-72e0-4c92-87a3-ca9c2a51e617',
        opskinsid: 3667841,
        username: 'tacyarg',
      },
      {
        avatar:
          'https://www.gravatar.com/avatar/ef9320bf2b3929e7a9360fc24a68da35?d=identicon&r=pg&s=32',
        created: 1573019536414,
        expresstradeurl: 'https://trade.wax.io/t/6973946/OCWpOZZD',
        id: '7d75d989-fa67-4e5f-841d-ca505699b7a6',
        opskinsid: 6973946,
        username: 'User 6973946',
      },
    ],
    provable: {
      hash:
        '3q40/yI0UYL7mLruK8N/uBtWvBwk2bPXL7pzqxoAPDo6IlbhFg1hdEDgPqnXywampw68x5uEd5cngZfPX0VFju3VWYtR4ZX4wgRzb0Rn71KpkYv12pRNUk04W+s1fwEy1PZlbzd5Y1jHtCU4t1NoJT9rQ9aofce3BSkLxvFqQ34NHkwcR/eYj7/FXsp7JmKUyr0f4kdF718QZpWJf1f5hb1n63Qd7yZG50oRGMWMU7vPUzyqLvgAHqQkfJ5+UhlaWXiT7JjVtLzWD4zUatniJdcjaSJb49X1IiD77mKZ7yXMHRWrBIX64Y/tBnm4i+ozwZqbU34urc+TFSI4aN2TtEQSFvy2UEZhLrxs9QMfrEgrc9G0vz67eW6HYgaASAaKMke+Bgaso6q9k+bJQalLQylr3Thk4k6lvWPzyAPuKwe6kfyppsKunU0JSRrcAZ3f1jm+hoJoaog8iL+rS//MZqZsNKLoJcLKlDgF2EIuvqqlvCxaktzYdh+ZImKh74BJ19aQEGBm/1HIWtTg2Ti5+Q7k5K1dlt0nUL2nwGwXRKOs3tQtCUp8QchBBJdh3701O/ay0ive+nJuSCd0VmnLWm3VdwgBtiHDIDGa/+JVaqwOSX6qkhVKQGLezpC4PCORcqz314jGoYsoBrL3ITgOjW8OumRGyhSCx1U/nol4dAU=',
      index: 406,
      outcome: 0.66089621381965,
      verify: {
        random:
          '{"method":"generateSignedDecimalFractions","hashedApiKey":"HwtNBkT7TMtR8db5k2FtT9Fwy7bvXL8YI42W4CG7+ORi8IZERsrftxL9LCTw6DWpu3leJslGRvQJOfsdljf8Fw==","n":1,"decimalPlaces":20,"replacement":true,"data":[0.66089621381965],"completionTime":"2019-11-06 07:17:44Z","serialNumber":406}',
        signature:
          '"3q40/yI0UYL7mLruK8N/uBtWvBwk2bPXL7pzqxoAPDo6IlbhFg1hdEDgPqnXywampw68x5uEd5cngZfPX0VFju3VWYtR4ZX4wgRzb0Rn71KpkYv12pRNUk04W+s1fwEy1PZlbzd5Y1jHtCU4t1NoJT9rQ9aofce3BSkLxvFqQ34NHkwcR/eYj7/FXsp7JmKUyr0f4kdF718QZpWJf1f5hb1n63Qd7yZG50oRGMWMU7vPUzyqLvgAHqQkfJ5+UhlaWXiT7JjVtLzWD4zUatniJdcjaSJb49X1IiD77mKZ7yXMHRWrBIX64Y/tBnm4i+ozwZqbU34urc+TFSI4aN2TtEQSFvy2UEZhLrxs9QMfrEgrc9G0vz67eW6HYgaASAaKMke+Bgaso6q9k+bJQalLQylr3Thk4k6lvWPzyAPuKwe6kfyppsKunU0JSRrcAZ3f1jm+hoJoaog8iL+rS//MZqZsNKLoJcLKlDgF2EIuvqqlvCxaktzYdh+ZImKh74BJ19aQEGBm/1HIWtTg2Ti5+Q7k5K1dlt0nUL2nwGwXRKOs3tQtCUp8QchBBJdh3701O/ay0ive+nJuSCd0VmnLWm3VdwgBtiHDIDGa/+JVaqwOSX6qkhVKQGLezpC4PCORcqz314jGoYsoBrL3ITgOjW8OumRGyhSCx1U/nol4dAU="',
      },
      winningTicket: 27.09013580446745,
    },
    rake: {
      gameid: '4a0e0caf-9fe3-4b72-b515-21ef2cec16a2',
      id: 'rake.4a0e0caf-9fe3-4b72-b515-21ef2cec16a2',
      itemids: [],
      type: 'items',
      userid: 'jackpot rake',
      value: 0,
    },
    refunds: [],
    state: 'open',
    timeleft: 914,
    type: 'itemJackpot',
    updated: 1573024679090,
    value: 40.989999999999995,
    winner: '7d75d989-fa67-4e5f-841d-ca505699b7a6',
    winningBet: {
      color: '#ff0048',
      id: '48638e23-0e8b-499a-a30c-2c7fa8b24af3',
      items: [
        {
          canDeposit: false,
          canGift: true,
          canSell: true,
          canTrade: true,
          canWithdraw: true,
          cid: '19122761',
          color: '#777777',
          id: 'ea51daac-642c-4178-8b79-9634fbf25190',
          image:
            'https://files.opskins.media/file/vgo-img/item/wax-key-600.png',
          lastUserid: '7d75d989-fa67-4e5f-841d-ca505699b7a6',
          location: 'Local',
          name: 'WAX Key',
          price: 2.5,
          rarity: null,
          type: 'items',
          userid: '4a0e0caf-9fe3-4b72-b515-21ef2cec16a2',
        },
        {
          canDeposit: false,
          canGift: true,
          canSell: true,
          canTrade: true,
          canWithdraw: true,
          cid: '11887847',
          color: '#777777',
          id: 'fdffa2e4-0997-415d-882b-f69562a228ce',
          image:
            'https://files.opskins.media/file/vgo-img/item/wax-key-600.png',
          lastUserid: '7d75d989-fa67-4e5f-841d-ca505699b7a6',
          location: 'Local',
          name: 'WAX Key',
          price: 2.5,
          rarity: null,
          type: 'items',
          userid: '4a0e0caf-9fe3-4b72-b515-21ef2cec16a2',
        },
        {
          canDeposit: false,
          canGift: true,
          canSell: true,
          canTrade: true,
          canWithdraw: true,
          cid: '11950750',
          color: '#777777',
          id: '5e898ee1-9bd5-4d26-91a5-14968237f35e',
          image:
            'https://files.opskins.media/file/vgo-img/item/wax-key-600.png',
          lastUserid: '7d75d989-fa67-4e5f-841d-ca505699b7a6',
          location: 'Local',
          name: 'WAX Key',
          price: 2.5,
          rarity: null,
          type: 'items',
          userid: '4a0e0caf-9fe3-4b72-b515-21ef2cec16a2',
        },
        {
          canDeposit: false,
          canGift: true,
          canSell: true,
          canTrade: true,
          canWithdraw: true,
          cid: '11888066',
          color: '#777777',
          id: 'a4f171a7-9636-467c-ad4c-46469c26eaed',
          image:
            'https://files.opskins.media/file/vgo-img/item/wax-key-600.png',
          lastUserid: '7d75d989-fa67-4e5f-841d-ca505699b7a6',
          location: 'Local',
          name: 'WAX Key',
          price: 2.5,
          rarity: null,
          type: 'items',
          userid: '4a0e0caf-9fe3-4b72-b515-21ef2cec16a2',
        },
        {
          canDeposit: false,
          canGift: true,
          canSell: true,
          canTrade: true,
          canWithdraw: true,
          cid: '11890157',
          color: '#777777',
          id: '3f5a4ff8-3d6a-4a61-92b0-95c97ff4b66c',
          image:
            'https://files.opskins.media/file/vgo-img/item/wax-key-600.png',
          lastUserid: '7d75d989-fa67-4e5f-841d-ca505699b7a6',
          location: 'Local',
          name: 'WAX Key',
          price: 2.5,
          rarity: null,
          type: 'items',
          userid: '4a0e0caf-9fe3-4b72-b515-21ef2cec16a2',
        },
        {
          canDeposit: false,
          canGift: true,
          canSell: true,
          canTrade: true,
          canWithdraw: true,
          cid: '19229192',
          color: '#777777',
          id: '447b88b2-cbb2-4b03-8d6c-8639480792ac',
          image:
            'https://files.opskins.media/file/vgo-img/item/wax-key-600.png',
          lastUserid: '7d75d989-fa67-4e5f-841d-ca505699b7a6',
          location: 'Local',
          name: 'WAX Key',
          price: 2.5,
          rarity: null,
          type: 'items',
          userid: '4a0e0caf-9fe3-4b72-b515-21ef2cec16a2',
        },
      ],
      joined: 1573024631659,
      type: 'items',
      userid: '7d75d989-fa67-4e5f-841d-ca505699b7a6',
      value: 15,
    },
  }

  // const game = {
  //   id: uuid(),
  //   state: 'open',
  //   type: 'itemJackpot',
  //   config: {
  //     betValueMax: 100000, // max value per bet
  //     betValueMin: 1, // min value per bet
  //     betItemLimit: 10, // max items per bet,
  //     roundItemLimit: 100,
  //     // duration: 2 * (60 * 1000), // total duration of the game
  //     duration: 30 * 1000,
  //     drawDuration: 5 * 1000,
  //     cooldownDuration: 12 * 1000,
  //     multibet: true,
  //     rake: 0.1,
  //   },
  //   players,
  //   items,
  //   bets,
  //   value,
  //   payouts: [],
  //   rake: [],
  //   refunds: [],
  //   timeleft: 0, // duration in s
  //   winner: null,
  // }

  setTimeout(() => {
    game.state = 'cooldown'
  }, 5000)

  // setInterval(() => {
  //   // if(game.state === 'rolling') return
  //   if (game.timeleft < 1) {
  //     game.timeleft = 100
  //   }
  //   game.timeleft -= 1
  // }, 1000)

  // console.log(game);

  return game
}
