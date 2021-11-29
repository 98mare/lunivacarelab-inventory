import {Table} from 'antd'
import React from 'react'
import { useHistory } from 'react-router-dom'
import styled from 'styled-components'
import Filter from '../Common/Filter'
import PageHeader from '../Common/pageHeader'

const columns = [
  {
    title: 'Item Id',
    dataIndex: 'item id',
    key: 'itemId',
  },
  {
    title: 'total',
    dataIndex: 'total',
    key: 'total',
  },
  {
    title: 'expiry date',
    dataIndex: 'expiry date',
    key: 'expiryDate',
  },
  {
    title: 'track id',
    dataIndex: 'track id',
    key: 'trackId',
  },
  {
    title: 'status',
    dataIndex: 'status',
    key: 'status',
  }
]

const Index = () => {
  const history = useHistory();
  return (
    <GoodsInContainer>
      <PageHeader
        buttonTitle='add Goods'
        pageTitle='Goods In'
        buttonOnClick = {() => history.push('./goodsin/add')}
      ></PageHeader>
       <Filter 
        reangeOfDate
     ></Filter>
     <Table columns={columns}></Table>
    </GoodsInContainer>
  )
}

export default Index

const GoodsInContainer = styled.div`

`