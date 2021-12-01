import React, { useState, useEffect } from 'react'
import styled from 'styled-components'
import PageHeader from '../Common/pageHeader'
import {Space, Table } from 'antd'
import { useHistory } from 'react-router-dom'
import { useDispatch } from 'react-redux';
import { getLocationApi } from '../../services/itemLocationService'



const Index = () => {
  const dispatch = useDispatch();
  const history = useHistory();

  const [tableData, setTableData] = useState([])

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
          <a onClick={()=> history.push(`./location/edit/${record.LId}`)}>Edit</a>
          {/* <a href="#">Delete</a> */}
        </Space>
      )
    }
  ]

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
  background: rgba( 255, 255, 255, 0.25 );
  box-shadow: 0 2px 22px 0 rgba( 31, 38, 135, 0.10 );
  backdrop-filter: blur( 4px );
  -webkit-backdrop-filter: blur( 4px );
  border-radius: 10px;
  border: 1px solid rgba( 255, 255, 255, 0.18 );
  overflow: hidden;
  margin-bottom: 50px;
`