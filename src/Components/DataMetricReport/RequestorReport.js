import React, { useEffect, useState } from "react"
import { useDispatch } from "react-redux"
import Filter from '../Common/Filter'
import PageHeader from '../Common/pageHeader'
import { getRequestorReport } from "../../services/datametricService";
import { Table } from "antd";
import { newTableStyles } from "../Common/TableStyles";


const RequestorReport = () => {
    const dispatch = useDispatch();
    const [tableData, settableData] = useState([]);
    const [tableHead, setTableHead] = useState([]);
    const [labelName, setLabelName] = useState([]);
    const [newTableData, setnewTableData] = useState([]);
    const [fromToDate, setfromToDate] = useState({});

    const getDataForReport = (data) => {
        dispatch(getRequestorReport(data, (val) => {
            settableData(val)
            setnewTableData(val)
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
            setTableHead(data)
        }
    }
    const handleSearch = (val) => {
        if (val === undefined || val === '') {
            setnewTableData(tableData)
        } else {
            setnewTableData(val)
        }
    }
    const handlePrinter = () => {
        
        if (tableHead.length !== 0) {
            let newWindow = window.open()

            let refName = `<h3 class="gocenter">Requerstor Report</h3><div class="headingContent">
        <div>
        Requestor name: ${newTableData[0]['Requestor Name']}
        </div>
        <div>
        From ${fromToDate?.fromdate} - To ${fromToDate?.todate}
        </div>
        </div>
        `;

            let tableBody = '';
            let tableHeadHtml = '<thead>';
            let columns = [];
            let newStyle = `<style>thead > tr> th:first-child, tbody > tr > td:first-child{
                 display: none;
                }</style>`

            tableHead.forEach(ele => {
                tableHeadHtml += `<th>${ele?.title}</th>`;
                columns.push(ele.title);
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

            newWindow.document.body.innerHTML = newTableStyles + newStyle + refName + allTable 

            setTimeout(function () {
                newWindow.print();
                newWindow.close();
            }, 300);
        }
    }

    return (
        <>
            <PageHeader
                pageTitle='Requestor Report'
                csvLinkTitle='Export CSV'
                csvData={newTableData}
                csvDataName='requestorReport.csv'
            />
            <div className="printBtncontainer">
                <button onClick={handlePrinter} className="btn ant-btn btn-primary btn-primary--outline">Print</button>
            </div>
            <Filter
                dateRange
                dateRet={dataRet}
                serchButton
                getrequestorlist
                toCompareData={tableData}
                onSearch
                dataReturn={handleSearch}
                forRequestorReport
            />
            <Table
                columns={tableHead}
                dataSource={newTableData}
            />
        </>
    )
}

export default RequestorReport

