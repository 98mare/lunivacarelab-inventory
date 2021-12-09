import React, { useState } from 'react'
import { Space, Table } from 'antd'
import { useHistory } from 'react-router-dom'
import styled from 'styled-components'

import { useDispatch } from 'react-redux';
import { getLabItemsApi } from '../../services/itemNewItemService'
import PageHeader from '../Common/pageHeader'
import Filter from '../Common/Filter'
import Edit from '../Common/Edit';

const Index = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  const [tableData, setTableData] = useState([]);
  const [typId, setTypId] = useState(0)
  const [catId, setCatId] = useState(0)


  const columns = [
    {
      title: 'Item Code',
      dataIndex: 'ItemCode',
      key: 'itemCode'
    },
    {
      title: 'Item Name',
      dataIndex: 'ItemName',
      key: 'itemName'
    },
    {
      title: 'MinQty',
      dataIndex: 'MinQty',
      key: 'minQty'
    },
    {
      title: 'Location',
      dataIndex: 'Location',
      key: 'Location',
      render: (text, record) => {
        if(text !== null){
          return `${text} (${record.Rack})`;
        }
        return '';
      }
    },
    {
      title: 'Action',
      key: 'action',
      render: (text, record) => (
        <Space size="middle">
          {/* <a onClick={() => history.push(`/item/edit/${record.TId}/${typId}/${catId}`)}>Edit</a> */}
          <Edit onClick={() => history.push(`/item/edit/${record.TId}/${typId}/${catId}`)}></Edit>
        </Space>
      )
    }
  ]

  const getLabData = (tId = 0, cId = 0) => {
    let data = {
      typeId: tId,
      categoryId: cId
    }
    dispatch(getLabItemsApi(data, (val) => {
      setTableData(val)
    }))
  }

  // if (tableData.length === 0) {
  //   getLabData()
  // }

  const dataRet = (val) => {
    getLabData(val?.iType, val?.cType)
    setTypId(val?.iType)
    setCatId(val?.cType)
  }

  return (
    <ItemContainer>
      <PageHeader
        buttonTitle='Add Item'
        pageTitle='Item'
        buttonOnClick={() => history.push('./item/add')}
      ></PageHeader>
      <Filter
        itemType
        categroryType
        dataRet={dataRet}
      />
      <div className="top"></div>
      <Table className='margin-bottom-table'
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