import { Form, Input, Button, DatePicker, Select, InputNumber, message, Row, Col, Switch, Modal, notification } from 'antd';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import { getLabItemsApi } from '../../services/itemNewItemService';
import { getGoodsOutApi, insertGoodsOutApi } from '../../services/labGoodsOutService';
import { getTestListApi } from '../../services/itemVsRatioService';
import moment from 'moment';
import { useHistory } from 'react-router-dom';
import { tokenString } from '../Common/HandleUser';
import { getGoodsInByIdApi } from '../../services/labGoodsReceivedService';
import CustomModal from '../Common/CustomModal';
// import { SearchSelect } from '../Common/SearchSelect';

const AddGoodsOut = (props) => {
  const { forEdit } = props
  const { Option } = Select;
  const { TextArea } = Input;
  const [form] = Form.useForm()
  const dispatch = useDispatch();
  const history = useHistory();
  const [butDis, setButDis] = useState(false);
  const [itemList, setitemList] = useState([])
  const [testList, settestList] = useState([])
  const [recNo, setrecNo] = useState('');
  const [goodsRecList, setgoodsRecList] = useState([]);

  const [visible, setVisible] = useState(false);
  // const [confirmLoading, setConfirmLoading] = useState(false);
  const [maxer, setMaxer] = useState(0);

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
    getAllLabItem()
    if (forEdit && previousValues === undefined) {
      dispatch(getGoodsOutApi({ fromdate: fromDat, todate: fromDat }, (val) => { }))
    }
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
    // setButDis(true)
    let data = {
      "GOId": forEdit ? GOId : 0,
      "TestId": values?.TestId,
      "ItemId": values?.ItemId,
      "GoodReceivedNo": values?.GoodReceivedNo,
      "Quantity": values?.Quantity,
      "UserId": tokenString.UId,
      "GoodsOutDate": values?.GoodsOutDate.format('YYYY-MM-DD'),
      "IsActive": forEdit ? false : (values?.IsActive === undefined || values?.IsActive === true ? true : false),
      "Remarks": values?.Remarks
    }
    console.log(data);return;
    dispatch(insertGoodsOutApi(data, (res) => {
      if (res?.CreatedId > 0 && res?.SuccessMsg === true) {
        message.success(res?.Message)
        setTimeout(() => {
          history.push('/goodsout')
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

  useEffect(() => {
    if (recNo !== 0 && recNo !== undefined && recNo !== '') {
      dispatch(getGoodsInByIdApi(recNo, (val) => {
        setgoodsRecList(val);
        if (val.length > 1) {
          showModal()
        } else {
          form.setFieldsValue({
            GoodReceivedNo: val[0]?.GoodsInId,
            Quantity: val[0]?.RemainingCount
          });
          setMaxer(val[0]?.RemainingCount)
        }
      }))
    }
  }, [recNo])

  const showModal = () => {
    setVisible(true);
  };

  // const handleOk = () => {
  //   setConfirmLoading(true);
  //   setTimeout(() => {
  //     setVisible(false);
  //     setConfirmLoading(false);
  //   }, 2000);
  // };

  const handleCancel = () => {
    setVisible(false);
  };

  const retSelData = (val) => {
    form.setFieldsValue({
      GoodReceivedNo: val?.goodId,
      Quantity: val?.remCount
    });
    setMaxer(val?.remCount)
    setVisible(false);
  }

  const handleMaxCount = (val) => {
    if(val > Number(maxer)){
      openNotification(val)
      form.setFieldsValue({
        Quantity: maxer
      });
    }
  }

  const openNotification = (val) => {
    notification.open({
      message: 'Quantity going over',
      description:
        `Remaining count is ${maxer}, Entered Quantity is ${val}`,
      onClick: () => {
        console.log('Notification Clicked!');
      },
    });
  };

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
            // onChangeCapture={handleMaxCount}
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

              <Select
                showSearch
                optionFilterProp="children"
                placeholder="Select a test"
                filterOption={(input, option) => {
                  return (
                    option.key.toLowerCase().indexOf(input.toLowerCase()) >= 0 ||
                    option.title.toLowerCase().indexOf(input.toLowerCase()) >= 0
                  );
                }}
                allowClear>
                {testList?.map(iTy => {
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
              </Select>
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
              <Select
                showSearch
                optionFilterProp="children"
                placeholder="Select an item"
                filterOption={(input, option) => {
                  return (
                    option.key.toLowerCase().indexOf(input.toLowerCase()) >= 0 ||
                    option.title.toLowerCase().indexOf(input.toLowerCase()) >= 0
                  );
                }}
                onChange={(e) => setrecNo(e)}
                allowClear>
                {itemList?.map(iTy => {
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
              </Select>
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
                readOnly={true}
                tabIndex={-1}
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
                min={0}
                // max={maxer}
                onChange={handleMaxCount}
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
              label='Is Active'
              name="IsActive"
              valuePropName="checked"
              offset={3}
            >
              <Switch disabled={forEdit ? true : false} defaultChecked />
            </Form.Item>

            <Form.Item
              wrapperCol={{
                offset: 8,
                span: 16,
              }}
            >
              <Button htmlType="submit" disabled={butDis} className='btnPrimary'>
                {forEdit ? 'Cancel' : 'Submit'}
              </Button>
            </Form.Item>
          </Form>
        </Col>

      </Row>

      <CustomModal
        visible={visible}
        // onOk={handleOk}
        // confirmLoading={confirmLoading}
        onCancel={handleCancel}
        goodsRecList={goodsRecList}
        retSelData={retSelData}
      />

    </AddGoodsOutContainer>
  );
};

export default AddGoodsOut;

const AddGoodsOutContainer = styled.div`
  background-color: #fefefe;
  padding-top: 30px;
`