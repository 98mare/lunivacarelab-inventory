import React, { useState } from 'react'
import styled from 'styled-components'
import PageHeader from '../Common/pageHeader'
import { Space, Table } from 'antd'
import { useHistory } from 'react-router-dom'
import { useDispatch } from 'react-redux';
import Filter from '../Common/Filter'
import { getWastageApi } from '../../services/wastageService'
import ReportChart from '../Common/ReportChart'
import { ChartColor } from '../Common/ChartColor'
import Edit from '../Common/Edit'
import Cancle from '../Common/Cancle'



const Index = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const [tableData, setTableData] = useState([]);
  const [label,  setLabel]  = useState([]);
  const [wastage, setWastage] = useState([]);

  const columns = [
    {
      title: 'Id',
      dataIndex: 'WId',
      key: 'wastageId'
    },
    {
      title: 'Item Name',
      dataIndex: 'ItemName',
      key: 'itemName'
    },
    {
      title: 'Wastage Amount',
      dataIndex: 'WastageAmount',
      key: 'WastageAmount'
    },
    {
      title: 'Reason',
      dataIndex: 'Reason',
      key: 'Reason'
    },
    {
      title: 'Remarks',
      dataIndex: 'Remarks',
      key: 'Remarks'
    },
    {
      title: 'Action',
      key: 'action',
      render: (text, record) => (
        <Space size="middle">
          <Cancle onClick={()=> history.push(`./wastage/edit/${record.WId}/${record.CreatedDate}`)}>Cancel</Cancle>
        </Space>
      )
    }
  ]

  const getWastage = (data) => {
    dispatch(getWastageApi(data, (val) => {
      setTableData(val)
      let pushedArr = []
      let pushedWastage =[]
      val.forEach(ele => {
        pushedArr.push(ele?.ItemName)
        pushedWastage.push(ele?.WastageAmount)
      })
      setLabel(pushedArr);
      setWastage(pushedWastage);
    }))
  }
  // console.log(label);
  const dateRet = (val) => {
    let data = {
      fromdate: val[0].format("YYYY-MM-DD"),
      todate: val[1].format("YYYY-MM-DD"),
    }
    getWastage(data);
  }

  const labels = label;
  const dataDo = {
    labels,
    datasets: [
      {
        
        label: 'Wastage',
        backgroundColor: ChartColor,
        data: wastage,
        borderColor: [
          'rgba(255, 255, 132, 1)',
          
        ],
        borderWidth: 1,
      },
    ],
  };
  const dataBar = {
    labels,
    datasets: [
      {
        type: 'bar',
        label: 'Wastage',
        backgroundColor: 'rgb(53, 162, 235)',
        data: wastage,
        borderWidth: 2
      },
    ],
  };



  return (
    <ItemContainer>
      <PageHeader pageTitle="Wastage" buttonTitle='Add Wastage' buttonOnClick={() => history.push('./wastage/add')}></PageHeader>
      <Filter dateRange dateRet={dateRet}></Filter>
      <Table columns={columns} dataSource={tableData}></Table>
      {label.length !== 0 ? <ReportChart dataDo={dataDo} dataBar={dataBar}></ReportChart>: ''}
      
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