import React, { useState, useEffect } from 'react'
import styled from 'styled-components'
import PageHeader from '../Common/pageHeader'
import { Space, Table, Tag } from 'antd'
import { useHistory } from 'react-router-dom'
import { useDispatch } from 'react-redux';
import { getItemCategoryApi } from '../../services/itemCategoryService'
import Edit from '../Common/Edit'

const Index = () => {
  const dispatch = useDispatch();
  const history = useHistory();

  const [tableData, setTableData] = useState([])

  useEffect(() => {
    dispatch(getItemCategoryApi((val) => {
      setTableData(val)
    }))
  }, [])

  const columns = [
    {
      title: 'Id',
      dataIndex: 'CId',
      key: 'categoryId'
    },
    {
      title: 'Category Name',
      dataIndex: 'CategoryType',
      key: 'categoryName'
    },
    {
      title: 'Is Active',
      dataIndex: 'IsActive',
      key: 'isActive',
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
          <Edit onClick={()=>history.push(`./category/edit/${record.CId}`)}>Edit</Edit>
        </Space>
      )
    }
  ]

  return (
    <ItemContainer>
      <PageHeader pageTitle="Category" buttonTitle='Add Category' buttonOnClick={() => history.push('./category/add')}></PageHeader>
      <Table
        columns={columns}
        dataSource={tableData}
      ></Table>
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