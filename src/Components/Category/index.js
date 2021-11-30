import React, { useState, useEffect } from 'react'
import styled from 'styled-components'
import PageHeader from '../Common/pageHeader'
import { Space, Table } from 'antd'
import { useHistory } from 'react-router-dom'
import { useDispatch } from 'react-redux';
import { getItemCategoryApi } from '../../services/itemCategoryService'

const columns = [
  {
    title: 'Id',
    dataIndex: 'CId',
    key: 'categoryId'
  },
  {
    title: 'Category Name',
    dataIndex: 'CategoryType',
    key: 'categoryName'
  },
  {
    title: 'Is Active',
    dataIndex: 'IsActive',
    key: 'isActive',
    render: (text) => {
      if (text === true) {
        return 'Active'
      }
      return 'Inactive'
    }
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
  const dispatch = useDispatch();
  const history = useHistory();

  const [tableData, setTableData] = useState([])

  useEffect(() => {
    dispatch(getItemCategoryApi((val) => {
      setTableData(val)
    }))
  }, [])

  return (
    <ItemContainer>
      <PageHeader pageTitle="Category" buttonTitle='Add Category' buttonOnClick={() => history.push('./category/add')}></PageHeader>
      {/* <Filter ></Filter> */}
      <Table
        columns={columns}
        dataSource={tableData}
      ></Table>
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