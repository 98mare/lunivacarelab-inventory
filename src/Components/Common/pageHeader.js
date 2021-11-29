import { Button, Col, Row } from 'antd'
import React from 'react'
import styled from 'styled-components'
import AppButton from './AppButton'

const pageHeader = ({pageTitle,buttonTitle,buttonOnClick}) => {
  return (
    <PageHeaderContainer>
      <Row justify='space-between align-center'>
        <span>{pageTitle}</span>
        <Row>
          {buttonTitle && <AppButton buttonTitle={buttonTitle} buttonOnClick={buttonOnClick} ></AppButton>}
          
        </Row>
      </Row>
    </PageHeaderContainer>
  )
}

export default pageHeader

const PageHeaderContainer = styled.div`
  background-color: #fefefe;
  height: 100px;
  width: 100%;
`
