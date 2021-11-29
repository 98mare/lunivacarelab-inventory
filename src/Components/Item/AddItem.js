import { Form, Input, Button, Checkbox, Select, InputNumber, message, Row, Col  } from 'antd';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import styled from 'styled-components';
import { insertNewItemDetailsApi } from '../../services/itemNewItemService';

const AddItem = () => {
  const { Option } = Select;
  const dispatch = useDispatch();
  const [butDis, setButDis] = useState(false);

  const onFinish = (values) => {
    setButDis(true)
    let data = {
      "TId": 0,
      "ItemCode": values?.item_code,
      "ItemName": values?.item_name,
      "ItemTypeId": values?.item_type,
      "ItemCategoryId": values?.item_category,
      "UnitId": values?.item_unit,
      "ManufactureId": values?.item_manufacturer,
      "LocationId": values?.location,
      "RackId": values?.item_rack,
      "MinQty": values?.min_qty,
      "CreatedBy": 1, //needs login userid
      "CreatedDate": '2021-11-29', //default date for now update
      "IsActive": values?.isactive
    }
    dispatch(insertNewItemDetailsApi(data, (res) => {
      if(res?.CreatedId > 0 && res?.SuccessMsg == true){
        message.success(res?.Message)
        setTimeout(() => {
          window.location.reload(false);
        }, 1000);
      }else{
        setButDis(true)
        message.error(res?.Message)
      }
    }))
  };

  const onFinishFailed = (errorInfo) => {
    setButDis(false)
  };

  return (
    <AddItemContainer>
      <Row justify='center'>
        <Col span={16}>
          <Form
          name="add_items"
          labelCol={{
            span: 6,
          }}
          wrapperCol={{
            span: 18
          }}
          initialValues={{
            remember: true,
          }}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          autoComplete="off"
        >
          <Form.Item
            label="Item Code"
            name="item_code"
            rules={[
              {
                required: true,
                message: 'Please input item code!',
              },
            ]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Item name"
            name="item_name"
            rules={[
              {
                required: true,
                message: 'Please input item name!',
              },
            ]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Item Type"
            name="item_type"
            rules={[
              {
                required: true,
                message: 'Please select item type!',
              },
            ]}
          >
            <Select allowClear>
              <Option value="1">Test</Option>
            </Select>
          </Form.Item>

          <Form.Item
            label="Item Category"
            name="item_category"
            rules={[
              {
                required: true,
                message: 'Please select item category!',
              },
            ]}
          >
            <Select allowClear>
              <Option value="1">Test</Option>
            </Select>
          </Form.Item>

          <Form.Item
            label="Item unit"
            name="item_unit"
            rules={[
              {
                required: true,
                message: 'Please select item unit!',
              },
            ]}
          >
            <Select allowClear>
              <Option value="1">Test</Option>
            </Select>
          </Form.Item>

          <Form.Item
            label="Item manufacturer"
            name="item_manufacturer"
            rules={[
              {
                required: true,
                message: 'Please select item manufacturer!',
              },
            ]}
          >
            <Select allowClear>
              <Option value="1">Test</Option>
            </Select>
          </Form.Item>

          <Form.Item
            label="Location"
            name="location"
            rules={[
              {
                required: true,
                message: 'Please select Location!',
              },
            ]}
          >
            <Select allowClear>
              <Option value="1">Test</Option>
            </Select>
          </Form.Item>

          <Form.Item
            label="Rack"
            name="item_rack"
            rules={[
              {
                required: true,
                message: 'Please select rack!',
              },
            ]}
          >
            <Select allowClear>
              <Option value="1">Test</Option>
            </Select>
          </Form.Item>

          <Form.Item
            label="Min Qty"
            name="min_qty"
            rules={[
              {
                required: true,
                message: 'Please input minimum quantity!',
              },
            ]}
          >
            <InputNumber />
          </Form.Item>

          <Form.Item
            name="isactive"
            valuePropName="checked"
          >
            <Checkbox>Is Active</Checkbox>
          </Form.Item>

          <Form.Item
            wrapperCol={{
              offset: 8,
              span: 16,
            }}
          >
            <Button type="primary" htmlType="submit" disabled={butDis}>
              Submit
            </Button>
          </Form.Item>
          </Form>
        </Col>
      
      </Row>
    </AddItemContainer>
  );
};

export default AddItem;

const AddItemContainer = styled.div`
  background-color: #fefefe;
  padding-top: 30px;
`