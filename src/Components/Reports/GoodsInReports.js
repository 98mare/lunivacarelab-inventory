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
} from 'chart.js';
import { Chart } from 'react-chartjs-2';
import ReportChart from '../Common/ReportChart';
// import faker from 'faker';

ChartJS.register(
  LinearScale,
  CategoryScale,
  BarElement,
  PointElement,
  LineElement,
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
    let newData = {
      ...data,
      itemid: 0
    }
    dispatch(getGoodsInCountApi(newData, (val) => {
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
    }
    getLabData(data);
    graphData(data);
    
  }

  const labels = goodsLabel;

  const data = {
    labels,
    datasets: [
      {
        type: 'bar',
        label: 'Goods In',
        backgroundColor: 'rgb(53, 162, 235)',
        data: goodsInList,
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
      ></Filter>
      {/* {console.log("new data ", goodsList)} */}
      <Table className='tableWidth'
        columns={columns}
        dataSource={goodsList}
      />
      <ReportChart data={data}></ReportChart>
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