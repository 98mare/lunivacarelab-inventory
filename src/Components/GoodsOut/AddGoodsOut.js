import { Form, Input, Button, DatePicker, Select, InputNumber, message, Row, Col, Checkbox } from 'antd';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import { getLabItemsApi } from '../../services/itemNewItemService';
import { getGoodsOutApi, insertGoodsOutApi } from '../../services/labGoodsOutService';
import { getTestListApi } from '../../services/itemVsRatioService';
import moment from 'moment';
import { tokenString } from '../Common/HandleUser';
import { SearchSelect } from '../Common/SearchSelect';

const AddGoodsOut = (props) => {
  const { forEdit } = props
  const { Option } = Select;
  const { TextArea } = Input;
  const [form] = Form.useForm()
  const dispatch = useDispatch();
  const [butDis, setButDis] = useState(false);
  const [itemList, setitemList] = useState([])
  const [testList, settestList] = useState([])
  const GOId = props?.match?.params?.id;
  const fromDat = props?.match?.params?.from;
  const goodsOutReducer = useSelector(state => state.goodsout);
  const [previousValues, setPreviousValues] = useState(forEdit ? goodsOutReducer?.goodsOuts[GOId] : {});

  const formItemLayout = {
    labelCol: {
      xs: { span: 24 },
      sm: { span: 24 },
      md: { span: 6 },
    },
    wrapperCol: {
      xs: { span: 24 },
      sm: { span: 24 },
      md: { span: 10 },
    },
  };

  const dateFormat = 'YYYY-MM-DD';

  useEffect(() => {
    if (forEdit && previousValues === undefined) {
      dispatch(getGoodsOutApi({ fromdate: fromDat, todate: fromDat }, (val) => { }))
    }
    getAllLabItem()
  }, [])

  useEffect(() => {
    setPreviousValues(goodsOutReducer?.goodsOuts[GOId]);
  }, [goodsOutReducer?.goodsOuts[GOId]])

  useEffect(() => {
    if (previousValues !== undefined) {
      form.resetFields()
    }
  }, [previousValues])

  const getAllLabItem = (ty = 0, cI = 0) => {
    let data = {
      typeId: ty,
      categoryId: cI
    }
    dispatch(getLabItemsApi(data, (val) => {
      setitemList(val)
    }))

    dispatch(getTestListApi((val) => {
      settestList(val)
    }))
  }

  const onFinish = (values) => {
    setButDis(true)
    let data = {
      "GOId": forEdit ? GOId : 0,
      "TestId": values?.TestId,
      "ItemId": values?.ItemId,
      "GoodReceivedNo": values?.GoodReceivedNo,
      "Quantity": values?.Quantity,
      "UserId": tokenString.UId,
      "GoodsOutDate": values?.GoodsOutDate.format('YYYY-MM-DD'),
      "IsActive": values?.IsActive,
      "Remarks": values?.Remarks
    }
    dispatch(insertGoodsOutApi(data, (res) => {
      if (res?.CreatedId > 0 && res?.SuccessMsg === true) {
        message.success(res?.Message)
        setTimeout(() => {
          window.location.reload(false);
        }, 1000);
      } else {
        setButDis(false)
        message.error('Something went wrong Try again')
      }
    }))
  };

  const onFinishFailed = (errorInfo) => {
    setButDis(false)
  };

  let prevVal = {}
  if (previousValues !== undefined) {
    prevVal = {
      ...previousValues,
      GoodsOutDate: moment(previousValues?.GoodsOutDate)
    }
  }

  /*
  labelCol={{
                span: 6,
              }}
              wrapperCol={{
                span: 6
              }}*/

  return (
    <AddGoodsOutContainer>
      <Row justify='center'>
        <Col span={16}>
          <Form
            form={form}
            name="add_items"
            {...formItemLayout}
            labelAlign="left"
            colon={false}
            initialValues={prevVal}
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
            autoComplete="off"
          >

            <Form.Item
              label="Test"
              name="TestId"
              rules={[
                {
                  required: true,
                  message: 'Please input Test!',
                },
              ]}
            >

              <SearchSelect itemList={testList?.map(iTy => {
                return (
                  <Option
                    title={iTy?.Testname}
                    key={iTy?.Id}
                    value={iTy?.Id}>
                    {iTy?.Testname}
                  </Option>
                )
              })
              }
                placer='Select a test'
              />
            </Form.Item>
            <Form.Item
              label="Item Name"
              name="ItemId"
              rules={[
                {
                  required: true,
                  message: 'Please input item name!',
                },
              ]}
            >
              <SearchSelect itemList={itemList?.map(iTy => {
                return (
                  <Option
                    title={iTy?.ItemName}
                    key={iTy?.TId}
                    value={iTy?.TId}>
                    {iTy?.ItemName}
                  </Option>
                )
              })
              }
                placer='Select an item'
              />
            </Form.Item>

            <Form.Item
              label="Goods Received No"
              name="GoodReceivedNo"
              rules={[
                {
                  required: true,
                  message: 'Please input Goods Received No!',
                },
              ]}
            >
              <InputNumber
                style={{ width: '100%' }}
              />
            </Form.Item>

            <Form.Item
              label="Quantity"
              name="Quantity"
              rules={[
                {
                  required: true,
                  message: 'Please input quantity!',
                },
              ]}
            >
              <InputNumber
                style={{ width: '100%' }}
              />
            </Form.Item>

            <Form.Item
              label="Goods out Date"
              name="GoodsOutDate"
              rules={[
                {
                  required: true,
                  message: 'Please input Goods out Date!',
                },
              ]}
            >
              <DatePicker
                style={{ width: '100%' }}
                format={dateFormat}
              />
            </Form.Item>

            <Form.Item
              label="Remarks"
              name="Remarks"
              rules={[
                {
                  required: true,
                  message: 'Please input Remarks!',
                },
              ]}
            >
              <TextArea />
            </Form.Item>

            <Form.Item
              name="IsActive"
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
    </AddGoodsOutContainer>
  );
};

export default AddGoodsOut;

const AddGoodsOutContainer = styled.div`
  background-color: #fefefe;
  padding-top: 30px;
`