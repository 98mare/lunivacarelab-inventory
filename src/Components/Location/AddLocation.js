import { Form, Input, Button, Checkbox, Select, InputNumber, message, Row, Col } from 'antd';
import { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import styled from 'styled-components';
import { insertLocationApi } from '../../services/itemLocationService';

const AddLocation = () => {
  const { Option } = Select;
  const dispatch = useDispatch();
  const [butDis, setButDis] = useState(false);

  const onFinish = (values) => {
    setButDis(true)
    let data = {
      "LId": 0,
      "LCode": values?.lcode,
      "Location": values?.location_name,
      "IsActive": values?.isactive
    }
    dispatch(insertLocationApi(data, (res) => {
      if (res?.CreatedId > 0 && res?.SuccessMsg == true) {
        message.success(res?.Message)
        setTimeout(() => {
          window.location.reload(false);
        }, 1000);
      } else {
        setButDis(true)
        message.error(res?.Message)
      }
    }))
  };

  const onFinishFailed = (errorInfo) => {
    setButDis(false)
  };

  return (
    <AddLocationContainer>
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
              label="Location Code"
              name="lcode"
              rules={[
                {
                  required: true,
                  message: 'Please input location code!',
                },
              ]}
            >
              <Input />
            </Form.Item>

            <Form.Item
              label="Location name"
              name="location_name"
              rules={[
                {
                  required: true,
                  message: 'Please input Location name!',
                },
              ]}
            >
              <Input />
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
    </AddLocationContainer>
  );
};

export default AddLocation;

const AddLocationContainer = styled.div`
  background-color: #fefefe;
  padding-top: 30px;
`