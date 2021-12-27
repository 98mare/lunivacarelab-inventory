import React, { useState } from "react";
import { useDispatch } from "react-redux";
import Filter from '../Common/Filter'
import PageHeader from '../Common/pageHeader'
import { getDailyTransactionReport } from "../../services/datametricService";
import { Table, Tag } from "antd";

const DailyTransaction = () => {
    const dispatch = useDispatch();
    const [tableData, settableData] = useState([]);
    const [newtableData, setnewtableData] = useState([]);

    const columns = [
        {
            title: 'Patient Info',
            dataIndex: 'FirstName',
            key: 'Name',
            render: (text, record) => {
                let fullName = `${text} ${record.MiddleName} ${record.LastName}`
                let ager = `(${record.Age})`
                return (
                    <>
                        <div>{fullName},</div>
                        <div>{record.Id},</div>
                        <div>{ager}</div>
                        <div>{record.ContactNo}</div>
                    </>
                )
            }
        },
        {
            title: 'Bill No',
            dataIndex: 'BillNo',
            key: 'BillNo',
        },
        {
            title: 'Created On',
            dataIndex: 'CreatedOn',
            key: 'CreatedOn',
            render: (text, record) => (
                `${text.split('T')[0]} (${record.CreatedOnNepaliDate})`
            )
        },
        {
            title: 'Payment Details',
            dataIndex: 'PaymentTYpe',
            key: 'PaymentTYpe',
            render: (text, record) => {
                // let retColor = ''
                // if(text !== null && text.toLowerCase() === 'cash')
                //     retColor = 'green'
                return (
                    <>
                        {/* <Tag color={retColor}>{text}</Tag> */}
                        Type: {text} <br />
                        Mode: {record.PaymentMOde} <br />
                        Code: {record.PaymentCode}
                    </>
                )
            }
        },
        {
            title: 'Is Paid',
            dataIndex: 'IsPaid',
            key: 'IsPaid',
            render: (text) => {
                let retText = 'Not Paid'
                let retColor = 'red'
                if (text === true) {
                    retText = 'Paid'
                    retColor = 'green'
                }
                return <Tag color={retColor}>{retText}</Tag>
            }
        },
        {
            title: 'Sample Id',
            dataIndex: 'SampleId',
            key: 'SampleId',
        },
        {
            title: 'Requestor',
            dataIndex: 'Requestor',
            key: 'Requestor',
        },
        {
            title: 'User Name',
            dataIndex: 'usrFullName',
            key: 'usrFullName',
        },
        {
            title: 'Amount',
            dataIndex: 'Amount',
            key: 'Amount',
        },
        {
            title: 'Remaining Amount',
            dataIndex: 'RemainingAmount',
            key: 'RemainingAmount',
        },
        {
            title: 'Total Price',
            dataIndex: 'TotalPrice',
            key: 'TotalPrice',
        },
    ]

    const getDataForReport = (data) => {
        dispatch(getDailyTransactionReport(data, (val) => {
            settableData(val)
            setnewtableData(val)
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
    const handleSearch = (val) => {
        // let data = printData
        
        if(val === undefined || val === ''){
            setnewtableData(tableData)
            // dispatch(getAllPritDataSucess(val))
            // let obj2={data, tableData}
            // dispatch(getAllPritDataSucess(obj2))
        }else{
            setnewtableData(val) 
            // dispatch(getAllPritDataSucess(val))
            // let obj3={data, val}
            // dispatch(getAllPritDataSucess(obj3))
        }
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
                toCompareData={tableData}
                onSearch
                dataReturn={handleSearch}
                forDailyTrasection
            />
            <div className="tableisRes">
                <Table
                    columns={columns}
                    dataSource={newtableData}
                />
            </div>
        </>
    )
}

export default DailyTransaction