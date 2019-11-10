import React from 'react'
import { Flex, Badge, Box, Page, Avatar, Image, Text } from '../primitives'
import utils from './Utils'
import Level from './Level'

const JackpotItem = React.memo(
  ({
    location,
    color = '#d32ee6',
    price = 25.99,
    name = 'Afterglow Wired Controller for Xbox One',
    image = 'https://static.wax.io/d-img/dynamic-apps/img/phpqkombg-ca194a2788.png',
    onClick = x => x,
    user,
    selected,
  }) => {
    return (
      <Image.Item
        onClick={onClick}
        m={2}
        p={2}
        as={Flex}
        flexDirection="column"
        bg="backingLight"
        width={160}
        height={140}
        src={image}
        border="thick"
        borderColor={selected ? 'primary' : 'subnavbg'}
        boxShadow={`0 4px 0 0 ${color}`}
        borderRadius="normal"
        style={{
          cursor: 'pointer',
        }}
      >
        <Flex>
          <Text
            color="yellow"
          >
            {utils.parseValue(price)} ({location})
          </Text>
          {user && (
            <>
              <Box mx="auto" />
              <Avatar src={user.avatar} size={32} />
            </>
          )}
        </Flex>
        <Box my="auto" />
        <Text
          fontSize={1}
          cutoff
          color={color}
        >
          {name}
        </Text>
      </Image.Item>
    )
  }
)

const JackpotBet = ({ index = 0, bet = {}, ...p }) => {
  const background = utils.generateBackground(index, bet.color || '#e94c4c')
  return (
    <Flex
      border="1px solid #18181a"
      alignItems="center"
      background={`rgba(${utils.hexToRgb(bet.color || '#e94c4c')},0.1)`}
      {...p}
    >
      <Avatar src={bet.user.avatar} size={40} m={2} />
      <Box>
        <Flex alignItems="center">
          <Level rank={bet.user.rank} />
          <Text>{bet.user.username}</Text>
        </Flex>
        <Text color="subtext" fontSize={1}>
          {bet.items.length} skins @ {utils.parseValue(bet.value)}
        </Text>
      </Box>
      <Box mx={['auto', 4]} />
      <Box
        background={background}
        minWidth={'35px'}
        height={58}
      />
    </Flex>
  )
}

export default {
  JackpotItem,
  JackpotBet,
}
