import { Button, Space, Table } from 'antd'

import React from 'react'
import { useHistory } from 'react-router-dom'
import styled from 'styled-components'
import PageHeader from '../Common/pageHeader'



const columns = [
  {
    title: 'Item name',
    dataIndex: 'Item name',
    key: 'itemName'
  },
  {
    title: 'count',
    dataIndex: 'count',
    key: 'count'
  },
  {
    title: 'type',
    dataIndex: 'type',
    key: 'type'
  },
  {
    title: 'unit',
    dataIndex: 'unit',
    key: 'unit'
  },
  {
    title: 'action',
    key: 'action',
    redner: (text, record) => (
      <Space size="middle">
        <a href="#">Edit</a>
        <a href="#">Delete</a>
      </Space>
    )
  }
]

const Index = () => {
  const history = useHistory();
  
  return (
    <ItemContainer>
     <PageHeader></PageHeader>
      <div className="top">
        <Button type="primary" onClick={()=> history.push('./item/add')}>Add Item</Button>
        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Repellat, omnis.</p>
      </div>
      <Table columns={columns}></Table>
    </ItemContainer>
  )
}

export default Index

const ItemContainer = styled.div`

`