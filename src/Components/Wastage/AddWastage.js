import { Form, Input, Button, DatePicker, Select, InputNumber, message, Row, Col } from 'antd';
import { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import styled from 'styled-components';
import { getLabItemsApi } from '../../services/itemNewItemService';
import { insertWastageApi } from '../../services/wastageService';
import moment from 'moment';

const AddWastage = () => {
  const { Option } = Select;
  const { TextArea } = Input;
  const dispatch = useDispatch();
  const [butDis, setButDis] = useState(false);
  const [itemList, setItemList] = useState([])

  useEffect(() => {
    getAllLabItem()
  }, [])


  const getAllLabItem = (ty = 0, cI = 0) => {
    let data = {
      typeId: ty,
      categoryId: cI
    }
    dispatch(getLabItemsApi(data, (val) => {
      setItemList(val)
    }))
  }


  const onFinish = (values) => {
    setButDis(true)
    let data = {
      "WId": 0,
      "ItemId": values?.item_name,
      "WastageAmount": values?.wastage_amount,
      "Reason": values?.reason,
      "Remarks": values?.remarks,
      "CreatedDate": values?.created_date.format("YYYY-MM-DD"),
      "CreatedBy": 1
    }
    dispatch(insertWastageApi(data, (res) => {
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
    <AddWastageContainer>
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
              label="Item Name"
              name="item_name"
              rules={[
                {
                  required: true,
                  message: 'Please select item name!',
                },
              ]}
            >
              <Select allowClear>
                {itemList?.map(iTy => {
                  return (
                    <Option value={iTy?.TId}>
                      {iTy?.ItemName}
                    </Option>
                  )
                })
                }
              </Select>
            </Form.Item>

            <Form.Item
              label="Wastage Amount"
              name="wastage_amount"
              rules={[
                {
                  required: true,
                  message: 'Please input wastage number!',
                },
              ]}
            >
              <InputNumber />
            </Form.Item>

            <Form.Item
              label="Reason"
              name="reason"
              rules={[
                {
                  required: true,
                  message: 'Please input reason!',
                },
              ]}
            >
              <TextArea />
            </Form.Item>

            <Form.Item
              label="Remarks"
              name="remarks"
              rules={[
                {
                  required: true,
                  message: 'Please input remarks!',
                },
              ]}
            >
              <TextArea />
            </Form.Item>

            <Form.Item
              label="Created Date"
              name="created_date"
              rules={[
                {
                  required: true,
                  message: 'Please input created Date!',
                },
              ]}
            >
              <DatePicker format='YYYY-MM-DD' />
            </Form.Item>

            <Form.Item
              wrapperCol={{
                offset: 8,
                span: 16,
              }}
            >
              <Button htmlType="submit" disabled={butDis} className='btnPrimary'>
                Submit
              </Button>
            </Form.Item>
          </Form>
        </Col>

      </Row>
    </AddWastageContainer>
  );
};

export default AddWastage;

const AddWastageContainer = styled.div`
  background-color: #fefefe;
  padding-top: 30px;
`