import { Button, Col, Row } from 'antd'
import React from 'react'
import styled from 'styled-components'
import AppButton from './AppButton'
import { CSVLink } from 'react-csv';
import { useSelector } from 'react-redux';
import GoodsInCSV from './ExportsCsv/GoodsInCSV';


const PageHeader = ({pageTitle,buttonTitle,buttonOnClick, csvLinkTitle, goodsIn}) => {



  const itemReducer = useSelector((state) => state.goodsin);
  // console.log(itemReducer)
  const proRed = (value) => {
    let newArr = [];
    for (const key in value) {
      if (Object.hasOwnProperty.call(value, key)) {
        const ele = value[key];
        newArr.push(ele)
      }
    }
    // console.log("new aray" , newArr);
    return newArr;
  
  }
  let data = proRed(itemReducer?.goodsin);

  return (
    <PageHeaderContainer>
      <Row justify='space-between align-center'>
        <span className='pageTtitle'>{pageTitle}</span>
        <Row>
          {buttonTitle && <AppButton buttonTitle={buttonTitle} buttonOnClick={buttonOnClick} ></AppButton>}

          {
            csvLinkTitle && 
            <div className='link'>
            <CSVLink filename={"sample-quote.csv"} className="btn ant-btn btn-primary btn-primary--outline" data={data}>{csvLinkTitle}</CSVLink>
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
