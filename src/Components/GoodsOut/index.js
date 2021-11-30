import { Table } from 'antd'
import React, { useState } from 'react'
import { useHistory } from 'react-router-dom'
import styled from 'styled-components'
import { useDispatch } from 'react-redux';
import { getGoodsReceivedApi } from '../../services/labGoodsReceivedService'
import Filter from '../Common/Filter'
import PageHeader from '../Common/pageHeader'

const columns = [
  {
    title: 'Item Name',
    dataIndex: 'ItemName',
    key: 'itemName',
  },
  {
    title: 'Total',
    dataIndex: 'Total',
    key: 'Total',
  },
  {
    title: 'Expiry Date',
    dataIndex: 'ExpiryDate',
    key: 'ExpiryDate',
    render: (text) => {
      return text.split('T')[0]
    }
  },
  {
    title: 'Item Status',
    dataIndex: 'ItemStatus',
    key: 'ItemStatus',
  }
]

const Index = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  const [goodsList, setgoodsList] = useState([])

  const getLabData = (data) => {
    dispatch(getGoodsReceivedApi(data, (val) => {
      setgoodsList(val)
    }))
  }

  const dataRet = (val) => {
    let data = {
      fromdate: val[0].format("YYYY-MM-DD"),
      todate: val[1].format("YYYY-MM-DD"),
    }
    getLabData(data)
  }

  return (
    <GoodsOutContainer>
      <PageHeader
        buttonTitle='add Goods out'
        pageTitle='Goods Out'
        buttonOnClick={() => history.push('./goodsout/add')}
      ></PageHeader>
      <Table
        columns={columns}
        dataSource={goodsList}
      />
    </GoodsOutContainer>
  )
}

export default Index

const GoodsOutContainer = styled.div`
  background: rgba( 255, 255, 255, 0.25 );
  box-shadow: 0 2px 22px 0 rgba( 31, 38, 135, 0.10 );
  backdrop-filter: blur( 4px );
  -webkit-backdrop-filter: blur( 4px );
  border-radius: 10px;
  border: 1px solid rgba( 255, 255, 255, 0.18 );
  overflow: hidden;
`