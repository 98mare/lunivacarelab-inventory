import { Table, Space, Tag } from 'antd'
import React, { useState, useEffect } from 'react'
import { useHistory } from 'react-router-dom'
import styled from 'styled-components'
import { useDispatch } from 'react-redux';
import PageHeader from '../Common/pageHeader'
import { getItemUnitApi } from '../../services/itemUnitService';
import Edit from '../Common/Edit';

const Index = () => {

  const history = useHistory();
  const dispatch = useDispatch();
  const [unitList, setunitList] = useState([])

  useEffect(() => {
    getLabData()
  }, [])

  const getLabData = () => {
    dispatch(getItemUnitApi((val) => {
      setunitList(val)
    }))
  }
  const columns = [
    {
      title: 'Unit Name',
      dataIndex: 'Units',
      key: 'unitName',
    },
    {
      title: 'Is Active',
      dataIndex: 'IsActive',
      key: 'IsActive',
      render: (text) => {
        let retText = 'Inactive'
        let retColor = 'red'
        if (text === true) {
          retText = 'Active'
          retColor = 'green'
        }
        return <Tag color={retColor}>{retText}</Tag>
      }
    },
    {
      title: 'Action',
      key: 'action',
      render: (text, record) => (
        <Space size="middle">
          <Edit onClick={() => history.push(`./units/edit/${record.UnId}`)}>Edit</Edit>
        </Space>
      )
    }
  ]

  return (
    <UnitContainer>
      <PageHeader
        buttonTitle='Add Units'
        pageTitle='Units'
        buttonOnClick={() => history.push('./units/add')}
      ></PageHeader>
      <Table className='tableWidth'
        columns={columns}
        dataSource={unitList}
      />
    </UnitContainer>
  )
}

export default Index

const UnitContainer = styled.div`
  background: rgba( 255, 255, 255, 0.25 );
  box-shadow: 0 2px 22px 0 rgba( 31, 38, 135, 0.10 );
  backdrop-filter: blur( 4px );
  -webkit-backdrop-filter: blur( 4px );
  border-radius: 10px;
  border: 1px solid rgba( 255, 255, 255, 0.18 );
  overflow: hidden;
  margin-bottom: 50px;

  .tableWidth{
    width: auto;
  }
`