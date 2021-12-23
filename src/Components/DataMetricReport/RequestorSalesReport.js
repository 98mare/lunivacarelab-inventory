import React, { useState } from "react"
import { useDispatch } from "react-redux"
import Filter from '../Common/Filter'
import PageHeader from '../Common/pageHeader'
import { getRequestorTotalSalesReport } from "../../services/datametricService";
import { Table } from "antd";

const RequestorSalesReport = () => {
    const dispatch = useDispatch();
    const [testData, setTestData] = useState([]);

    const columns = [
        {
            title: 'Requestor',
            dataIndex: 'Requestor',
            key: 'Requestor',
        },
        {
            title: 'Total Price',
            dataIndex: 'TotalPrice',
            key: 'TotalPrice',
        },
        {
            title: 'Discount Total',
            dataIndex: 'DiscountTotal',
            key: 'DiscountTotal',
        },
        {
            title: 'Actual Total',
            dataIndex: 'ActualTotal',
            key: 'ActualTotal',
        },
    ]

    const getDataForReport = (data) => {
        dispatch(getRequestorTotalSalesReport(data, (val) => {
            setTestData(val)
        }))
    }

    const dataRet = (val) => {
        let data = {
            fromdate: val[0].format("YYYY-MM-DD"),
            todate: val[1].format("YYYY-MM-DD"),
        }
        getDataForReport(data)
    }

    return (
        <>
            <PageHeader
                pageTitle='Requestor Total Sales Summary'
            />
            <Filter
                dateRange
                dateRet={dataRet}
                serchButton
            />
            <Table
                columns={columns}
                dataSource={testData}
            />
        </>
    )
}

export default RequestorSalesReport