import React, { useState } from "react";
import { useDispatch } from "react-redux";
import Filter from '../Common/Filter'
import PageHeader from '../Common/pageHeader'
import { getDailySummaryReport } from "../../services/datametricService";
import { Table, Tag } from "antd";

const DailySummary = () => {
    const dispatch = useDispatch();
    const [testData, setTestData] = useState([]);

    const columns = [
        {
            title: 'User Name',
            dataIndex: 'UserName',
            key: 'UserName',
        },
        {
            title: 'Total Sales',
            dataIndex: 'TotalSales',
            key: 'TotalSales',
        },
        {
            title: 'Collection',
            dataIndex: 'Collection',
            key: 'Collection',
        },
        {
            title: 'Remaining',
            dataIndex: 'Remaining',
            key: 'Remaining',
        },
        {
            title: 'Payment Type',
            dataIndex: 'PaymentType',
            key: 'PaymentType',
            render: (text) => {
                let retColor = ''
                if (text !== null) {
                    if (text.toLowerCase() == 'cash')
                        retColor = 'green'
                    else if (text.toLowerCase() == 'card')
                        retColor = 'blue'
                    else if (text.toLowerCase() == 'due' || text.toLowerCase() == 'duecollection')
                        retColor = 'yellow'
                    else if (text.toLowerCase() == 'credit' || text.toLowerCase() == 'creditcollection')
                        retColor = 'red'
                }
                return <Tag color={retColor}>{text}</Tag>
            }
        },
    ]

    const getDataForReport = (data) => {
        dispatch(getDailySummaryReport(data, (val) => {
            setTestData(val)
        }))
    }

    const dataRet = (val) => {
        let data = {
            ...val,
            fromdate: val[0].format("YYYY-MM-DD"),
            todate: val[1].format("YYYY-MM-DD"),
        }
        getDataForReport(data)
    }

    return (
        <>
            <PageHeader
                pageTitle='Daily Summary Report'
            />
            <Filter
                dateRange
                dateRet={dataRet}
                serchButton
                getuserslist
            />
            <Table
                columns={columns}
                dataSource={testData}
            />
        </>
    )
}

export default DailySummary