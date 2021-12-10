import React, { useState, useEffect } from 'react';
import PageHeader from '../Common/pageHeader';
import { useDispatch } from 'react-redux';
import { getTotalGoodsInOutApi } from '../../services/itemNewItemService';
import {
    Chart as ChartJS,
    LinearScale,
    CategoryScale,
    BarElement,
    PointElement,
    LineElement,
    Legend,
    Tooltip,
    ArcElement,
    Title
} from 'chart.js';
import { Bar } from 'react-chartjs-2';
import { Table } from 'antd';

ChartJS.register(
    LinearScale,
    CategoryScale,
    BarElement,
    PointElement,
    LineElement,
    ArcElement,
    Legend,
    Tooltip,
    Title
);

export const options = {
    responsive: true,
    plugins: {
        legend: {
            position: 'top',
        },
        title: {
            display: true,
            text: 'Total Goods In / Out',
            position: 'bottom'
        },
    },
};

const InOutConTab = () => {
    const dispatch = useDispatch();
    const [label, setlabel] = useState([]);
    const [inData, setInData] = useState([]);
    const [outData, setOutData] = useState([]);
    const [allGoodsList, setAllGoodsList] = useState([]);

    const columns = [
        {
            title: 'Item Name',
            dataIndex: 'ItemId',
            key: 'ItemId',
        },
        {
            title: 'Total Goods In',
            dataIndex: 'TotalGoodsIn',
            key: 'TotalGoodsIn',
        },
        {
            title: 'Total Goods Out',
            dataIndex: 'TotalGoodsOut',
            key: 'TotalGoodsOut',
        }
    ]

    useEffect(() => {
        getLabData()
    }, [])

    const getLabData = () => {
        let newLabel = [];
        let inData = [];
        let outData = [];
        dispatch(getTotalGoodsInOutApi((val) => {
            setAllGoodsList(val)
            val.forEach(ele => {
                let itemName = ele?.ItemId
                if (ele?.ItemId === null)
                    itemName = 'N/A'
                newLabel.push(itemName);
                inData.push(ele?.TotalGoodsIn);
                outData.push(ele?.TotalGoodsOut);
            });
            setlabel(newLabel);
            setInData(inData);
            setOutData(outData);
        }))
    }

    const labels = label;

    const dataBar = {
        labels,
        datasets: [
            {
                label: 'Goods In',
                backgroundColor: 'rgb(77, 190, 143)',
                data: inData,
                borderWidth: 2
            },
            {
                label: 'Goods Out',
                backgroundColor: 'rgb(184, 176, 71)',
                data: outData,
                borderWidth: 2
            },
        ],
    };


    return (
        <>
            <PageHeader pageTitle="Total Goods In and Goods Out" />
            <Bar options={options} data={dataBar} />
            <Table
                columns={columns}
                dataSource={allGoodsList}
            />
        </>
    )
}

export default InOutConTab