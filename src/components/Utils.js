import React, { useState, useEffect } from 'react'

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
const RenderObject = ({ heading, data, ...p }) => {
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
    case 'number':
      return <Text.Number value={value} />
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

export default {
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
