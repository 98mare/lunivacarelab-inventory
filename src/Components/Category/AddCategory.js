import { Form, Input, Button, Checkbox, Select, InputNumber, message, Row, Col } from 'antd';
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import { getItemCategoryApi, insertItemCategoryApi } from '../../services/itemCategoryService';
import AppButton from '../Common/AppButton';

const AddCategory = (props) => {
  const {forEdit} = props;
  const { Option } = Select;
  const dispatch = useDispatch();
  const [butDis, setButDis] = useState(false);
  const CuId = props?.match?.params?.id;
  const category = useSelector(state => state.category)
  const [previousValues, setpreviousValues] = useState(forEdit ? category?.category[CuId] : {})

  useEffect(() => {
    if(forEdit && previousValues === undefined){
      dispatch(getItemCategoryApi((val) => {
        setpreviousValues(val[0])
      }, CuId))
    }
  }, [])

  useEffect(() => {
    console.log('asdf');
    setpreviousValues(category?.category[CuId])
  }, [category?.category[CuId]])

  const onFinish = (values) => {
    setButDis(true)
    let data = {
      "CId": forEdit ? CuId : 0,
      "CategoryType": values?.cate_type,
      "IsActive": values?.isactive
    }
    dispatch(insertItemCategoryApi(data, (res) => {
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
let prevVal = {}
if(previousValues !== undefined){
  prevVal = {
    ...previousValues,
  cate_type: previousValues['CategoryType']
  }
}
  return (
    <AddCategoryContainer>
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
            initialValues={prevVal}
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
            autoComplete="off"
          >
            <Form.Item
              label="Category Type"
              name="cate_type"
              rules={[
                {
                  required: true,
                  message: 'Please input category type!',
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
    </AddCategoryContainer>
  );
};

export default AddCategory;

const AddCategoryContainer = styled.div`
  background-color: #fefefe;
  padding-top: 30px;
`