import React from 'react'

import Assets from '../components/Assets'
import { Flex, Text, Sidebar } from '../primitives'
import Wiring from '../libs/wiring'

const Link = ({ onClick, children }) => {
  return (
    <Text.Link
      onClick={onClick}
      my={3}
      as={Flex}
      style={{
        pointer: 'cursor',
        ':hover': {
          backgroundColor: 'rgba(0,0,0, 0.1)',
        },
      }}
    >
      {children}
    </Text.Link>
  )
}

export default ({ onClick }) => {
  const links = [
    {
      icon: Assets.Icons.Comments,
      onClick: Wiring.dispatch('toggleChat'),
    },
    {
      icon: Assets.Icons.Question,
      path: '/faq',
      label: 'FAQ',
    },
    {
      icon: Assets.Icons.Ban,
      path: '/tos',
      label: 'TOS',
    },
    {
      icon: Assets.Icons.History,
      path: '/profile/history',
      label: 'Game History',
    },
    {
      icon: Assets.Icons.Headset,
      path: '/support',
      label: 'Support',
    },
  ]

  return (
    <Sidebar p={3} bg="backingDark" alignItems="center">
      {links.map(({ path, label, onClick = x => x, ...p }) => (
        <Link key={path + label} onClick={onClick}>
          <p.icon size={20} />
        </Link>
      ))}
    </Sidebar>
  )
}
