import React, { useState } from "react";
import { useDispatch } from "react-redux";
import Filter from '../Common/Filter'
import PageHeader from '../Common/pageHeader'
import { getDailyTransactionReport } from "../../services/datametricService";
import { Table } from "antd";

const DailyTransaction = () => {
    const dispatch = useDispatch();
    const [testData, setTestData] = useState([]);

    const columns = [
        {
            title: 'Name',
            dataIndex: 'FirstName',
            key: 'Name',
            render: (text, record) => {
                return `${text} ${record.MiddleName} ${record.LastName}`
            }
        },
        {
            title: 'Name',
            dataIndex: 'FirstName',
            key: 'Name',
        },
    ]

    const getDataForReport = (data) => {
        dispatch(getDailyTransactionReport(data, (val) => {
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
                pageTitle='Daily Transaction Report'
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

export default DailyTransaction