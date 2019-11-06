import React, { useState, useEffect } from 'react'
import {
  Flex,
  Box,
  Text,
  Button,
  Modal,
  Divider,
  Input,
  Avatar,
  Page,
} from '../primitives'
import Cards from './Cards'
import Assets from './Assets'
import Wiring from '../libs/wiring'
import Utils from './Utils'

function useDebounce(value, delay = 500) {
  const [debouncedValue, setDebouncedValue] = useState(value)

  useEffect(() => {
    // Set debouncedValue to value (passed in) after the specified delay
    const handler = setTimeout(() => {
      setDebouncedValue(value)
    }, delay)

    return () => {
      clearTimeout(handler)
    }
  }, [value])

  return debouncedValue
}

const Search = React.memo(({ onSearch = x => x }) => {
  const [search, setSearch] = useState('')

  const debouncedSearchTerm = useDebounce(search, 500)
  useEffect(() => {
    // if (search.length < 2) return;
    onSearch(search)
  }, [debouncedSearchTerm])

  return (
    <Input
      value={search}
      placeholder="Search..."
      onChange={e => {
        setSearch(e.target.value.toString().toLowerCase())
      }}
    />
  )
})

const Amount = ({ amount = 0 }) => {
  return (
    <>
      <Box mx={1}> | </Box>
      {Utils.parseValue(amount)}
    </>
  )
}

const WiredModal = ({
  children,
  isOpen,
  title = 'Ello Moto',
  onSearch,
  onConfirm,
  onClose,
  amount,
  ...p
}) => {
  return (
    <Modal isOpen={isOpen} width={[1, 2 / 3]} m={4}>
      <Flex width={1} p={3} alignItems="center">
        <Text.Heading fontSize={6}>{title}</Text.Heading>
        <Box mx="auto" />
        <Assets.Icons.Close onClick={onClose} clickable />
      </Flex>
      <Divider />
      {children}
      <Divider />
      <Flex width={1} p={3}>
        {onSearch && <Search onSearch={onSearch} />}
        <Box mx="auto" />
        <Button
          as={Flex}
          alignItems="center"
          mx={1}
          type="primary"
          onClick={onConfirm}
        >
          Confirm {amount > 0 && <Amount amount={amount} />}
        </Button>
        <Button mx={1} type="warning" onClick={onClose}>
          Cancel
        </Button>
      </Flex>
    </Modal>
  )
}

// WiredModal.whyDidYouRender=true

const Searchable = React.memo(({ items = [], children }) => {
  const [cache, setCache] = useState(items)

  console.log('SEARCHABLE RENDER')

  useEffect(() => {
    setCache(items)
  }, [items])

  const onSearch = value => {
    if (value.length < 2) return setCache(items)
    // setLoading(true)

    const searchResults = items.filter(row => {
      return ['price', 'name', 'rarity'].find(prop => {
        if (!row[prop]) return null
        return row[prop]
          .toString()
          .toLowerCase()
          .includes(value)
      })
    })

    // setLoading(false)
    return setCache(searchResults)
  }

  return typeof children === 'function' ? (
    children({
      cache,
      onSearch,
    })
  ) : (
    <children items={cache} onSearch={onSearch} />
  )
})

// Searchable.whyDidYouRender = true

WiredModal.Deposit = Wiring.connectMemo(
  ({
    items = [],
    isOpen = x => x,
    onClose = x => x,
    onConfirm = x => x,
    socket,
  }) => {
    console.log('WiredModal.Deposit RENDER')
    items = Object.values(items)

    useEffect(() => {
      if (socket) socket.private.call('listAllMyExpressTadeInventoryItems')
    }, [isOpen])

    const [amount, setAmount] = useState(0)
    const [selectedItems, setSelectedItems] = useState({})

    const totalValue = items
      .reduce((memo, item) => {
        memo += Number(item.price)
        return memo
      }, 0)
      .toFixed(2)

    return (
      <Searchable items={items}>
        {({ onSearch, cache }) => {
          return (
            <WiredModal
              isOpen={isOpen}
              amount={amount}
              onConfirm={e => {
                onConfirm(selectedItems)
                setSelectedItems([])
              }}
              onClose={e => {
                onClose(selectedItems)
                setSelectedItems([])
              }}
              onSearch={onSearch}
              title={
                <Flex alignItems="center">
                  Deposit Items:
                  <Box mx={1} />
                  <Text color="green" fontSize={4}>
                    {totalValue}
                  </Text>
                </Flex>
              }
            >
              <Utils.ItemList
                items={cache}
                onChange={({ selectedItems, selectedValue }) => {
                  setSelectedItems(selectedItems)
                  setAmount(selectedValue)
                }}
              />
            </WiredModal>
          )
        }}
      </Searchable>
    )
  },
  p => {
    // console.log(p)
    return {
      isOpen: p.isOpen,
      onClose: p.onClose,
      onConfirm: p.onConfirm,
      socket: p.socket,
      items: p.private.waxInventory,
    }
  }
)

WiredModal.DepositFromInventory = Wiring.connectMemo(
  ({
    items = [],
    isOpen = x => x,
    onClose = x => x,
    onConfirm = x => x,
    socket,
  }) => {
    console.log('WiredModal.DepositFromInventory RENDER')
    items = Object.values(items)

    const [amount, setAmount] = useState(0)
    const [selectedItems, setSelectedItems] = useState({})

    const totalValue = items
      .reduce((memo, item) => {
        memo += Number(item.price)
        return memo
      }, 0)
      .toFixed(2)

    return (
      <Searchable items={items}>
        {({ onSearch, cache }) => {
          return (
            <WiredModal
              isOpen={isOpen}
              amount={amount}
              onConfirm={e => {
                onConfirm(selectedItems)
                setSelectedItems([])
              }}
              onClose={e => {
                onClose(selectedItems)
                setSelectedItems([])
              }}
              onSearch={onSearch}
              title={
                <Flex alignItems="center">
                  Deposit Items:
                  <Box mx={1} />
                  <Text color="green" fontSize={4}>
                    {totalValue}
                  </Text>
                </Flex>
              }
            >
              <Utils.ItemList
                items={cache}
                onChange={({ selectedItems, selectedValue }) => {
                  setSelectedItems(selectedItems)
                  setAmount(selectedValue)
                }}
              />
            </WiredModal>
          )
        }}
      </Searchable>
    )
  },
  p => {
    // console.log(p)
    return {
      isOpen: p.isOpen,
      onClose: p.onClose,
      onConfirm: p.onConfirm,
      socket: p.socket,
      items: p.private.inventory,
    }
  }
)

// WiredModal.DepositFromInventory.whyDidYouRender=true

WiredModal.CreateCoinflip = Wiring.connect(
  React.memo(({ items = [], socket, ...p }) => {
    items = Object.values(items)
    // console.log('ITEMS', items)

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
  }),
  p => {
    return {
      isOpen: p.isOpen,
      onClose: p.onClose,
      onConfirm: p.onConfirm,
      socket: p.socket,
      items: p.private.inventory,
    }
  }
)

export default WiredModal
