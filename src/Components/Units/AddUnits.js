import { Form, Input, Button, message, Row, Col, Checkbox } from 'antd';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import styled from 'styled-components';
import { insertItemUnitApi } from '../../services/itemUnitService';

const AddUnits = () => {
  const dispatch = useDispatch();
  const [butDis, setButDis] = useState(false);

  const onFinish = (values) => {
    setButDis(true)
    let data = {
      "UnId": 0,
      "Units": values?.unit_name,
      "IsActive": values?.isactive
    }
    dispatch(insertItemUnitApi(data, (res) => {
      if (res?.CreatedId > 0 && res?.SuccessMsg === true) {
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
    <AddUnitsContainer>
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
              label="Unit Name"
              name="unit_name"
              rules={[
                {
                  required: true,
                  message: 'Please input unit name!',
                },
              ]}
            >
              <Input/>
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
              <Button  htmlType="submit" disabled={butDis} className='btnPrimary'>
                Submit
              </Button>
            </Form.Item>
          </Form>
        </Col>

      </Row>
    </AddUnitsContainer>
  );
};

export default AddUnits;

const AddUnitsContainer = styled.div`
  background-color: #fefefe;
  padding-top: 30px;
`