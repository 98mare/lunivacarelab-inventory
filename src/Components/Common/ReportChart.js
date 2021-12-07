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
} from 'chart.js';
import { Chart } from 'react-chartjs-2';
import styled from 'styled-components';
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


const ReportChart = ({data}) => {
  return (
    <ReportChartContainer>
      <Chart type='bar' data={data} />
    </ReportChartContainer>
  )
}

export default ReportChart

const ReportChartContainer = styled.div`
  background-color: #fefefe;
  padding: 20px;
`