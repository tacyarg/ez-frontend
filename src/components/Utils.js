import React, { useLayoutEffect, useState, useEffect } from 'react'

import {
  Card,
  Button,
  Flex,
  Box,
  Text,
  Image,
  Sidebar,
  Spinner,
  Divider,
} from '../primitives'
import Cards from './Cards'
import Assets from './Assets'

import axios from 'axios'
import ReactMarkdown from 'react-markdown'
import assert from 'assert'
import moment from 'moment'

const RenderError = ({
  color,
  message = 'Nothing happen yet, check back later.',
}) => {
  return (
    <Card flexDirection="column" m={2}>
      <Text color={color}>{message}</Text>
    </Card>
  )
}

// render shallow object.
const RenderObject = ({ heading, data, children, ...p }) => {
  const valid = !data || typeof data !== 'object' ? false : true

  // console.log('RenderObject', data)
  return (
    <Card flexDirection="column" m={2} {...p}>
      {heading && (
        <Flex p={2} flexDirection="column">
          <Text.Heading fontSize={5}>{heading}</Text.Heading>
          <Box my={1} />
          <Divider bg="primary" />
        </Flex>
      )}
      {valid ? (
        Object.keys(data).map(k => {
          if (typeof data[k] === 'object') return
          // if (!data[k]) return

          return (
            <RenderObject.Prop
              key={k}
              label={`${k.toUpperCase()}:`}
              value={data[k]}
              type={k === 'created' || k === 'updated' ? 'time' : null}
            />
          )
        })
      ) : (
          <Text p={2}>Nothing to show yet, check back later.</Text>
        )}
    </Card>
  )
}

const renderProp = (value, type) => {
  // console.log('render', typeof value, value)
  switch (type || typeof value) {
    case 'time':
      return moment(value).calendar()
    case 'boolean':
      return Boolean(value) ? 'yes' : 'no'
    case 'string':
      var expression = /(https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|www\.[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9]+\.[^\s]{2,}|www\.[a-zA-Z0-9]+\.[^\s]{2,})/gi;
      var regex = new RegExp(expression);
      if (regex.test(value)) {
        return <Text.Link color="primary" onClick={e => {
          var win = window.open(value, '_blank');
          win.focus();
        }}>{value}</Text.Link>
      }
    // case 'number':
    // return <Text.Number value={value} />
    default:
      return value
  }
}

RenderObject.Prop = ({ label, value, type }) => {
  return (
    <Flex
      flexDirection={['column', 'row']}
      alignItems={['center', 'end']}
      m={1}
    >
      <Text bold>{label}</Text>
      <Box mx={1} />
      <Text>{renderProp(value, type)}</Text>
    </Flex>
  )
}

const LoadingPage = p => {
  return (
    <Flex
      width={1}
      height="100%"
      alignItems="center"
      justifyContent="center"
      {...p}
    >
      <Spinner>/</Spinner>
    </Flex>
  )
}

const MarkdownLink = ({ link }) => {
  const [state, setState] = useState(null)

  const getMarkdown = async link => {
    const { data } = await axios(link).catch(console.error)
    return setState(data)
  }

  useEffect(() => {
    getMarkdown(link)
  }, [])

  return state ? (
    <Box p={4} width={[1, 2 / 3]}>
      <ReactMarkdown source={state} />
    </Box>
  ) : (
      <LoadingPage />
    )
}

const generateCSV = data => {
  const { parse } = require('json2csv')
  const fields = data[0]
    ? Object.keys(data[0])
    : ['id', 'price', 'closingPrice', 'profit', 'change']
  return parse(data, {
    fields,
    flatten: true,
  })
}

const downloadFile = async (filename, data) => {
  assert(filename, 'filename required')
  assert(data, 'data required')

  let link = document.createElement('a')
  link.id = 'download-csv'
  link.setAttribute(
    'href',
    'data:text/plain;charset=utf-8,' + encodeURIComponent(data)
  )
  link.setAttribute('download', filename)
  document.body.appendChild(link)
  document.querySelector('#download-csv').click()
  // var encodedUri = encodeURI(csv)
  // console.log('URI:', encodedUri)
  // return window.open(encodedUri)
}

const DownloadCSV = ({ filename = 'list.csv', data = [] }) => (
  <Button
    type="simple"
    onClick={e => {
      const csv = generateCSV(data)
      downloadFile(filename, csv)
    }}
  >
    <Flex alignItems="center" justifyContent="center">
      <Assets.Icons.Trusted />
      <Box mx={1} />
      Download .csv
    </Flex>
  </Button>
)

const DownloadJson = ({ filename = 'row.json', data = {} }) => {
  return (
    <Button
      type="simple"
      onClick={e => {
        data = JSON.stringify(data, null, 2)
        downloadFile(filename, data)
      }}
    >
      <Flex alignItems="center" justifyContent="center">
        <Assets.Icons.Trusted />
        <Box mx={1} />
        Download .json
      </Flex>
    </Button>
  )
}

function getDark(hex) {
  let thing = [
    ('0x' + hex[1] + hex[2]) | 0,
    ('0x' + hex[3] + hex[4]) | 0,
    ('0x' + hex[5] + hex[6]) | 0,
  ]
  thing[0] -= 27
  thing[1] -= 10
  thing[2] -= 10
  return `${thing[0]}, ${thing[1]}, ${thing[2]}`
}

function generateBackground(i, color) {
  return `repeating-linear-gradient(
    ${i % 2 ? `-50deg` : `50deg`},
    ${color} 1px,
    rgba(${getDark(color)},1) 2px,
    rgba(${getDark(color)},1) 11px,
    ${color} 12px,
    ${color} 20px
  )`
}

function hexToRgb(hex) {
  let thing = [
    ('0x' + hex[1] + hex[2]) | 0,
    ('0x' + hex[3] + hex[4]) | 0,
    ('0x' + hex[5] + hex[6]) | 0,
  ]
  return `${thing[0]}, ${thing[1]}, ${thing[2]}`
}

function parseValue(data = 0) {
  return Number(data).toLocaleString(undefined, {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  })
}

import { FixedSizeList as List } from 'react-window'

const ItemCardList = ({ isSelected, handleSelect, items = [] }) => {
  return (
    <List
      height={Math.max(
        document.documentElement.clientHeight,
        window.innerHeight || 0
      )}
      itemCount={1000}
      itemSize={160}
      width="100%"
    >
      {({ index, style }) => {
        const item = items[index]
        return (
          <div style={style}>
            <Cards.JackpotItem
              key={item.id}
              selected={isSelected(item.id)}
              onClick={e => handleSelect(item)}
              {...item}
            />
          </div>
        )
      }}
    </List>
  )
}

const ItemList = ({ isLocal = true, onChange = x => x, items = [], ...p }) => {
  console.log('ItemList change', items.length)
  const [selectedItems, setSelectedItems] = useState([])
  const [selectedValue, setSelectedValue] = useState(0)

  const isSelected = itemid => {
    if (!itemid) return false
    return selectedItems.find(item => item.id == itemid)
  }

  const handleSelect = item => {
    if (isSelected(item.id)) {
      // console.log('DE-SELECT ITEM')

      const index = selectedItems.findIndex(r => r.id === item.id)
      selectedItems.splice(index, 1)

      setSelectedValue(selectedValue - item.price)
      return setSelectedItems(
        selectedItems
      )
    }

    // console.log('SELECT ITEM', item.id)
    setSelectedValue(selectedValue + item.price)
    setSelectedItems([...selectedItems, item])
  }

  useEffect(() => {
    onChange({
      selectedItems,
      selectedValue,
    })
  }, [selectedItems, selectedValue])

  useEffect(() => {
    if(selectedValue > 0) setSelectedValue(0)
    if(selectedItems.length > 0) setSelectedItems([])
  }, [items])

  return (
    <Box
      p={2}
      width={1}
      maxHeight={400}
      style={{
        overflow: 'hidden',
        overflowY: 'auto',
      }}
      {...p}
    >
      <Flex width={1} flexWrap="wrap" justifyContent="center">
        {items.length > 0 ? (
          Object.values(items).map(item => {
            return (
              <Cards.JackpotItem
                key={item.id}
                selected={isSelected(item.id)}
                onClick={e => handleSelect(item)}
                {...item}
              />
            )
          })
        ) : (
            <Box>
              <Text m={2}>Nothing to display.</Text>
              {/* {isLocal && (
              <Button m={2} type="simple">
                Deposit Items
              </Button>
            )} */}
            </Box>
          )}
      </Flex>
    </Box>
  )
}

const TitleBar = ({ label = 'Inventory', children, ...p }) => {
  return (
    <Flex
      alignItems={'center'}
      p={3}
      bg="backingDark"
      borderBottom="2px solid rgba(0, 0, 0, 0.5)"
      // boxShadow='0px 0px 2px 0px rgba(0, 0, 0, 1)'
      {...p}
    >
      {/* <Text fontSize={4}>{label}</Text>
      <Box mx="auto" /> */}
      {children}
    </Flex>
  )
}

function isOdd(num) {
  return num % 2 === 1
}

function useWindowSize() {
  const [size, setSize] = useState([0, 0])
  useLayoutEffect(() => {
    function updateSize() {
      setSize([window.innerWidth, window.innerHeight])
    }
    window.addEventListener('resize', updateSize)
    updateSize()
    return () => window.removeEventListener('resize', updateSize)
  }, [])
  return size
}

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

export default {
  useDebounce,
  useWindowSize,
  isOdd,
  TitleBar,
  ItemList,
  parseValue,
  hexToRgb,
  getDark,
  generateBackground,
  RenderError,
  RenderObject,
  LoadingPage,
  MarkdownLink,
  RenderMarkdown(p) {
    return <ReactMarkdown {...p} />
  },
  DownloadCSV,
  DownloadJson,
}
