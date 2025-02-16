import React from 'react'

// TODO: use the wildcard import
import Processors from '../assets/images/processors/*.svg'

import Logo from '../assets/images/logo.png'
import Avatar from '../assets/images/avatar.jpg'

import Popular from '../assets/images/icons/icon_popular.svg'
import BestOffers from '../assets/images/icons/icon_offer.svg'
import Trusted from '../assets/images/icons/icon_trusted.svg'
import Play from '../assets/images/icons/icon_play.svg'
import Search from '../assets/images/icons/icon_search.svg'
import Ban from '../assets/images/icons/ban.svg'
import Headset from '../assets/images/icons/headset.svg'
import History from '../assets/images/icons/history.svg'
import Question from '../assets/images/icons/question-circle.svg'
import CaretDown from '../assets/images/icons/caret-down.svg'
import UserCog from '../assets/images/icons/user-cog.svg'
import SignOut from '../assets/images/icons/sign-out-alt.svg'
import Close from '../assets/images/icons/times.svg'
import Comments from '../assets/images/icons/comments.svg'
import Wallet from '../assets/images/icons/wallet.svg'

import VolumeDown from '../assets/images/icons/volume-down.svg'
import VolumeMute from '../assets/images/icons/volume-mute.svg'
import VolumeOff from '../assets/images/icons/volume-off.svg'
import VolumeUp from '../assets/images/icons/volume-up.svg'

import Gun from '../assets/images/icons/gun.png'
import Coins from '../assets/images/icons/coins.svg'

import User from '../assets/images/icons/user.svg'
import Edit from '../assets/images/icons/edit.svg'
import Envelope from '../assets/images/icons/envelope.svg'
import Key from '../assets/images/icons/key.svg'

// Social
import Twitter from '../assets/images/icons/twitter.svg'
// import Steam from '../assets/images/icons/steam.svg'
// import Twitch from '../assets/images/icons/twitch.svg'
import Telegram from '../assets/images/icons/telegram.svg'
import Github from '../assets/images/icons/github.svg'
import Discord from '../assets/images/icons/discord.svg'
import Steam from '../assets/images/icons/steam-symbol.svg'

import Background from '../assets/images/jackpotBackground.png'

import ctCoin from '../assets/images/ctfliplogo.png'
import tCoin from '../assets/images/tfliplogo.png'
import Wax from '../assets/images/wax-primary-logo.png'
import Waxpeer from '../assets/images/waxpeer.png'
import Chipsgg from '../assets/images/chipsgg.png'

import RollSound from '../assets/sounds/rollSound.mp3'
import NewBetSound from '../assets/sounds/newBetSound.mp3'
import TickSound from '../assets/sounds/tick7.mp3'

import { Box, Icon, Image } from '../primitives'
import theme from '../styles/theme'

const mapAssets = tree => {
  return Object.keys(tree).reduce((memo, k) => {
    const _k = k.toLowerCase()
    const value = tree[k]
    const bg = Object.keys(theme.colors).includes(_k) ? _k : 'icon'

    if (typeof value === 'object') {
      memo[k] = mapAssets(value)
    } else {
      memo[k] = p => <Icon size={28} bg={bg} {...p} src={value} />
    }

    return memo
  }, {})
}

const sets = mapAssets({
  Icons: {
    Popular,
    BestOffers,
    Trusted,
    Play,
    User,
    Envelope,
    Edit,
    Key,
    Search,
    Ban,
    Headset,
    History,
    Question,
    CaretDown,
    UserCog,
    SignOut,
    VolumeDown,
    VolumeUp,
    VolumeMute,
    VolumeOff,
    Gun,
    Coins,
    Close,
    Comments,
    ctCoin,
    tCoin,
    Steam,
    Wallet
  },
  Banners: {
    // Banner01
  },
  Social: {
    Twitter,
    Telegram,
    Discord,
    Github,
  }
})

export default {
  ...sets,
  Sounds: {
    roll: new Audio(RollSound),
    newBet: new Audio(NewBetSound),
    tick: new Audio(TickSound)
  },
  Wax: p => <Image src={Wax} {...p} />,
  Waxpeer: p => <Image src={Waxpeer} {...p} />,
  Chipsgg: p => <Image src={Chipsgg} {...p} />,
  Logo: p => <Image src={Logo} {...p} />,
  Avatar: p => <Image size={[28, 40]} src={Avatar} m={2} {...p} />,
  Processors: Object.keys(Processors).reduce((memo, k) => {
    const src = Processors[k]
    memo[k] = p => <Image src={src} width={128} height={64} {...p} />
    return memo
  }, {}),
  Background: ({ children, ...p }) => {
    return (
      <Image
        width={1}
        height={'100%'}
        backgroundSize="cover"
        src={Background}
        bg="backingDark"
        {...p}
      >
        {children}
      </Image>
    )
  },
  Coinflip: {
    ctCoin: p =>
      p.selected ? (
        <Image
          border="4px solid"
          borderColor="primary"
          borderRadius="circle"
          size={[32, 64]}
          src={ctCoin}
          m={2}
          {...p}
        />
      ) : (
          <Image
            style={{ cursor: 'pointer' }}
            size={[32, 64]}
            src={ctCoin}
            m={2}
            {...p}
          />
        ),
    tCoin: p =>
      p.selected ? (
        <Image
          border="4px solid"
          borderColor="primary"
          borderRadius="circle"
          size={[32, 64]}
          src={tCoin}
          m={2}
          {...p}
        />
      ) : (
          <Image
            style={{ cursor: 'pointer' }}
            size={[32, 64]}
            src={tCoin}
            m={2}
            {...p}
          />
        ),
  },
}
