import React, {useState} from 'react';
import styled from 'styled-components';
import PageHeader from '../Common/pageHeader';
import { useHistory } from 'react-router-dom';
import Filter from '../Common/Filter';
import { getGoodsInCountApi, getGoodsReceivedApi } from '../../services/labGoodsReceivedService'
import { useDispatch } from 'react-redux';

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
import { getGoodsOutCountApi } from '../../services/labGoodsOutService';
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






const InVsOutVsCon = () =>{

  const dispatch = useDispatch();
  const history = useHistory();
  // const [goodsList, setgoodsList] = useState([]);
  const [goodsInList, setGoodsInList] = useState([]);
  const [goodsOutList, setGoodsList] = useState([]);
  const [goodsLabel, setgoodslabel] = useState([])

  const getLabData = (data) => {
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
      setgoodslabel(pushedArr);
      setGoodsInList(pushedGoodsIn);
      // 
      // console.log("this is goods list",goodsList);
    }))

    dispatch(getGoodsOutCountApi(newData, (val) => {
      let pushedArr =[]
      let pushedGoodsOut = []
      
      val.forEach(ele => {
        pushedArr.push(ele?.GoodsInDate.split('T')[0])
        pushedGoodsOut.push(ele?.GoodsInCount)
      })
      setGoodsList(pushedGoodsOut);
    }))


  }

  const dataRet = (val) => {
    let data = {
      fromdate: val[0].format("YYYY-MM-DD"),
      todate: val[1].format("YYYY-MM-DD"),
    }
    getLabData(data)
    
  }
  const labels = goodsLabel;

  const data = {
    labels,
    datasets: [
      {
        type: 'line',
        label: 'Consumption',
        borderColor: 'rgb(255, 99, 132)',
        borderWidth: 2,
        fill: false,
        data:[],
      },
      {
        type: 'bar',
        label: 'Goods Out',
        backgroundColor: 'rgb(75, 192, 192)',
        data: goodsOutList,
        borderColor: 'white',
        borderWidth: 2,
      },
      {
        type: 'bar',
        label: 'Goods In',
        backgroundColor: 'rgb(53, 162, 235)',
        data: goodsInList,
        borderWidth: 2
      },
    ],
  };

  

  console.log(goodsInList);
 

  return (
    <InVsOutVsContainer>
      <PageHeader pageTitle="Goods In Vs Goods Out Vs Consumption" buttonTitle='Add Rack' buttonOnClick={() => history.push('./rack/add')}></PageHeader>
      <Filter dateRange
        dateRet={dataRet}></Filter>
      <Chart type='bar' data={data} />
    </InVsOutVsContainer>
  )
}

export default InVsOutVsCon;

const InVsOutVsContainer = styled.div`
  background-color: #fefefe;
  padding: 20px;
  border-radius: 10px;
`