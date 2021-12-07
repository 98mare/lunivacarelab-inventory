import React, {useState} from 'react';
import styled from 'styled-components';
import PageHeader from '../Common/pageHeader';
import { useHistory } from 'react-router-dom';
import Filter from '../Common/Filter';
import { getGoodsReceivedApi } from '../../services/labGoodsReceivedService'
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
  const [goodsList, setgoodsList] = useState([]);
  const [goodsInList, setGoodsInList] = useState([]);

  const getLabData = (data) => {
    dispatch(getGoodsReceivedApi(data, (val) => {
      setgoodsList(val)
      // console.log("this is goods list",goodsList);
    }))
  }
  const dataRet = (val) => {
    let data = {
      fromdate: val[0].format("YYYY-MM-DD"),
      todate: val[1].format("YYYY-MM-DD"),
    }
    getLabData(data)
    
  }
  console.log("this is goods list", goodsList)
  
 

  const labels = ['January', 'February', 'March', 'April', 'May', 'June', 'July'];

  const data = {
    labels,
    datasets: [
      {
        type: 'line',
        label: 'Consumption',
        borderColor: 'rgb(255, 99, 132)',
        borderWidth: 2,
        fill: false,
        data: [10, 20, 100],
      },
      {
        type: 'bar',
        label: 'Goods Out',
        backgroundColor: 'rgb(75, 192, 192)',
        data: [10, 230, 100],
        borderColor: 'white',
        borderWidth: 2,
      },
      {
        type: 'bar',
        label: 'Goods In',
        backgroundColor: 'rgb(53, 162, 235)',
        data: [10, 20, 100],
      },
    ],
  };

  


 

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