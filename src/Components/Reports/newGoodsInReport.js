import { Table } from 'antd'
import React, { useEffect, useState } from 'react'
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
import ReportChart from '../Common/ReportChart';
import { ChartColor } from '../Common/ChartColor';

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
    title: 'Item Id',
    dataIndex: 'ItemId',
    key: 'itemId',
  },
  {
    title: 'Item Name',
    dataIndex: 'ItemName',
    key: 'itemName',
  },
  {
    title: 'Goods In Count',
    dataIndex: 'GoodsInCount',
    key: 'Total',
  },
  {
    title: 'Goods In Date',
    dataIndex: 'GoodsInDate',
    key: 'GoodsInDate',
    render: (text) => {
      return text.split('T')[0]
    }
  }
]

const NewGoodsInReport = () => {
  const dispatch = useDispatch();
  const [goodsList, setgoodsList] = useState([]);
  const [goodsInList, setGoodsInList] = useState([]);
  const [goodsLabel, setgoodslabe] = useState([]);
  const [goodsInName, setGoodsInName]= useState([]);
  const [goodLister, setgoodLister] = useState([])
  // const getLabData = (data) => {
  //   dispatch(getGoodsReceivedApi(data, (val) => {
  //     setgoodsList(val)
  //   }))
  // }

  const graphData = (data) => {
    dispatch(getGoodsInCountApi(data, (val) => {
      let pushedGoodsIn = []
      let PushedGoodsName = []
      setgoodsList(val)
      val.forEach(ele => {
        PushedGoodsName.push(ele?.ItemName)
      })
      setGoodsInList(pushedGoodsIn);

      var filteredArray = PushedGoodsName.filter(function(item, pos){
        return PushedGoodsName.indexOf(item)=== pos; 
      });      
      // setgoodLister(val)
      setGoodsInName(filteredArray)
    }))
  }

  console.log("this is goods in name",goodsInName)

  useEffect(() => {
    retunDa()
  }, [goodsInName])

  const retunDa = () => {    
    const retDaa = groupData(goodsList).children
    
    let mainArrDataset = []

    retDaa.forEach(ele => {
      let totArr = []
      ele.children.forEach(el => {
        totArr.push(el.GoodsInCount)
        })
        let a = totArr.reduce((a, b) => a + b, 0);
        mainArrDataset.push(a);
    })
    console.log(mainArrDataset);
    setgoodLister(mainArrDataset)

  }

  const groupData = (d) => {
    let g = Object.entries(d.reduce((r,c)=>(r[c.ItemName]=[...r[c.ItemName]||[], c],r),{}))
    return g.reduce((r,c) => (
      r.children.push(
       {children: c[1]}), r),{children:[]}
       )
    }

  const dataRet = (val) => {
    let data = {
      fromdate: val[0].format("YYYY-MM-DD"),
      todate: val[1].format("YYYY-MM-DD"),
      itemid: val?.itemid
    }
    // getLabData(data);
    graphData(data);

  }


  const lab = goodsLabel;
  const labels = goodsInName;
  const dataDo = {
    labels,
    datasets: [
      {
        label: 'Goods In',
        backgroundColor: ChartColor,
        data: goodLister,
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
        data: goodLister,
        borderWidth: 2
      },
    ],
  };

  const options = {
    title: {
      display: true,
      text: "Chart Title"
    },
    scales: {
      yAxes: [
        {
          ticks: {
            suggestedMin: 0,
            suggestedMax: 100
          }
        }
      ]
    }
  };

  return (
    <NewGoodsInContainer>
      <PageHeader

        pageTitle=' New Goods In Report'
        csvLinkTitle='Export csv'
        goodsIn
      />
      <Filter
        dateRange
        dateRet={dataRet}
        itemName
      />
      <Table className='tableWidth'
        columns={columns}
        dataSource={goodsList}
      />
      {goodsInName.length !== 0 ?
        <ReportChart
          options={options}
          dataBar={dataBar}
          dataDo={dataDo}
        ></ReportChart>
        : ''}
    </NewGoodsInContainer>
  )
}

export default NewGoodsInReport

const NewGoodsInContainer = styled.div`
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