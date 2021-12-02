import { Form, Input, Button, message, Row, Col, Checkbox } from 'antd';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import { getItemUnitApi, insertItemUnitApi } from '../../services/itemUnitService';

const AddUnits = (props) => {
  const { forEdit } = props;
  const dispatch = useDispatch();
  const [butDis, setButDis] = useState(false);
  const [previousValues, setPreviousValues] = useState(forEdit ? {unit_name: '123'} : {});
  const unId = props?.match?.params?.id;

  useEffect(() => {
    if(forEdit && previousValues === undefined){
      dispatch(getItemUnitApi((val) => {
        setPreviousValues(val[0]);
      }, unId));
    }
  }, [])

  const onFinish = (values) => {
    setButDis(true)
    let data = {
      "UnId": forEdit ? unId : 0,
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
            initialValues={previousValues}
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
              <Button htmlType="submit" disabled={butDis} className='btnPrimary'>
                {forEdit ? 'Edit' : 'Submit'}
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