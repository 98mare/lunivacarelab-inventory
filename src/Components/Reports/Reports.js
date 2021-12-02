import { Form, Input, Button, Checkbox, message, Row, Col, Table } from 'antd';
import styled from 'styled-components';
import PageHeader from '../Common/pageHeader';


const Reports = (props) => {
  // console.log('this is props',props?.match?.path);

  return (
    <ReportsContainer>
      <PageHeader pageTitle='reports'></PageHeader>

    
     
    </ReportsContainer>
  );
};

export default Reports;

const ReportsContainer = styled.div`
  background-color: #fefefe;
  padding-top: 30px;
`