import React, { useState } from 'react'

import { Button } from '../primitives'
import Wiring from '../libs/wiring'

const LoginSteam = Wiring.connectMemo(
  p => {
    const click = () => {
      const url = `${p.AUTH_URL}/steam/auth?access_token=${p.tokenid}`
      window.location.replace(url)
    }

    return (
      <Button mx={2} type="primary" onClick={click}>
        Login STEAM
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
      <Button mx={2} type="primary" onClick={click}>
        Login WAX
      </Button>
    )
  },
  ({ env, tokenid, ...props }) => {
    return { AUTH_URL: env.AUTH_URL, tokenid }
  }
)

export default { LoginSteam, LoginWax }
