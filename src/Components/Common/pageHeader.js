import { Button, Col, Row } from 'antd'
import React from 'react'
import styled from 'styled-components'

const pageHeader = () => {
  return (
    <PageHeaderContainer>
      <Row>
        <Col span={8}>
          <h1>DashBoard</h1>
        </Col>
        
        <Col span={8} offset={8}> col-11</Col>
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
