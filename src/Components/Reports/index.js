import React, { useState } from 'react'
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
    <ReportContainer>
      <PageHeader pageTitle="Reports" buttonTitle='Add Reports' buttonOnClick={() => history.push('./reports/add')}></PageHeader>
      <Filter dateRange></Filter>
      <Table
        columns={columns}
        dataSource={tableData}
      />
    </ReportContainer>
  )
}

export default Index

const ReportContainer = styled.div`
  background: rgba( 255, 255, 255, 0.25 );
  box-shadow: 0 2px 22px 0 rgba( 31, 38, 135, 0.10 );
  backdrop-filter: blur( 4px );
  -webkit-backdrop-filter: blur( 4px );
  border-radius: 10px;
  border: 1px solid rgba( 255, 255, 255, 0.18 );
  overflow: hidden;
  margin-bottom: 50px;
`