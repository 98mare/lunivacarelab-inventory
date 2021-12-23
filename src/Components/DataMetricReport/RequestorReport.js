import React, { useEffect, useState } from "react"
import { useDispatch } from "react-redux"
import Filter from '../Common/Filter'
import PageHeader from '../Common/pageHeader'
import { getRequestorReport } from "../../services/datametricService";
import { Table } from "antd";

const RequestorReport = () => {
    const dispatch = useDispatch();
    const [tableData, settableData] = useState([]);
    const [tableHead, setTableHead] = useState([]);
    const [labelName, setLabelName] = useState([]);
 
    // const columns = [
    //     {
    //         title: 'Requestor',
    //         dataIndex: 'Requestor',
    //         key: 'Requestor',
    //     },
    // ]

    const getDataForReport = (data) => {
        dispatch(getRequestorReport(data, (val) => {
            settableData(val)
            console.log(val);
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
        
    }, [tableData]);
    
    

    const createTableHead = () => {
        if (tableData.length !== 0) {
            let tableKeys = Object.keys(tableData[0]);
            let data = []
            let labels = [];

            tableKeys.forEach(ele => {
                data.push({
                    title: ele,
                    dataIndex: ele,
                    key: ele,
                })
            })

            // tableData.forEach(ele => {
            //     if(ele.ItemName !== null)
            //         labels.push(ele.ItemName);
            // })

            setLabelName(labels)
            setTableHead(data)
            console.log("table head", tableHead);
        }
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
                columns={labelName}
                dataSource={tableData}
            />
        </>
    )
}

export default RequestorReport