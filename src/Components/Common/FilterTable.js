import React from 'react'
import { Input, Row, col } from 'antd'

const Search = Input.Search;

const FilterTable = ({onSearch, ...props}) => {
  return (
    <div className='filter' {...props} style={{float: 'right'}}>
      <Input
        placeholder='search'
        onSearch={onSearch}
        style={{width: 200}}
      ></Input>
    </div>
  )
}

export default FilterTable
