import React, { useState, useEffect } from 'react'
import styled from 'styled-components'
import PageHeader from '../Common/pageHeader'
import {Space, Table } from 'antd'
import { useHistory } from 'react-router-dom'
import { useDispatch } from 'react-redux';
import { getLocationApi } from '../../services/itemLocationService'

const columns = [
  {
    title: 'Id',
    dataIndex: 'LId',
    key: 'locationId'
  },
  {
    title: 'Location Code',
    dataIndex: 'LCode',
    key: 'locationCode'
  },
  {
    title: 'Location Name',
    dataIndex: 'Location',
    key: 'locationName'
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
    dispatch(getLocationApi((val) => {
      setTableData(val)
    }))
  }, [])

  return (
    <ItemContainer>
      <PageHeader pageTitle="Location" buttonTitle='Add Location' buttonOnClick={()=> history.push('./location/add')}></PageHeader>
      {/* <Filter ></Filter> */}
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