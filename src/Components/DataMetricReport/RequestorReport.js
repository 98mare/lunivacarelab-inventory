import React, { useState } from "react"
import { useDispatch } from "react-redux"
import Filter from '../Common/Filter'
import PageHeader from '../Common/pageHeader'
import { getRequestorReport } from "../../services/datametricService";
import { Table } from "antd";

const RequestorReport = () => {
    const dispatch = useDispatch();
    const [testData, setTestData] = useState([]);

    const columns = [
        {
            title: 'Requestor',
            dataIndex: 'Requestor',
            key: 'Requestor',
        },
    ]

    const getDataForReport = (data) => {
        dispatch(getRequestorReport(data, (val) => {
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
                pageTitle='Requestor Report'
            />
            <Filter
                dateRange
                dateRet={dataRet}
                serchButton
                getrequestorlist
            />
            <Table
                columns={columns}
                dataSource={testData}
            />
        </>
    )
}

export default RequestorReport