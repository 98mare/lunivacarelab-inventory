import React from 'react'
import styled from 'styled-components'
import PageHeader from '../Common/pageHeader'
import {Space, Table } from 'antd'
import Filter from '../Common/Filter'
import { useHistory } from 'react-router-dom'

const columns = [
  {
    title: 'Id',
    dataIndex: 'typeId',
    key: 'typeId'
  },
  {
    title: 'Type Name',
    dataIndex: 'typeName',
    key: 'typeName'
  },
  {
    title: 'Is Active',
    dataIndex: 'isActive',
    key: 'isActive'
  },
  {
    title: 'action',
    key: 'action',
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
  return (
    <ItemContainer>
      <PageHeader pageTitle="Type" buttonTitle='Add Type' buttonOnClick={()=> history.push('./type/add')}></PageHeader>
      {/* <Filter ></Filter> */}
      <Table columns={columns}></Table>
    </ItemContainer>
  )
}

export default Index

const ItemContainer = styled.div`

`