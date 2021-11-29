import { Button } from 'antd/lib/radio'
import React from 'react'
import styled from 'styled-components'

const AppButton = (props) => {
  return (
    <AppButtonContainer>
      <Button className='primary-btn' shape="circle" onClick={props.buttonOnClick}>
        {props.buttonTitle}
      </Button>
    </AppButtonContainer>
  )
}

export default AppButton

const AppButtonContainer = styled.div`
  .primary-btn{
  background-color: #1890ff;
  color: #fefefe;
  border-radius: 20px!important;
  height: 40px;
  display: flex;
  align-items: center;
  font-size: 16px;
  letter-spacing: 1.3px;
  font-weight: 400;
  text-transform: capitalize;
 
}
`
