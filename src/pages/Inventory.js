import React, { useState, useEffect } from 'react'
import { Button, Text, Box, Flex } from '../primitives'

import Wiring from '../libs/wiring'
import GameNav from '../components/GameNav'
import Assets from '../components/Assets'
import Utils from '../components/Utils'
import Modal from '../components/Modals'
import Cards from '../components/Cards'

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

export default Wiring.connectMemo(
  ({ inventory = [], socket, ...p }) => {
    inventory = Object.values(inventory)

    const [isOpen, setOpen] = useState(false)

    function toggleModal() {
      setOpen(!isOpen)
    }

    const [selectedItems, setSelectedItems] = useState({})
    const [selectedValue, setAmount] = useState(0)

    return (
      <>
        <Modal.Deposit
          isOpen={isOpen}
          onClose={e => toggleModal()}
          onConfirm={itemids => {
            toggleModal()
            return socket.private.call('depositExpressTradeItems', {
              itemids,
            })
          }}
        />
        <GameNav {...p} />
        <TitleBar>
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
              Withdraw <Amount amount={selectedValue} />
            </Button>
          ) : (
            <Button type="primary" onClick={e => toggleModal()}>
              Deposit WAX Items
            </Button>
          )}
        </TitleBar>

        <Utils.ItemList
          maxHeight={'100%'}
          items={inventory}
          onChange={({ selectedItems, selectedValue }) => {
            setSelectedItems(selectedItems)
            setAmount(selectedValue)
          }}
        />
      </>
    )
  },
  p => {
    return {
      location: p.location,
      history: p.history,
      user: p.private.me || {},
      socket: p.socket,
      inventory: p.private.inventory || {},
    }
  }
)
