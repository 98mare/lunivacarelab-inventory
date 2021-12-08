import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import PageHeader from '../Common/pageHeader'
import { Space, Table } from 'antd'
import { useHistory } from 'react-router-dom'
import { useDispatch } from 'react-redux';
import { getRackDetApi } from '../../services/itemRackService'
import Filter from '../Common/Filter'
import { getStockApi } from '../../services/stockService'



const Index = () => {
  const dispatch = useDispatch();
  const history = useHistory();

  const [tableData, setTableData] = useState([])

  const columns = [
    {
      title: 'Item Id',
      dataIndex: 'ItemId',
      key: 'ItemId'
    },
    {
      title: 'Item Name',
      dataIndex: 'ItemName',
      key: 'ItemName'
    },
    {
      title: 'Transection Date',
      dataIndex: 'TransactionDate',
      key: 'TransactionDate'
    },{
      title: 'Remening Count',
      dataIndex: 'RemainingCount',
      key: 'RemainingCount'
    }
    // ,
    // {
    //   title: 'Is Active',
    //   dataIndex: 'IsActive',
    //   key: 'isActive',
    //   render: (text) => {
    //     if (text === true) {
    //       return 'Active'
    //     }
    //     return 'Inactive'
    //   }
    // }
    // ,
    // {
    //   title: 'action',
    //   key: 'action',
    //   render: (text, record) => (
    //     <Space size="middle">
    //       <a onClick={() => history.push(`rack/edit/${record.LocationId}/${record.RId}`)}>Edit</a>
    //       {/* <a href="#">Delete</a> */}
    //     </Space>
    //   )
    // }
  ]
  useEffect(()=> {
    locateRange();
  }, [])

  const locateRange = () => {
    dispatch(getStockApi(0, (value) => {
      setTableData(value)
    }))
  }

  return (
    <StocksContainer>
      <PageHeader pageTitle="Stocks"></PageHeader>
      {/* <Filter locateRange={locateRange}></Filter> */}
      <Table
        columns={columns}
        dataSource={tableData}
      />
    </StocksContainer>
  )
}

export default Index

const StocksContainer = styled.div`
  background: rgba( 255, 255, 255, 0.25 );
  box-shadow: 0 2px 22px 0 rgba( 31, 38, 135, 0.10 );
  backdrop-filter: blur( 4px );
  -webkit-backdrop-filter: blur( 4px );
  border-radius: 10px;
  border: 1px solid rgba( 255, 255, 255, 0.18 );
  overflow: hidden;
  margin-bottom: 50px;
`