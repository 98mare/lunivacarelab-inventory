import React, { useState } from "react";
import { useDispatch } from "react-redux";
import Filter from '../Common/Filter'
import PageHeader from '../Common/pageHeader'
import { getDailyTransactionReport, getListofcompany } from "../../services/datametricService";
import { Table, Tag } from "antd";
import { newTableStyles } from "../Common/TableStyles";
import { useEffect } from "react";

const DailyTransaction = () => {
    const dispatch = useDispatch();
    const [tableData, settableData] = useState([]);
    const [newTableData, setNewTableData] = useState([]);
    const [fromToDate, setfromToDate] = useState({});
    const [companyDetail, setcompanyDetail] = useState([]);

    const tableHead = [
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
            setNewTableData(val)
        }))
    }

    const dataRet = (val) => {
        let data = {
            ...val,
            fromdate: val[0].format("YYYY-MM-DD"),
            todate: val[1].format("YYYY-MM-DD"),
        }
        getDataForReport(data)
        setfromToDate(data)
    }
    const handleSearch = (val) => {
        // let data = printData
        
        if(val === undefined || val === ''){
            setNewTableData(tableData)
            // dispatch(getAllPritDataSucess(val))
            // let obj2={data, tableData}
            // dispatch(getAllPritDataSucess(obj2))
        }else{
            setNewTableData(val) 
            // dispatch(getAllPritDataSucess(val))
            // let obj3={data, val}
            // dispatch(getAllPritDataSucess(obj3))
        }
      }
      
      useEffect(()=> {
        dispatch(getListofcompany(data=> {
            setcompanyDetail(data[0])
        }))
    }, [])
      const handlePrinter = () => {
        if (tableHead.length !== 0) {
            let newWindow = window.open()

            let refName = `
            <div class="gocenter">
                <h2> ${companyDetail.CompanyName} </h2>
                <p> ${companyDetail.COmpanyAddress} </p>
                <p>Contact no:${companyDetail.COmpanyContactNo} </p>
            </div>
            <h2 class="gocenter">Daily Summery Report</h2><div class="headingContent">
        <div>
        
        </div>
        <div>
        From ${fromToDate?.fromdate} - To ${fromToDate?.todate}
        </div>
        </div>
        `;

            let tableBody = '';
            let tableHeadHtml = '<thead>';
            let columns = [];

            tableHead.forEach(ele => {
                tableHeadHtml += `<th>${ele?.dataIndex}</th>`;
                columns.push(ele.dataIndex);
            })
            tableHeadHtml += '</thead>';

            newTableData.forEach(ele => {
                tableBody = tableBody + '<tr>'

                columns.forEach(cell => {
                    tableBody = tableBody + '<td>' + ele[cell] + '</td>'
                })

                tableBody = tableBody + '</tr>'
            })

            let allTable = `<table>${tableHeadHtml}${tableBody}</table>`

            newWindow.document.body.innerHTML = newTableStyles + refName + allTable

            setTimeout(function () {
                newWindow.print();
                newWindow.close();
            }, 300);
        }
    }


    return (
        <>
            <PageHeader
                pageTitle='Daily Transaction Report'
                csvLinkTitle='Export CSV'
                csvData={newTableData}
                csvDataName='dailyTransectionReport.csv'
            />
            <div className="printBtncontainer">
                <button onClick={handlePrinter} className="btn ant-btn btn-primary btn-primary--outline">Print</button>
            </div>
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
                    columns={tableHead}
                    dataSource={newTableData}
                />
            </div>
        </>
    )
}

export default DailyTransaction