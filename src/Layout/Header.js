import React, { useState } from 'react'

import Assets from '../components/Assets'
import { Button, Flex, Box, Avatar, Text, Divider } from '../primitives'

import Dropdown from './Dropdown'
import Wiring from '../libs/wiring'
import { Buttons, Settings } from '../components'

const Profile = Wiring.connectMemo(
  p => {
    return p.user ? (
      <Dropdown
        entries={[
          {
            label: 'Inventory',
            icon: Assets.Icons.Gun,
            onClick: () => {
              return p.history.push('/inventory')
            },
          },
          {
            label: 'Profile',
            icon: Assets.Icons.User,
            onClick: () => {
              return p.history.push('/profile')
            },
          },
          {
            label: 'Logout',
            icon: Assets.Icons.SignOut,
            onClick: () => {
              p.socket.auth.call('logout')
              window.localStorage.removeItem('tokenid')
              window.location.reload()
            },
          },
        ]}
      >
        <Assets.Avatar src={p.user.avatar} as={Avatar} />
        <Text color="black">{p.user.username}</Text>
      </Dropdown>
    ) : (
      <>
        <Buttons.LoginSteam />
        <Buttons.LoginWax />
      </>
    )
  },
  p => {
    return { history: p.history, user: p.private.me, socket: p.socket }
  }
)

export default p => {
  return (
    <Flex
      bg="offwhite"
      alignItems="center"
      // justifyContent="center"
      height={64}
    >
      <Assets.Logo mx={15} width={150} height={64} />
      <Box mx="auto" />
      <Divider type="vertical" bg="offwhiteBorder" />
      {/* <Settings.Volume /> */}
      <Divider type="vertical" bg="offwhiteBorder" />
      <Profile history={p.history} />
    </Flex>
  )
}
