import React, { useState, useEffect } from 'react'
import styled from 'styled-components'
import PageHeader from '../Common/pageHeader'
import { Space, Table } from 'antd'
import { useHistory } from 'react-router-dom'
import { useDispatch } from 'react-redux';
import { getRackDetApi } from '../../services/itemRackService'
import Filter from '../Common/Filter'

const columns = [
  {
    title: 'Id',
    dataIndex: 'RId',
    key: 'rackId'
  },
  {
    title: 'Rack Code',
    dataIndex: 'RackCode',
    key: 'rackCode'
  },
  {
    title: 'Rack Name',
    dataIndex: 'RackName',
    key: 'rackName'
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

  const locateRange = (val) => {
    dispatch(getRackDetApi(val, (value) => {
      setTableData(value)
    }))
  }

  return (
    <ItemContainer>
      <PageHeader pageTitle="Rack" buttonTitle='Add Rack' buttonOnClick={() => history.push('./rack/add')}></PageHeader>
      <Filter locateRange={locateRange}></Filter>
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