import React, { useState, useEffect } from 'react'
import { Input } from '../../primitives'

import Utils from '../Utils'

const Search = ({ onSearch = x => x }) => {
  const [search, setSearch] = useState('')

  const debouncedSearchTerm = Utils.useDebounce(search, 500)
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

Search.Wrapper = React.memo(({ items = [], children }) => {
  const [cache, setCache] = useState(items)

  // console.log('SEARCHABLE RENDER')

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

export default Search
