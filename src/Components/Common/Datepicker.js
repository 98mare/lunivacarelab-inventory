import React from 'react'
import { DatePicker, Space } from 'antd';
// import moment from 'moment';

const { RangePicker } = DatePicker;

const Datepicker = (props) => {
  const {defaultValuer, onChanger} = props
  return (
    <>
      <Space direction="vertical" size='large'>
        <RangePicker defaultValue={defaultValuer} onChange={onChanger}  size= "large"/>
      </Space>
    </>
  )
}

export default Datepicker
