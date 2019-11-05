import React, { useState, useEffect } from 'react'
import { Button, Text, Box, Flex } from '../primitives'

import Wiring from '../libs/wiring'
import GameNav from '../components/GameNav'
import Assets from '../components/Assets'
import Utils from '../components/Utils'
import Modal from '../components/Modals'
import Cards from '../components/Cards'

const Amount = ({amount}) => {
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
  p => {
    const [isOpen, setOpen] = useState(false)

    function toggleModal() {
      setOpen(!isOpen)
    }

    const [selectedItems, setSelectedItems] = useState({})
    const [selectedValue, setSelectedValue] = useState(0)

    const isSelected = itemid => {
      return Boolean(selectedItems[itemid])
    }

    useEffect(() => {
      const value = Object.values(selectedItems).reduce((memo, item) => {
        console.log(item.price)
        memo += item.price
        return memo
      }, 0)
      setSelectedValue(value)
    }, [selectedItems])

    const handleSelect = item => {
      if (isSelected(item.id)) {
        delete selectedItems[item.id]
        return setSelectedItems(selectedItems)
      }

      return setSelectedItems({
        ...selectedItems,
        [item.id]: item,
      })
    }

    return (
      <>
        <Modal.Deposit
          isOpen={isOpen}
          onClose={e => {
            toggleModal()
          }}
          onConfirm={itemids => {
            toggleModal()
            return p.socket.private.call('depositExpressTradeItems', {
              itemids,
            })
          }}
        />
        <GameNav {...p} />
        <TitleBar>
          {Object.values(selectedItems).length > 0 ? (
            <Button as={Flex} alignItems="center" type="warning" onClick={e => toggleModal()}>
              Withdraw <Amount amount={selectedValue}/>
            </Button>
          ) : (
            <Button type="primary" onClick={e => toggleModal()}>
              Deposit WAX Items
            </Button>
          )}
        </TitleBar>

        <Flex width={1} flexWrap="wrap" justifyContent="center">
          {p.inventory.length > 0 ? (
            p.inventory.map(item => {
              return (
                <Cards.JackpotItem
                  key={item.id}
                  {...item}
                  onClick={e => {
                    handleSelect(item)
                  }}
                  selected={isSelected(item.id)}
                />
              )
            })
          ) : (
            <Box mx="auto">
              <Text>You do not have any items.</Text>
              {/* <Button m={2}type="simple">View Inventory</Button> */}
            </Box>
          )}
        </Flex>
      </>
    )
  },
  p => {
    return {
      location: p.location,
      history: p.history,
      user: p.private.me || {},
      socket: p.socket,
      inventory: Object.values(p.private.inventory || {}) || [],
    }
  }
)
