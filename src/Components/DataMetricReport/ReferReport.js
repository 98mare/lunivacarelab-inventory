import React, { useState } from "react";
import { useDispatch } from "react-redux";
import Filter from '../Common/Filter'
import PageHeader from '../Common/pageHeader'
import { getReferReport } from "../../services/datametricService";
import Filter from '../Common/Filter'

const ReferReport = () => {
    const dispatch = useDispatch();
    const [testData, setTestData] = useState([]);

    const columns = [
        {
            title: 'Referer',
            dataIndex: 'Referer',
            key: 'Referer',
        },
    ]

    const getDataForReport = (data) => {
        dispatch(getReferReport(data, (val) => {
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
                pageTitle='Referer Report'
            />
            <Filter
                dateRange
                dateRet={dataRet}
                serchButton
                getrefererlist
            />
            <Table
                columns={columns}
                dataSource={testData}
            />
        </>
    )
}

export default ReferReport