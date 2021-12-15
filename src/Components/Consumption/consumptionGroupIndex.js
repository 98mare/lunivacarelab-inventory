import { Space, Table, Tag } from 'antd'
import React, { useEffect, useState } from 'react'
import { useHistory } from 'react-router-dom'
import styled from 'styled-components'
import { useDispatch } from 'react-redux';
import PageHeader from '../Common/pageHeader'
import Edit from '../Common/Edit';
import { consumptionGroupApi } from '../../services/consumptionService';

const ConsumptionGroupIndex = () => {
    const history = useHistory();
    const dispatch = useDispatch();
    const [goodsList, setgoodsList] = useState([])

    const columns = [
        {
            title: 'CG Id',
            dataIndex: 'CGId',
            key: 'CGId',
        },
        {
            title: 'Consumption Group Name',
            dataIndex: 'ConsumptionGroupName',
            key: 'ConsumptionGroupName',
        },
        {
            title: 'Is Active',
            dataIndex: 'IsActive',
            key: 'IsActive',
            render: (text) => {
                let retText = 'Inactive'
                let retColor = 'red'
                if (text === true) {
                    retText = 'Active'
                    retColor = 'green'
                }
                return <Tag color={retColor}>{retText}</Tag>
            },
        },
        {
            title: 'Action',
            key: 'action',
            render: (text, record) => (
                <Space size="middle">
                    <Edit onClick={() => history.push(`/consumption/edit/${record.CGId}`)}>Edit</Edit>
                </Space>
            )
        }
    ]

    useEffect(() => {
        getLabData()
    })

    const getLabData = () => {
        dispatch(consumptionGroupApi((val) => {
            setgoodsList(val)
        }))
    }

    return (
        <ConsumptionGroupIndexContainer>
            <PageHeader
                buttonTitle='Add Group'
                pageTitle='Consumption Group'
                buttonOnClick={() => history.push('/consumption/add')}
            />
            <div className="tableisRes">
                <Table className='tableWidth'
                    columns={columns}
                    dataSource={goodsList}
                />
            </div>

        </ConsumptionGroupIndexContainer>
    )
}

export default ConsumptionGroupIndex

const ConsumptionGroupIndexContainer = styled.div`
  background: rgba( 255, 255, 255, 0.25 );
  box-shadow: 0 2px 22px 0 rgba( 31, 38, 135, 0.10 );
  backdrop-filter: blur( 4px );
  -webkit-backdrop-filter: blur( 4px );
  border-radius: 10px;
  border: 1px solid rgba( 255, 255, 255, 0.18 );
  overflow: hidden;
  margin-bottom: 50px;

  .tableWidth{
    width: auto;
  }
`