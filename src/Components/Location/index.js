import React from 'react'
import styled from 'styled-components'
import PageHeader from '../Common/pageHeader'
import {Space, Table } from 'antd'
import { useHistory } from 'react-router-dom'

const columns = [
  {
    title: 'Id',
    dataIndex: 'locationId',
    key: 'locationId'
  },
  {
    title: 'Location Name',
    dataIndex: 'locationName',
    key: 'locationName'
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
      <PageHeader pageTitle="Location" buttonTitle='Add Location' buttonOnClick={()=> history.push('./location/add')}></PageHeader>
      {/* <Filter ></Filter> */}
      <Table columns={columns}></Table>
    </ItemContainer>
  )
}

export default Index

const ItemContainer = styled.div`

`