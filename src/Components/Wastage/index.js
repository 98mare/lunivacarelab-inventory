import React, { useState } from 'react'
import styled from 'styled-components'
import PageHeader from '../Common/pageHeader'
import { Space, Table } from 'antd'
import { useHistory } from 'react-router-dom'
import { useDispatch } from 'react-redux';
import Filter from '../Common/Filter'
import { getWastageApi } from '../../services/wastageService'

const columns = [
  {
    title: 'Id',
    dataIndex: 'WId',
    key: 'wastageId'
  },
  {
    title: 'Item Name',
    dataIndex: 'ItemName',
    key: 'itemName'
  },
  {
    title: 'Wastage Amount',
    dataIndex: 'WastageAmount',
    key: 'WastageAmount'
  },
  {
    title: 'Reason',
    dataIndex: 'Reason',
    key: 'Reason'
  },
  {
    title: 'Remarks',
    dataIndex: 'Remarks',
    key: 'Remarks'
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

  const getWastage = (data) => {
    dispatch(getWastageApi(data, (val) => {
      setTableData(val)
    }))
  }

  const dateRet = (val) => {
    let data = {
      fromdate: val[0].format("YYYY-MM-DD"),
      todate: val[1].format("YYYY-MM-DD"),
    }
    getWastage(data);
  }
  return (
    <ItemContainer>
      <PageHeader pageTitle="Wastage" buttonTitle='Add Wastage' buttonOnClick={() => history.push('./wastage/add')}></PageHeader>
      <Filter dateRange dateRet={dateRet}></Filter>
      <Table columns={columns} dataSource={tableData}></Table>
    </ItemContainer>
  )
}

export default Index

const ItemContainer = styled.div`
  background: rgba( 255, 255, 255, 0.25 );
  box-shadow: 0 2px 22px 0 rgba( 31, 38, 135, 0.10 );
  backdrop-filter: blur( 4px );
  -webkit-backdrop-filter: blur( 4px );
  border-radius: 10px;
  border: 1px solid rgba( 255, 255, 255, 0.18 );
  overflow: hidden;
  margin-bottom: 50px;
`