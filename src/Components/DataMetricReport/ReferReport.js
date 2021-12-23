import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { getReferReport } from "../../services/datametricService";

const ReferReport = () => {
    const dispatch = useDispatch();
    const [testData, setTestData] = useState([]);

    const getDataForReport = (data) => {
        dispatch(getReferReport(data, (val) => {
            console.log(val);
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
                pageTitle='Referer Report'
            />
            <Filter
                dateRange
                dateRet={dataRet}
                serchButton
                getrefererlist
            />
        </>
    )
}

export default ReferReport