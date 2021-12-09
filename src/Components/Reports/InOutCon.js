import React, { useState, useEffect } from 'react';
import PageHeader from '../Common/pageHeader';
import Filter from '../Common/Filter';
import { useDispatch } from 'react-redux';
import { getGoodsInCountApi } from '../../services/labGoodsReceivedService';
import { getGoodsOutCountApi } from '../../services/labGoodsOutService';

const InOutCon = () => {
    const dispatch = useDispatch();
    const [goodsInList, setGoodsInList] = useState([]);
    const [goodsOutList, setGoodsOutList] = useState([]);

    const dataRet = (val) => {
        let data = {
            fromdate: val[0].format("YYYY-MM-DD"),
            todate: val[1].format("YYYY-MM-DD"),
            itemid: val?.itemid
        }
        getLabData(data)
    }

    const getLabData = (data) => {
        dispatch(getGoodsInCountApi(data, (val) => {
            setGoodsInList(val);
        }))
        dispatch(getGoodsOutCountApi(data, (val) => {
            setGoodsOutList(val);
        }))
    }

    useEffect(() => {
        console.log(goodsInList, goodsOutList);
    }, [goodsInList, goodsOutList])

    return (
        <>
            <PageHeader pageTitle="Goods In Vs Goods Out Vs Consumption" />
            <Filter dateRange
                dateRet={dataRet}
                itemName
            />
            <table>
                <thead>
                    <th>Item Name</th>
                </thead> 
            </table>
        </>
    )
}

export default InOutCon