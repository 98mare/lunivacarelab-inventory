import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import Filter from '../Common/Filter'
import PageHeader from '../Common/pageHeader'
import { getReferReport } from "../../services/datametricService";
import { Table } from "antd";

const ReferReport = () => {
    const dispatch = useDispatch();
    const [tableData, settableData] = useState([]);
    const [labelName, setlabelName] = useState([]);
    

    const columns = [
        {
            title: 'Referer',
            dataIndex: 'Referer',
            key: 'Referer',
        },
    ]

    const getDataForReport = (data) => {
        dispatch(getReferReport(data, (val) => {
            settableData(val)
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

    useEffect(() => {
        createTableHead()
        console.log(tableData)
        console.log(labelName)
    }, [tableData]);

    const createTableHead = () => {
        if(tableData.length !== 0){
            let tableKeys = Object.keys(tableData[0]);
            let data =[]
            let labels = [];
            tableKeys.forEach(ele => {
                data.push({
                    title: ele,
                    dataIndex: ele,
                    key: ele,
                })
            })
            
            tableData.forEach(ele => {
                if(ele['Requestor Name'] !== null)
                    labels.push(ele['Requestor Name']);
            })

            setlabelName(labels)
            settableData(data)
        }
    }

    return (
        <>
            <PageHeader
                pageTitle='Referer Report'
                csvDataName="export CSV"
                csvData={tableData}
            />
            <Filter
                dateRange
                dateRet={dataRet}
                serchButton
                getrefererlist
            />
            <Table
                columns={labelName}
                dataSource={tableData}
            />
        </>
    )
}

export default ReferReport