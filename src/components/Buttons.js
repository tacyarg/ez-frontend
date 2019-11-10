import React, { useState } from 'react'

import { Button, Flex } from '../primitives'
import Wiring from '../libs/wiring'
import { Assets } from '../components'

const LoginSteam = Wiring.connectMemo(
  p => {
    const click = () => {
      const url = `${p.AUTH_URL}/steam/auth?access_token=${p.tokenid}`
      window.location.replace(url)
    }

    return (
      <Button as={Flex} alignItems="center" type="steam" mx={2} onClick={click}>
        <Assets.Icons.Steam size={20} mr={2} bg="offwhite" /> Login STEAM
      </Button>
    )
  },
  ({ env, tokenid, ...props }) => {
    return { AUTH_URL: env.AUTH_URL, tokenid }
  }
)

const LoginWax = Wiring.connectMemo(
  p => {
    const click = () => {
      const url = `${p.AUTH_URL}/opskins/auth?access_token=${p.tokenid}`
      window.location.replace(url)
    }

    return (
      <Button
        as={Flex}
        alignItems="center"
        type="steam"
        mx={2}
        type="wax"
        onClick={click}
      >
        <Assets.Wax width={40} height={20} mr={2} /> Login
        WAX
      </Button>
    )
  },
  ({ env, tokenid, ...props }) => {
    return { AUTH_URL: env.AUTH_URL, tokenid }
  }
)

export default { LoginSteam, LoginWax }
