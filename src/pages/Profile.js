import React from 'react'
import { Text, Box, Flex } from '../primitives'

import Wiring from '../libs/wiring'
import GameNav from '../components/GameNav'
import Assets from '../components/Assets'
import Utils from '../components/Utils'

const TitleBar = ({ label = 'Settings' }) => {
  return (
    <Box
      p={3}
      bg="backingDark"
      borderBottom="2px solid rgba(0, 0, 0, 0.5)"
      // boxShadow='0px 0px 2px 0px rgba(0, 0, 0, 1)'
    >
      <Text fontSize={4}>{label}</Text>
    </Box>
  )
}

const User = ({ user ={} }) => {
  return (
    <Flex flexDirection="column">
      <Box
        bg="backingLight"
        p={2}
        borderBottom="3px solid #42b142"
        // borderBottom="1px solid #e94c4c"
      >
        <Text fontSize={3}>User</Text>
      </Box>
      <Flex p={2} px={4} mr={4} alignItems="center">
        <Assets.Avatar size={100} src={user.avatar} />
        <Box mx={1} />
        <Text fontSize={5}>{user.username}</Text>
      </Flex>
    </Flex>
  )
}

const Stats = ({ label, value }) => {
  return (
    <Flex flexDirection="column" flex={1}>
      <Box
        bg="backingLight"
        p={2}
        borderBottom="3px solid #42b142"
        // borderBottom="1px solid #e94c4c"
      >
        <Text fontSize={3}>{label}</Text>
      </Box>
      <Text.Heading
        p={2}
        px={4}
        flex={1}
        as={Flex}
        fontSize={8}
        alignItems="center"
      >
        {Utils.parseValue(value)}
      </Text.Heading>
    </Flex>
  )
}

export default Wiring.connectMemo(
  p => {

    if(!p.user) return <Text p={4} >Please login to view your profile.</Text>

    return (
      <>
        <GameNav {...p} />
        <TitleBar />
        <Flex>
          <User user={p.user} />
          <Stats label="Deposited" value={p.stats.valueDeposited} />
          <Stats label="Won" value={p.stats.valueWon} />
          <Stats
            label="Profit"
            value={p.stats.valueWon - p.stats.valueDeposited}
          />
        </Flex>
        <TitleBar label="History" >
          {p.pages.map(page => {
            <Text.Link>{page.name}</Text.Link>
          })}
        </TitleBar>

        <Flex p={2} flexDirection="column">
          {p.commands.map(cmd => {
            return <Utils.RenderObject 
              heading={`ID: ${cmd.id}`}
              data={cmd}
            />
          })}
        </Flex>
      </>
    )
  },
  p => {
    // console.log('PROFILE', p)
    const active = p.private.commands ? p.private.commands.active : {}
    const history = p.private.commands ? p.private.commands.history : {}

    const commands = Object.values(active).reduce((memo, cmd) => {
      memo[cmd.id] = cmd
      return memo
    }, history)

    return {
      location: p.location,
      history: p.history,
      user: p.private.me,
      stats: p.private.stats || {},
      commands: Object.values(commands).sort((p, n) => {
        return p.updated > n.updated ? 1 : -1
      } ) || {},      
      // activeCommands: p.private.commands || {},
      pages: [
        {
          name: 'commands'
        }
      ]
    }
  }
)
