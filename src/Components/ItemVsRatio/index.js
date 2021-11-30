import React, { useState, useEffect } from 'react'
import { Button, Space, Table } from 'antd'
import { useHistory } from 'react-router-dom'
import styled from 'styled-components'

import { useDispatch } from 'react-redux';
import PageHeader from '../Common/pageHeader'
import { getItemVsRatioApi } from '../../services/itemVsRatioService';

const Index = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  const [tableData, setTableData] = useState([]);

  useEffect(() => {
    dispatch(getItemVsRatioApi((val) => {
      setTableData(val)
    }))
  }, [])

  const columns = [
    {
      title: 'Test Name',
      dataIndex: 'TestName',
      key: 'Testname',
    },
    {
      title: 'Item Name',
      dataIndex: 'ItemName',
      key: 'itemName'
    },
    {
      title: 'Item Per Unit Test',
      dataIndex: 'ItemPerUnitTest',
      key: 'ItemPerUnitTest'
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

  return (
    <ItemContainer>
      <PageHeader
        buttonTitle='add Item Vs Ratio'
        pageTitle='Item Vs Ratio'
        buttonOnClick={() => history.push('./itemvsratio/add')}
      ></PageHeader>
      <div className="top"></div>
      <Table
        columns={columns}
        dataSource={tableData}
      />
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
`