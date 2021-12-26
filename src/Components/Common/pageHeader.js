import { Row } from 'antd'
import React from 'react'
import styled from 'styled-components'
import AppButton from './AppButton'
import { CSVLink } from 'react-csv';
import { Link, useHistory } from 'react-router-dom';
import { useState } from 'react';
import PrintFile from './PritFile';

const PageHeader = ({ pageTitle, buttonTitle, buttonOnClick, csvLinkTitle, csvDataName, csvData, forGroup, forGroupButtonClick, forCon, forConButtonClick, printFileName,
  printTitle,
  getDate,
  tableHead,
  dataSource }) => {

    // console.log(getDate);

  const [printData, setprintData] = useState({});
  // const printDataFunction =() => {
  //   let arr = [printTitle, getDate, tableHead, dataSource]
  //   setprintData(arr)
  // }\
  // console.log(dataSource);
  
  // useState(()=> {
  //   let arr = {printTitle, getDate, tableHead, dataSource}
  //   setprintData(arr)
  // }, [dataSource])

  // console.log('this is pirt data',printData);

  return (
    <PageHeaderContainer>
      <Row justify='space-between align-center'>
        <span className='pageTtitle'>{pageTitle}</span>
        <Row style={{ gap: '10px' }}>
          {forCon && <AppButton buttonTitle={forCon} buttonOnClick={forConButtonClick} primaryBtn ></AppButton>}

          {buttonTitle && <AppButton buttonTitle={buttonTitle} buttonOnClick={buttonOnClick} primaryBtn ></AppButton>}

          {forGroup && <AppButton buttonTitle={forGroup} buttonOnClick={forGroupButtonClick} primaryBtn ></AppButton>}

          {
            csvDataName &&
            <div className='link'>
              <CSVLink filename={csvDataName} className="btn ant-btn btn-primary btn-primary--outline" data={csvData}>{csvLinkTitle}</CSVLink>
            </div>
          }

          {
            printFileName &&
            <div className='link'>
              <Link filename={printFileName} className="btn ant-btn btn-primary btn-primary--outline" 
              to='/printfile'
              // target={"_blank"}
              // rel="noopener noreferrer"
                // printData={printData}
              >print</Link>
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
