import { Button } from 'antd/lib/radio'
import React from 'react'

const AppButton = (props) => {
  return (
    <Button className='.primary-btn' shape="circle" onClick={props.buttonOnClick} >
      {props.buttonTitle}
    </Button>
  )
}

export default AppButton
