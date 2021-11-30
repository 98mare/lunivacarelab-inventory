import React from 'react'
import styled from 'styled-components'
import PageHeader from '../Common/pageHeader'
import {Space, Table } from 'antd'
import { useHistory } from 'react-router-dom'

const columns = [
  {
    title: 'Id',
    dataIndex: 'rackId',
    key: 'rackId'
  },
  {
    title: 'Rack Name',
    dataIndex: 'rackName',
    key: 'rackName'
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
      <PageHeader pageTitle="Rack" buttonTitle='Add Rack' buttonOnClick={()=> history.push('./rack/add')}></PageHeader>
      {/* <Filter ></Filter> */}
      <Table columns={columns}></Table>
    </ItemContainer>
  )
}

export default Index

const ItemContainer = styled.div`

`