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

const Search = ({ onSearch }) => {
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
}

const WiredModal = ({
  children,
  isOpen,
  title = 'Ello Moto',
  onSearch,
  onConfirm,
  onClose,
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
        <Button mx={1} type="primary" onClick={onConfirm}>
          Confirm
        </Button>
        <Button mx={1} type="warning" onClick={onClose}>
          Cancel
        </Button>
      </Flex>
    </Modal>
  )
}

WiredModal.Deposit = Wiring.connect(
  React.memo(({ items = [], socket, ...p }) => {
    // console.log('ITEMS', items)

    const [loading, setLoading] = useState(false)
    const [cache, setCache] = useState(items)

    useEffect(() => {
      setCache(items)
    }, [items])

    useEffect(() => {
      socket.private.call('listlMyExpressTadeInventoryItems')
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

    const [selectedItems, setSelectedItems] = useState([])

    const isSelected = itemid => {
      return selectedItems.includes(itemid)
    }

    const handleSelect = itemid => {
      if (isSelected(itemid)) {
        const selected = selectedItems.filter(id => {
          return id !== itemid
        })
        return setSelectedItems(selected)
      }

      return setSelectedItems([...selectedItems, itemid])
    }

    return (
      <WiredModal
        {...p}
        onConfirm={e => {
          p.onConfirm(selectedItems)
          setSelectedItems([])
        }}
        onClose={e => {
          p.onClose(selectedItems)
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
        <Box
          p={4}
          maxHeight={400}
          style={{
            overflow: 'hidden',
            overflowY: 'auto',
          }}
        >
          <Flex width={1} flexWrap="wrap" justifyContent="center">
            {cache.length > 0 ? (
              cache.map(item => {
                return (
                  <Cards.JackpotItem
                    onClick={e => {
                      handleSelect(item.id)
                    }}
                    selected={isSelected(item.id)}
                    key={item.id}
                    {...item}
                  />
                )
              })
            ) : (
              <Box>
                <Text>You do not have any items.</Text>
                {/* <Button m={2}type="simple">View Inventory</Button> */}
              </Box>
            )}
          </Flex>
        </Box>
      </WiredModal>
    )
  }),
  p => {
    // console.log(p)
    return {
      isOpen: p.isOpen,
      onClose: p.onClose,
      onConfirm: p.onConfirm,
      socket: p.socket,
      items: Object.values(p.private.waxInventory),
    }
  }
)

WiredModal.DepositFromInventory = Wiring.connect(
  React.memo(({ items = [], socket, ...p }) => {
    // console.log('ITEMS', items)

    const [loading, setLoading] = useState(false)
    const [cache, setCache] = useState(items)

    useEffect(() => {
      setCache(items)
    }, [items])

    // useEffect(() => {
    //   // socket.private.call('listAllMyExpressTadeInventoryItems')
    // }, [p.isOpen])

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

    const [selectedItems, setSelectedItems] = useState([])

    const isSelected = itemid => {
      return selectedItems.includes(itemid)
    }

    const handleSelect = itemid => {
      if (isSelected(itemid)) {
        const selected = selectedItems.filter(id => {
          return id !== itemid
        })
        return setSelectedItems(selected)
      }

      return setSelectedItems([...selectedItems, itemid])
    }

    return (
      <WiredModal
        {...p}
        onConfirm={e => {
          p.onConfirm(selectedItems)
          setSelectedItems([])
        }}
        onClose={e => {
          p.onClose(selectedItems)
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
        <Box
          p={4}
          maxHeight={400}
          style={{
            overflow: 'hidden',
            overflowY: 'auto',
          }}
        >
          <Flex width={1} flexWrap="wrap" justifyContent="center">
            {cache.length > 0 ? (
              cache.map(item => {
                return (
                  <Cards.JackpotItem
                    onClick={e => {
                      handleSelect(item.id)
                    }}
                    selected={isSelected(item.id)}
                    key={item.id}
                    {...item}
                  />
                )
              })
            ) : (
              <Box>
                <Text>You do not have any items.</Text>
                {/* <Button m={2}type="simple">View Inventory</Button> */}
              </Box>
            )}
          </Flex>
        </Box>
      </WiredModal>
    )
  }),
  p => {
    // console.log(p)
    return {
      isOpen: p.isOpen,
      onClose: p.onClose,
      onConfirm: p.onConfirm,
      socket: p.socket,
      items: Object.values(p.private.inventory || {}) || [],
    }
  }
)

WiredModal.CreateCoinflip = Wiring.connect(
  React.memo(({ items = [], socket, ...p }) => {
    // console.log('ITEMS', items)

    const [loading, setLoading] = useState(false)
    const [cache, setCache] = useState(items)

    useEffect(() => {
      setCache(items)
    }, [items])

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
          <Box
            p={4}
            maxHeight={400}
            style={{
              overflow: 'hidden',
              overflowY: 'auto',
            }}
          >
            <Flex width={1} flexWrap="wrap" justifyContent="center">
              {cache.length > 0 ? (
                cache.map(item => {
                  return <Cards.JackpotItem key={item.id} {...item} />
                })
              ) : (
                <Box>
                  <Text>You do not have any items.</Text>
                  {/* <Button m={2}type="simple">View Inventory</Button> */}
                </Box>
              )}
            </Flex>
          </Box>
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
      items: Object.values(p.private.waxInventory),
    }
  }
)

export default WiredModal
