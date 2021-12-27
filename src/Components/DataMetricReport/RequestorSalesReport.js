import React, { useState } from "react"
import { useDispatch } from "react-redux"
import Filter from '../Common/Filter'
import PageHeader from '../Common/pageHeader'
import { getRequestorTotalSalesReport } from "../../services/datametricService";
import { Table } from "antd";
import { newTableStyles } from "../Common/TableStyles";

const RequestorSalesReport = () => {
    const dispatch = useDispatch();
    const [tableData, settableData] = useState([]);
    const [newTableData, setnewTableData] = useState([]);
    const [fromToDate, setfromToDate] = useState({});

    const tableHead = [
        {
            title: 'Requestor',
            dataIndex: 'Requestor',
            key: 'Requestor',
        },
        {
            title: 'Total Price',
            dataIndex: 'TotalPrice',
            key: 'TotalPrice',
        },
        {
            title: 'Discount Total',
            dataIndex: 'DiscountTotal',
            key: 'DiscountTotal',
        },
        {
            title: 'Actual Total',
            dataIndex: 'ActualTotal',
            key: 'ActualTotal',
        },
    ]

    const getDataForReport = (data) => {
        dispatch(getRequestorTotalSalesReport(data, (val) => {
            settableData(val)
            setnewTableData(val)
        }))
    }

    const dataRet = (val) => {
        let data = {
            fromdate: val[0].format("YYYY-MM-DD"),
            todate: val[1].format("YYYY-MM-DD"),
        }
        getDataForReport(data)
        setfromToDate(data)
    }
    const handleSearch = (val) => {
        // let data = printData
        
        if(val === undefined || val === ''){
            setnewTableData(tableData)
            // dispatch(getAllPritDataSucess(val))
            // let obj2={data, tableData}
            // dispatch(getAllPritDataSucess(obj2))
        }else{
            setnewTableData(val) 
            // dispatch(getAllPritDataSucess(val))
            // let obj3={data, val}
            // dispatch(getAllPritDataSucess(obj3))
        }
      }

      const handlePrinter = () => {
        if (tableHead.length !== 0) {
            let newWindow = window.open()

            let refName = `<h3 class="gocenter">Requestor Total Sales Summary</h3><div class="headingContent">
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
                pageTitle='Requestor Total Sales Summary'
            />
            <div className="printBtncontainer">
                <button onClick={handlePrinter} className="btn ant-btn btn-primary btn-primary--outline">Print</button>
            </div>
            <Filter
                dateRange
                dateRet={dataRet}
                serchButton
                toCompareData={tableData}
                onSearch
                dataReturn={handleSearch}
                forReportSalesReport
            />
            <Table
                columns={tableHead}
                dataSource={newTableData}
            />
        </>
    )
}

export default RequestorSalesReport