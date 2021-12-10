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

    useEffect(() => {
        getLabData()
    }, [])

    const getLabData = () => {
        let newLabel = [];
        let inData = [];
        let outData = [];
        dispatch(getTotalGoodsInOutApi((val) => {
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
                backgroundColor: 'rgb(53, 162, 235)',
                data: inData,
                borderWidth: 2
            },
            {
                label: 'Goods Out',
                backgroundColor: 'rgb(53, 162, 235)',
                data: outData,
                borderWidth: 2
            },
        ],
    };


    return (
        <>
            <PageHeader pageTitle="Total Goods In and Goods Out" />
            <Bar options={options} data={dataBar} />
        </>
    )
}

export default InOutConTab