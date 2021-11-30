import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import PageHeader from '../Common/pageHeader'
import { Space, Table } from 'antd'
import { useHistory } from 'react-router-dom'
import { useDispatch } from 'react-redux';
import { getItemTypeApi } from '../../services/itemItemTypeService'

const columns = [
  {
    title: 'Id',
    dataIndex: 'TId',
    key: 'typeId'
  },
  {
    title: 'Type Name',
    dataIndex: 'ItemType',
    key: 'typeName'
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
    title: 'Action',
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
    dispatch(getItemTypeApi((val) => {
      setTableData(val)
    }))
  }, [])

  return (
    <ItemContainer>
      <PageHeader pageTitle="Type" buttonTitle='Add Type' buttonOnClick={() => history.push('./type/add')}></PageHeader>
      <Table
        columns={columns}
        dataSource={tableData}
      />
    </ItemContainer>
  )
}

export default Index

const ItemContainer = styled.div``