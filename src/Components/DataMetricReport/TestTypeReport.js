import React, { useState } from "react"
import { useDispatch } from "react-redux"
import { getTestTypeReport } from "../../services/datametricService";

const TestTypeReport = () => {
    const dispatch = useDispatch();
    const [testData, setTestData] = useState([]);

    const getDataForReport = (data) => {
        dispatch(getTestTypeReport(data, (val) => {
            console.log(val);
            setTestData(val)
        }))
    }

    return (
        <>
        </>
    )
}

export default TestTypeReport