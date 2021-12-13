import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import PageHeader from '../Common/pageHeader'
import { Table } from 'antd'
// import { useHistory } from 'react-router-dom'
import { useDispatch } from 'react-redux';
// import { getRackDetApi } from '../../services/itemRackService'
// import Filter from '../Common/Filter'
import { getStockApi } from '../../services/stockService'

const Index = () => {
  const dispatch = useDispatch();
  // const history = useHistory();

  const [tableData, setTableData] = useState([]);
  const [tableHead, settableHead] = useState([]);

  // const columns = [
  //   {
  //     title: 'Item Id',
  //     dataIndex: 'ItemId',
  //     key: 'ItemId'
  //   },
  //   {
  //     title: 'Item Name',
  //     dataIndex: 'ItemName',
  //     key: 'ItemName'
  //   },
  //   {
  //     title: 'Transaction Date',
  //     dataIndex: 'TransactionDate',
  //     key: 'TransactionDate',
  //     render: (text) => {
  //       return text.split('T')[0]
  //     }
  //   },
  //   {
  //     title: 'Min Qty',
  //     dataIndex: 'MinQty',
  //     key: 'MinQty'
  //   },
  //   {
  //     title: 'Remaining Count',
  //     dataIndex: 'RemainingCount',
  //     key: 'RemainingCount'
  //   },
  // ]

  useEffect(() => {
    locateRange();
  }, [])
  useEffect(()=> {
    createTableHead();
  }, [tableData]);

  const locateRange = () => {
    dispatch(getStockApi(0, (value) => {
      setTableData(value)
    }))
  }
  
  const createTableHead = () => {
    if(tableData.length !== 0){
      let tableKeys = Object.keys(tableData[0]);
      let data = [];
      tableKeys.forEach(ele => {
        data.push({
          title: ele,
          dataIndex: ele,
          key: ele,
        })
      })
      settableHead(data);
    }
  }

  return (
    <StocksContainer>
      <PageHeader pageTitle="Stocks"></PageHeader>
      <Table
        columns={tableHead}
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