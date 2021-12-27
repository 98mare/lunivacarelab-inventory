import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import Filter from '../Common/Filter'
import PageHeader from '../Common/pageHeader'
import { getReferReport } from "../../services/datametricService";
import { Table } from "antd";
import { getAllPritDataSucess } from "../../store/slices/printSlice";
import { newTableStyles } from "../Common/TableStyles";

const ReferReport = () => {
    const dispatch = useDispatch();
    const [tableData, settableData] = useState([]);
    const [tableHead, settableHead] = useState([]);
    const [newTableData, setnewTableData] = useState([]);
    const [printData, setprintData] = useState([])
    const [fromToDate, setfromToDate] = useState({});

    const getDataForReport = (data) => {
        setprintData(data)
        dispatch(getReferReport(data, (val) => {
            settableData(val)
            setnewTableData(val)
            let obj = { data, val }
            dispatch(getAllPritDataSucess(obj))

        }))
    }
    // console.log("date",printData)

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
            tableKeys.forEach(ele => {
                data.push({
                    title: ele,
                    dataIndex: ele,
                    key: ele,
                })
            })

            settableHead(data);
        }
    }
    const handleSearch = (val) => {
        let data = printData

        if (val === undefined || val === '') {
            setnewTableData(tableData)
            // dispatch(getAllPritDataSucess(val))
            let obj2 = { data, tableData }
            dispatch(getAllPritDataSucess(obj2))
        } else {
            setnewTableData(val)
            // dispatch(getAllPritDataSucess(val))
            let obj3 = { data, val }
            dispatch(getAllPritDataSucess(obj3))
        }
    }

    const handlePrinter = () => {
        if (tableHead.length !== 0) {
            let newWindow = window.open()

            let refName = `<h3 class="gocenter">Referer Report</h3><div class="headingContent">
        <div>
        ${newTableData[0]['Refer Name']}
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

            newWindow.document.body.innerHTML = newTableStyles + refName + allTable

            setTimeout(function () {
                newWindow.print();
                newWindow.close();
            }, 1000);
        }
    }

    return (
        <>
            <PageHeader
                pageTitle='Referer Report'
                csvLinkTitle='Export CSV'
                csvData={newTableData}
                csvDataName='RefererReport.csv'

                printFileName='referReport'
                printTitle='Refrerer Name'
            />
            <button onClick={handlePrinter}>Printer</button>
            <Filter
                dateRange
                dateRet={dataRet}
                serchButton
                getrefererlist
                toCompareData={tableData}
                onSearch
                dataReturn={handleSearch}
                forRefererReport

            />
            <Table
                columns={tableHead}
                dataSource={newTableData}
            />
        </>
    )
}

export default ReferReport