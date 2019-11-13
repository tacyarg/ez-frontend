import React, { useState, useEffect } from 'react'
import { Button, Text, Box, Flex } from '../primitives'

import Wiring from '../libs/wiring'
import GameNav from '../components/GameNav'
import Assets from '../components/Assets'
import Utils from '../components/Utils'
import Modals from '../components/Modals'

const Amount = ({ amount }) => {
  return (
    <>
      <Box mx={1}> | </Box>
      {Utils.parseValue(amount)}
    </>
  )
}

const TitleBar = ({ label = 'Inventory', children }) => {
  return (
    <Flex
      alignItems={'center'}
      p={3}
      bg="backingDark"
      borderBottom="2px solid rgba(0, 0, 0, 0.5)"
    // boxShadow='0px 0px 2px 0px rgba(0, 0, 0, 1)'
    >
      <Text fontSize={4}>{label}</Text>
      <Box mx="auto" />
      {children}
    </Flex>
  )
}

const Inventory = ({ inventory = [], socket, ...p }) => {
  console.log('inventory change', inventory.length)
  const [isOpen, setOpen] = useState(false)

  function toggleModal() {
    setOpen(!isOpen)
  }

  const [total, setTotal] = useState([])
  const [cache, setCache] = useState([])
  const [selectedItems, setSelectedItems] = useState({})
  const [selectedValue, setAmount] = useState(0)

  useEffect(() => {
    setCache(Object.values(inventory))
    setSelectedItems({})
    setAmount(0)
  }, [inventory])

  useEffect(() => {
    const subtotal = cache.reduce((memo, i) => {
      memo += i.price
      return memo
    }, 0)
    setTotal(subtotal)
  }, [cache])

  return (
    <>
      <Modals.ItemDeposit.WaxInventory
        isOpen={isOpen}
        onClose={e => toggleModal()}
        onConfirm={async itemids => {
          toggleModal()
          await socket.private.call('depositExpressTradeItems', {
            itemids,
          })
        }}
      />
      <GameNav {...p} />

      <TitleBar label={<>Total Value: {Utils.parseValue(total)}</>}>
        
        {selectedItems.length > 0 ? (
          <Button
            as={Flex}
            alignItems="center"
            type="warning"
            onClick={e => {
              socket.private.call('withdrawExpressTradeItems', {
                itemids: selectedItems,
              })
            }}
          >
            <Assets.Icons.Coins size={20} mr={2} bg="yellow" /> Withdraw
            <Amount amount={selectedValue} />
          </Button>
        ) : (
            <Button
              as={Flex}
              alignItems="center"
              type="primary"
              onClick={e => toggleModal()}
            >
              <Assets.Icons.Coins size={20} mr={2} bg="yellow" /> Deposit WAX
              Items
          </Button>
          )}
      </TitleBar>

      <Utils.ItemList
        maxHeight={'100%'}
        items={cache}
        onChange={({ selectedItems, selectedValue }) => {
          setSelectedItems(selectedItems)
          setAmount(selectedValue)
        }}
      />
    </>
  )
}

export default Wiring.connectMemo(Inventory, p => {
  return {
    location: p.location,
    history: p.history,
    user: p.private.me || {},
    socket: p.socket,
    inventory: p.private.inventory || {},
  }
})
