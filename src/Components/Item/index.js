import { Button, Space, Table } from 'antd'

import React from 'react'
import React, { useState } from 'react'
import { useHistory } from 'react-router-dom'
import styled from 'styled-components'

import { useDispatch } from 'react-redux';
import { getLabItemsApi } from '../../services/itemNewItemService'
import PageHeader from '../Common/pageHeader'

const Index = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  const [tableData, setTableData] = useState([]);


  const columns = [
    {
    title: 'Item name',
    dataIndex: 'Item name',
    key: 'itemName'
      title: 'Item Code',
      dataIndex: 'ItemCode',
      key: 'itemCode'
    },
    {
    title: 'count',
    dataIndex: 'count',
    key: 'count'
      title: 'Item Name',
      dataIndex: 'ItemName',
      key: 'itemName'
    },
    {
    title: 'type',
    dataIndex: 'type',
    key: 'type'
      title: 'MinQty',
      dataIndex: 'MinQty',
      key: 'minQty'
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
      render: (text, record) => (
        <Space size="middle">
          <a href="#">Edit</a>
          <a href="#">Delete</a>
        </Space>
      )
    }
  ]

const Index = () => {
  const history = useHistory();
  const getLabData = () => {
    let data = {
      typeId: 0,
      categoryId: 0
    }
    dispatch(getLabItemsApi(data, (val) => {
      setTableData(val)
    }))
  }

  if(tableData.length === 0){
    getLabData()
  }

  return (
    <ItemContainer>
      <PageHeader
        buttonTitle='add Button'
        pageTitle='Item'
        buttonOnClick={() => history.push('./item/add')}
      ></PageHeader>
      <div className="top">
        {/* <Button type="primary" onClick={()=> history.push('./item/add')}>Add Item</Button> */}
        
      </div>
      <Table columns={columns}></Table>
      <Table 
      columns={columns}
      dataSource={tableData}
      />
    </ItemContainer>
  )
}

export default Index

const ItemContainer = styled.div`

`
const ItemContainer = styled.div``