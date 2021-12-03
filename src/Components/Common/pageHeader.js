import { Button, Col, Row } from 'antd'
import React from 'react'
import styled from 'styled-components'
import AppButton from './AppButton'
import { CSVLink } from 'react-csv';
import { useSelector } from 'react-redux';

const PageHeader = ({pageTitle,buttonTitle,buttonOnClick, csvLinkTitle, goodsIn, goodsOut}) => {


// to CSV goods in report
  const goodsInReducer = useSelector((state) => state.goodsin);
  console.log("goods in red", goodsInReducer);
  const GoodsInRed = (value) => {
    let newArr = [];
    for (const key in value) {
      if (Object.hasOwnProperty.call(value, key)) {
        const ele = value[key];
        newArr.push(ele)
      }
    }
    return newArr;
  }
  let goodsInData = GoodsInRed(goodsInReducer?.goodsin);

  // to CSV goods out report
  const GoodsOutReducer = useSelector((state) => state.goodsout);
  console.log('goods out',GoodsOutReducer)
  const GoodsOutRed = (value) => {
    let newArr = [];
    for (const key in value) {
      if (Object.hasOwnProperty.call(value, key)) {
        const ele = value[key];
        newArr.push(ele)
      }
    }
    return newArr;
  }
  let goodsOutData = GoodsOutRed(GoodsOutReducer?.goodsout);


  return (
    <PageHeaderContainer>
      <Row justify='space-between align-center'>
        <span className='pageTtitle'>{pageTitle}</span>
        <Row>
          {buttonTitle && <AppButton buttonTitle={buttonTitle} buttonOnClick={buttonOnClick} ></AppButton>}

          {
            goodsIn && 
            <div className='link'>
            <CSVLink filename={"goodsIn.csv"} className="btn ant-btn btn-primary btn-primary--outline" data={goodsInData}>{csvLinkTitle}</CSVLink>
            {/* <GoodsInCSV/> */}
            </div>
          }

          {
            goodsOut && 
            <div className='link'>
            <CSVLink filename={"goodsOut.csv"} className="btn ant-btn btn-primary btn-primary--outline" data={goodsOutData}>{csvLinkTitle}</CSVLink>
            {/* <GoodsInCSV/> */}
            </div>
          }
          
        </Row>
      </Row>
    </PageHeaderContainer>
  )
}

export default PageHeader

const PageHeaderContainer = styled.div`
  background-color: #fefefe;
  padding: 20px 10px;
  width: 100%;
  align-items: center;
`
