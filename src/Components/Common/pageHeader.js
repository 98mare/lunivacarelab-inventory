import { Row } from 'antd'
import React from 'react'
import styled from 'styled-components'
import AppButton from './AppButton'
import { CSVLink } from 'react-csv';

const PageHeader = ({ pageTitle, buttonTitle, buttonOnClick, csvLinkTitle, csvDataName, csvData,forGroup, forGroupButtonClick,forCon, forConButtonClick }) => {

  // to CSV goods in report
  // const goodsInReducer = useSelector((state) => state.goodsin);
  // const GoodsInRed = (value) => {
  //   let newArr = [];
  //   for (const key in value) {
  //     if (Object.hasOwnProperty.call(value, key)) {
  //       const ele = value[key];
  //       newArr.push(ele)
  //     }
  //   }
  //   return newArr;
  // }
  // let goodsInData = GoodsInRed(goodsInReducer?.goodsin);

  // to CSV goods out report
  // const GoodsOutReducer = useSelector((state) => state.goodsout);
  // const GoodsOutRed = (value) => {
  //   let newArr = [];
  //   for (const key in value) {
  //     if (Object.hasOwnProperty.call(value, key)) {
  //       const ele = value[key];
  //       newArr.push(ele)
  //     }
  //   }
  //   return newArr;
  // }
  // let goodsOutData = GoodsOutRed(GoodsOutReducer?.goodsOuts);


  return (
    <PageHeaderContainer>
      <Row justify='space-between align-center'>
        <span className='pageTtitle'>{pageTitle}</span>
        <Row style={{gap: '10px'}}>
          {forCon && <AppButton buttonTitle={forCon} buttonOnClick={forConButtonClick} primaryBtn ></AppButton>}

          {buttonTitle && <AppButton buttonTitle={buttonTitle} buttonOnClick={buttonOnClick} primaryBtn ></AppButton>}

          

          {forGroup && <AppButton buttonTitle={forGroup} buttonOnClick={forGroupButtonClick} primaryBtn ></AppButton>}

          {
            csvDataName &&
            <div className='link'>
              <CSVLink filename={csvDataName} className="btn ant-btn btn-primary btn-primary--outline" data={csvData}>{csvLinkTitle}</CSVLink>
             
            </div>
          }

          {/* {
            goodsOut &&
            <div className='link'>
              <CSVLink filename={"goodsOut.csv"} className="btn ant-btn btn-primary btn-primary--outline" data={goodsOut}>{csvLinkTitle}</CSVLink>
              
            </div>
          } */}

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
