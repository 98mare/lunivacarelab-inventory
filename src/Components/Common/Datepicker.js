import React from 'react'
import { DatePicker, Space } from 'antd';

const { RangePicker } = DatePicker;

const Datepicker = () => {
  return (
    <>
      <Space direction="vertical" size='large'>
        <RangePicker  size= "large"/>
      </Space>
    </>
  )
}

export default Datepicker
