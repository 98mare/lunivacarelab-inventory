import React from 'react'
import { DatePicker, Space } from 'antd';

const { RangePicker } = DatePicker;

const Datepicker = (props) => {
  const {onChanger} = props
  return (
    <>
      <Space direction="vertical" size='large'>
        <RangePicker onChange={onChanger}  size= "large"/>
      </Space>
    </>
  )
}

export default Datepicker
