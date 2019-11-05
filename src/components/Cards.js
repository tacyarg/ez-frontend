import React from 'react'
import { Flex, Badge, Box, Page, Avatar, Image, Text } from '../primitives'
import utils from './Utils'
import Level from './Level'

const JackpotItem = React.memo(({
  color = '#d32ee6',
  price = 25.99,
  name = 'Afterglow Wired Controller for Xbox One',
  // image = 'https://files.opskins.media/file/vgo-img/item/wax-key-300.png'
  // image = 'https://files.opskins.media/file/vgo-img/item/awp-golden-illusion-factory-new-300.png'
  image = 'https://static.wax.io/d-img/dynamic-apps/img/phpqkombg-ca194a2788.png',
  onClick = x => x,
  user,
  selected,
}) => {
  return (
    <Image
      onClick={onClick}
      m={2}
      p={2}
      as={Flex}
      flexDirection="column"
      bg="backingLight"
      width={160}
      height={130}
      src={image}
      border="thick"
      borderColor={selected ? 'primary' : 'subnavbg'}
      boxShadow={`0 4px 0 0 ${color}`}
      borderRadius="normal"
    >
      <Flex>
        <Text
          color="yellow"
          // bg="darkBacking" p={1}
        >
          {utils.parseValue(price)}
        </Text>
        {user && (
          <>
            <Box mx="auto" />
            <Avatar
              src={
                'https://www.gravatar.com/avatar/2cfb1ef04b6ec071fc74171d3687a5ee?d=identicon&r=pg&s=32'
              }
              size={32}
            />
          </>
        )}
      </Flex>
      <Box my="auto" />
      <Text
        fontSize={1}
        cutoff
        color={color}
        // bg="darkBacking" p={1}
      >
        {name}
      </Text>
    </Image>
  )
})

const JackpotBet = ({ index = 0, bet = {}, ...p }) => {
  const background = utils.generateBackground(index, bet.color || '#e94c4c')
  return (
    <Flex
      // minWidth={"260px"}
      // width={[1, 1 / 5]}
      border="1px solid #18181a"
      // boxShadow="0 1px 1px 0 #18181a"
      alignItems="center"
      background={`rgba(${utils.hexToRgb(bet.color || '#e94c4c')},0.1)`}
      {...p}
    >
      <Avatar src="" size={40} m={2} />
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
        // height={'100%'}
        height={58}
      />
    </Flex>
  )
}

export default {
  JackpotItem,
  JackpotBet,
}
