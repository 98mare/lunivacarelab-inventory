import React, { useEffect, useState } from 'react'
import PageHeader from '../Common/pageHeader'
import styled from 'styled-components'
import {Table } from 'antd'
import { useDispatch } from 'react-redux'
import { getItemNearApi } from '../../services/itemNewItemService'

const MinQunatityReport = () => {
  const dispatch = useDispatch();
  const [tableData, setTableData] = useState([]);

  const getData =() => {
    const pushedArr = []
    dispatch(getItemNearApi(value =>{ 
      value.forEach(ele => {
        pushedArr.push(ele);
      })
    setTableData(pushedArr)

  }))
  }
  useEffect(() => {
    getData();
  }, [])

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
        title: 'Min Qty',
        dataIndex: 'MinQty',
        key: 'MinQty'
      }, {
        title: 'Remening Count',
        dataIndex: 'RemainingCount',
        key: 'RemainingCount'
      }
    ]
  


  return (
    <MinQunatityReportContainer>
      <PageHeader
        pageTitle='Minimum Quantity Report'
      >
      </PageHeader>
      <Table columns={columns} dataSource={tableData}></Table>
    </MinQunatityReportContainer>
  )
}

export default MinQunatityReport

const MinQunatityReportContainer = styled.div`
 @media(max-width: 576px){
  margin-bottom: 50px;
 }
`