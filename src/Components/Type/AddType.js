import { Form, Input, Button, Checkbox, message, Row, Col } from 'antd';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import styled from 'styled-components';
import { insertItemTypeApi } from '../../services/itemItemTypeService';

const AddType = (props) => {
  const {forEdit} = props;
  const dispatch = useDispatch();
  const [butDis, setButDis] = useState(false);
  const TId = props?.match?.params?.id;

  const onFinish = (values) => {
    setButDis(true)
    let data = {
      "TId": forEdit ? TId : 0,
      "ItemType": values?.item_type_name,
      "IsActive": values?.isactive
    }
    dispatch(insertItemTypeApi(data, (res) => {
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
    <AddTypeContainer>
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
              label="Item Type name"
              name="item_type_name"
              rules={[
                {
                  required: true,
                  message: 'Please input item type name!',
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
                {forEdit ? 'edit': 'Submit'}
              </Button>
            </Form.Item>
          </Form>
        </Col>

      </Row>
    </AddTypeContainer>
  );
};

export default AddType;

const AddTypeContainer = styled.div`
  background-color: #fefefe;
  padding-top: 30px;
`