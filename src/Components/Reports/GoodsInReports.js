import { Table } from 'antd'
import React, { useState } from 'react'
// import { useHistory } from 'react-router-dom'
import styled from 'styled-components'
import { useDispatch } from 'react-redux';
import { getGoodsInCountApi, getGoodsReceivedApi } from '../../services/labGoodsReceivedService'
import Filter from '../Common/Filter'
import PageHeader from '../Common/pageHeader'
import {
  Chart as ChartJS,
  LinearScale,
  CategoryScale,
  BarElement,
  PointElement,
  LineElement,
  Legend,
  Tooltip,
  ArcElement
} from 'chart.js';
import { Chart ,Doughnut  } from 'react-chartjs-2';
import ReportChart from '../Common/ReportChart';
import { ChartColor } from '../Common/ChartColor';
// import faker from 'faker';

ChartJS.register(
  LinearScale,
  CategoryScale,
  BarElement,
  PointElement,
  LineElement,
  ArcElement,
  Legend,
  Tooltip
);

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
// console.log("array distructoring", columns.title)

const Index = () => {
  // const history = useHistory();
  const dispatch = useDispatch();
  const [goodsList, setgoodsList] = useState([]);
  const [goodsInList, setGoodsInList] = useState([]);
  const [goodsLabel, setgoodslabe] = useState([])

  const getLabData = (data) => {
    dispatch(getGoodsReceivedApi(data, (val) => {
      setgoodsList(val)
      // console.log("this is goods list",goodsList);
    }))
  }

  const graphData = (data) => {
    dispatch(getGoodsInCountApi(data, (val) => {
      // setgoodsList(val)
      let pushedArr = []
      let pushedGoodsIn = []
      val.forEach(ele => {
        pushedArr.push(ele?.GoodsInDate.split('T')[0])
        pushedGoodsIn.push(ele?.GoodsInCount)
      })
      setgoodslabe(pushedArr);
      setGoodsInList(pushedGoodsIn);
      // 
      // console.log("this is goods list",goodsList);
    }))
  }

  const dataRet = (val) => {
    let data = {
      fromdate: val[0].format("YYYY-MM-DD"),
      todate: val[1].format("YYYY-MM-DD"),
      itemid: val?.itemid
    }
    getLabData(data);
    graphData(data);
    
  }

 
  const labels = goodsLabel;
  const dataDo = {
    labels,
    datasets: [
      {
        
        label: 'Goods In',
        backgroundColor: ChartColor,
        data: goodsInList,
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
        label: 'Goods In',
        backgroundColor: 'rgb(53, 162, 235)',
        data: goodsInList,
        borderWidth: 2
      },
    ],
  };


  return (
    <GoodsInContainer>
      <PageHeader
       
        pageTitle='Goods In Report'
        // buttonTitle='add Goods'
        // buttonOnClick={() => history.push('./goodsin/add')}
        csvLinkTitle='Export csv'
        goodsIn
      ></PageHeader>
      <Filter
        dateRange
        dateRet={dataRet}
        itemName
      ></Filter>
      {/* {console.log("new data ", goodsList)} */}
      <Table className='tableWidth'
        columns={columns}
        dataSource={goodsList}
      />
      {goodsLabel.length !== 0 ?
        <ReportChart 
        dataBar={dataBar}
        dataDo={dataDo}
      ></ReportChart>
       : ''}
      
      
    </GoodsInContainer>
  )
}

export default Index

const GoodsInContainer = styled.div`
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