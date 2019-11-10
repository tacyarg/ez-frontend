import React, { useState, useEffect } from 'react'
import { Flex, Box, Text, Button, Modal, Divider } from '../../primitives'

import Assets from '../Assets'
import Wiring from '../../libs/wiring'
import Utils from '../Utils'
import WiredModal from './Modal'

const CreateCoinflip = ({ items = [], socket, ...p }) => {
  items = Object.values(items)

  const [loading, setLoading] = useState(false)
  const [cache, setCache] = useState(items)

  // useEffect(() => {
  //   setCache(items)
  // }, [items])

  useEffect(() => {
    socket.private.call('listExpressTradeInventoryItems')
  }, [p.isOpen])

  const onSearch = value => {
    if (value.length < 2) return setCache(items)
    setLoading(true)

    const searchResults = items.filter(row => {
      return ['price', 'name', 'rarity'].find(prop => {
        if (!row[prop]) return null
        return row[prop]
          .toString()
          .toLowerCase()
          .includes(value)
      })
    })

    setLoading(false)
    return setCache(searchResults)
  }

  const totalValue = cache
    .reduce((memo, item) => {
      memo += Number(item.price)
      return memo
    }, 0)
    .toFixed(2)

  const [selection, setSelection] = useState(null)

  const isSelected = coin => {
    return selection === coin
  }

  return (
    <WiredModal
      {...p}
      onSearch={onSearch}
      title={
        <Flex alignItems="center">
          Create Coinflip:
          <Box mx={1} />
          <Text color="green" fontSize={4}>
            {totalValue}
          </Text>
        </Flex>
      }
    >
      <Flex>
        <Flex
          flexDirection="column"
          // justifyContent="center"
          alignItems="center"
          p={2}
          bg="backingLight"
        >
          <Assets.Coinflip.tCoin
            onClick={e => setSelection('t')}
            size={[50, 100]}
            selected={isSelected('t')}
          />
          <Assets.Coinflip.ctCoin
            onClick={e => setSelection('ct')}
            size={[50, 100]}
            selected={isSelected('ct')}
          />
        </Flex>

        <Utils.ItemList
          items={cache}
          // onChange={({ selectedItems, selectedValue }) => {
          //   setSelectedItems(selectedItems)
          //   setAmount(selectedValue)
          // }}
        />
      </Flex>
    </WiredModal>
  )
}

export default Wiring.connectMemo(CreateCoinflip, p => {
  return {
    isOpen: p.isOpen,
    onClose: p.onClose,
    onConfirm: p.onConfirm,
    socket: p.socket,
    items: p.private.inventory,
  }
})
