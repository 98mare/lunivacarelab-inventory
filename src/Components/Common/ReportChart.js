import React from 'react'
import {
  Chart as ChartJS,
  LinearScale,
  CategoryScale,
  BarElement,
  PointElement,
  LineElement,
  Legend,
  Tooltip,
  ArcElement,
} from 'chart.js';
import { Chart,Doughnut } from 'react-chartjs-2';
import styled from 'styled-components';
import { Col, Row } from 'antd';
import { Tabs } from 'antd';
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


const { TabPane } = Tabs;


const ReportChart = ({ options, dataBar, dataDo}) => {
  console.log("this is option",options)
  return (
    <ReportChartContainer>
    {/* <Row justify='space-between' span={24}>
      <Col xl={12} lg={12} md={12} sm={24} xs={24}  className="col">
        <Chart options={options} type='bar' data={dataBar}/>
        </Col>
        
        <Col xl={12} lg={12} md={12} sm={24} xs={24} className="col">
        <Doughnut options={options} data={dataDo} />
        </Col>
    </Row> */}


    {/* new */}
    <Tabs span={24} type='card'>
      <TabPane span={24} tab="Bar Graph" key="1" className='tabs'>
        <Chart options={options} type='bar' data={dataBar}/>
      </TabPane>
      <TabPane tab="Doughnut Graph" key="2" className='tabs'>
        <Doughnut options={options} data={dataDo} />
      </TabPane>
      <TabPane tab="Both" key="3" className='tabs'>
        <Chart options={options} type='bar' data={dataBar}/>
        <Doughnut options={options} data={dataDo} />
      </TabPane>
    </Tabs>
      
      
    </ReportChartContainer>
  )
}

export default ReportChart

const ReportChartContainer = styled.div`
 background-color: #fefefe;
  padding: 10px;
  display: flex;
  align-items: start;
  width: 100%;
  .tabs{
    width: 800px;
    background-color: #fefefe;
    @media(max-width: 800px){
      width: 400px;
    }
    @media(max-width: 500px){
      width: 300px;
    }
  }
  
`