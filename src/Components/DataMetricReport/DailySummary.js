import React, { useState } from "react";
import { useDispatch } from "react-redux";
import Filter from '../Common/Filter'
import PageHeader from '../Common/pageHeader'
import { getDailySummaryReport, getListofcompany } from "../../services/datametricService";
import { Table, Tag } from "antd";
import { newTableStyles } from "../Common/TableStyles";
import { useEffect } from "react";

const DailySummary = () => {
    const dispatch = useDispatch();
    const [tableData, settableData] = useState([]);
    const [newTableData, setNewTableData] = useState([]);
    const [fromToDate, setfromToDate] = useState({});
    const [companyDetail, setcompanyDetail] = useState([]);

    const tableHead = [
        {
            title: 'User Name',
            dataIndex: 'UserName',
            key: 'UserName',
        },
        {
            title: 'Total Sales',
            dataIndex: 'TotalSales',
            key: 'TotalSales',
        },
        {
            title: 'Collection',
            dataIndex: 'Collection',
            key: 'Collection',
        },
        {
            title: 'Remaining',
            dataIndex: 'Remaining',
            key: 'Remaining',
        },
        {
            title: 'Payment Type',
            dataIndex: 'PaymentType',
            key: 'PaymentType',
            render: (text) => {
                let retColor = ''
                if (text !== null) {
                    if (text.toLowerCase() == 'cash')
                        retColor = 'green'
                    else if (text.toLowerCase() == 'card')
                        retColor = 'blue'
                    else if (text.toLowerCase() == 'due' || text.toLowerCase() == 'duecollection')
                        retColor = 'yellow'
                    else if (text.toLowerCase() == 'credit' || text.toLowerCase() == 'creditcollection')
                        retColor = 'red'
                }
                return <Tag color={retColor}>{text}</Tag>
            }
        },
    ]

    const getDataForReport = (data) => {
        dispatch(getDailySummaryReport(data, (val) => {
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
        setfromToDate(data);
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
            <h2 class="gocenter">Daily Summary Report</h2><div class="headingContent">
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
                pageTitle='Daily Summary Report'
                csvLinkTitle='Export CSV'
                csvData={newTableData}
                csvDataName='dailySummeryReport.csv'
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
                forDailyReport
            />
            <Table
                columns={tableHead}
                dataSource={newTableData}
            />
        </>
    )
}

export default DailySummary