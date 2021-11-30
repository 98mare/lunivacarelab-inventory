import React from 'react'
import styled from 'styled-components'
import PageHeader from '../Common/pageHeader'
import {Space, Table } from 'antd'
import { useHistory } from 'react-router-dom'

const columns = [
  {
    title: 'Id',
    dataIndex: 'categoryId',
    key: 'categoryId'
  },
  {
    title: 'Category Name',
    dataIndex: 'categoryName',
    key: 'categoryName'
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
      <PageHeader pageTitle="Category" buttonTitle='Add Category' buttonOnClick={()=> history.push('./category/add')}></PageHeader>
      {/* <Filter ></Filter> */}
      <Table columns={columns}></Table>
    </ItemContainer>
  )
}

export default Index

const ItemContainer = styled.div`
  background: rgba( 255, 255, 255, 0.25 );
  box-shadow: 0 2px 22px 0 rgba( 31, 38, 135, 0.17 );
  backdrop-filter: blur( 4px );
  -webkit-backdrop-filter: blur( 4px );
  border-radius: 10px;
  border: 1px solid rgba( 255, 255, 255, 0.18 );
  overflow: hidden;
`