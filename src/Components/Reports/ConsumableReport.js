import React, { useEffect, useState } from 'react'
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Doughnut } from 'react-chartjs-2'
import { Col, Row, Table } from 'antd';
import PageHeader from '../Common/pageHeader'
import styled from 'styled-components';
import Filter from '../Common/Filter';
import { useDispatch } from 'react-redux';
import { getActualConsumApi } from '../../services/stockService';

ChartJS.register(ArcElement, Tooltip, Legend);

const ConsumableReport = () => {
    const dispatch = useDispatch();
    const [tableData, setTableData] = useState([]);
    const [tableHead, setTableHead] = useState([]);

    // const data = {
    //     labels: ['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange'],
    //     datasets: [
    //         {
    //             label: 'Consumption',
    //             data: [12, 19, 3, 5, 2, 3],
    //             backgroundColor: [
    //                 'rgba(255, 99, 132, 0.2)',
    //                 'rgba(54, 162, 235, 0.2)',
    //                 'rgba(255, 206, 86, 0.2)',
    //                 'rgba(75, 192, 192, 0.2)',
    //                 'rgba(153, 102, 255, 0.2)',
    //                 'rgba(255, 159, 64, 0.2)',
    //             ],
    //             borderColor: [
    //                 'rgba(255, 99, 132, 1)',
    //                 'rgba(54, 162, 235, 1)',
    //                 'rgba(255, 206, 86, 1)',
    //                 'rgba(75, 192, 192, 1)',
    //                 'rgba(153, 102, 255, 1)',
    //                 'rgba(255, 159, 64, 1)',
    //             ],
    //             borderWidth: 1,
    //         },
    //     ],
    // };

    // const options = {
    //     plugins: {
    //         title: {
    //             display: true,
    //             text: 'Consumption Report'
    //         }
    //     }
    // }

    const getAcutalCon = (data) => {
        dispatch(getActualConsumApi(data, (val) => {
            setTableData(val)
        }))
    }

    const dataRet = (val) => {
        let data = {
            fromdate: val[0].format("YYYY-MM-DD"),
            todate: val[1].format("YYYY-MM-DD"),
        }
        getAcutalCon(data)
    }

    useEffect(() => {
        createTableHead()
    }, [tableData])

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
            setTableHead(data)
        }
    }

    return (
        <ConsumeContainer>
            <PageHeader
                pageTitle='Consumption Report'
            />
            <Filter
                dateRange
                dateRet={dataRet}
            />
            <div className="tableisRes">
                <Table
                    columns={tableHead}
                    dataSource={tableData}
                />
            </div>
            {/* <Row>
                <Col sm={12} xs={24}>
                    <Doughnut
                        data={data}
                        options={options}
                    />
                </Col>
            </Row> */}
        </ConsumeContainer>
    )
}

export default ConsumableReport

const ConsumeContainer = styled.div`
  background: rgba( 255, 255, 255, 0.25 );
  box-shadow: 0 2px 22px 0 rgba( 31, 38, 135, 0.10 );
  backdrop-filter: blur( 4px );
  -webkit-backdrop-filter: blur( 4px );
  border-radius: 10px;
  border: 1px solid rgba( 255, 255, 255, 0.18 );
  overflow: hidden;
  margin-bottom: 50px;
  `
