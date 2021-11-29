import { Button } from 'antd/lib/radio'
import React from 'react'

const AppButton = (props) => {
  return (
    <Button className='btn-primary' type="primary" shape="circle" onClick={props.buttonOnClick} >
      {props.buttonTitle}
    </Button>
  )
}

export default AppButton
