import { Table } from 'antd'
import React, { useState } from 'react'
import { useHistory } from 'react-router-dom'
import styled from 'styled-components'
import { useDispatch } from 'react-redux';
import Filter from '../Common/Filter'
import PageHeader from '../Common/pageHeader'
import { getGoodsOutApi } from '../../services/labGoodsOutService';

const columns = [
  {
    title: 'Test Name',
    dataIndex: 'Testname',
    key: 'Testname',
  },
  {
    title: 'Item Name',
    dataIndex: 'ItemName',
    key: 'itemName',
  },
  {
    title: 'Quantity',
    dataIndex: 'Quantity',
    key: 'Quantity',
  },
  {
    title: 'Goods Out Date',
    dataIndex: 'GoodsOutDate',
    key: 'GoodsOutDate',
    render: (text) => {
      return text.split('T')[0]
    }
  },
  {
    title: 'Is Active',
    dataIndex: 'IsActive',
    key: 'IsActive',
    render: (text) => {
      if (text === true) {
        return 'Active'
      }
      return 'Inactive'
    }
  }, 
  {
    title: 'Remarks',
    dataIndex: 'Remarks',
    key: 'Remarks',
  }
]

const Index = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  const [goodsList, setgoodsList] = useState([])

  const getLabData = (data) => {
    dispatch(getGoodsOutApi(data, (val) => {
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
        pageTitle='Goods Out Report'
        csvLinkTitle='Export csv'
        forCVSData='goodsout'
      ></PageHeader>
      <Filter
        dateRange
        dateRet={dataRet}
      />
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
  margin-bottom: 50px;
`