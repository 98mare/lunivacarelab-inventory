import React from "react";
import styled from 'styled-components'
import PageHeader from '../Common/pageHeader'
import { Link } from 'react-router-dom'

const data = [
    {
        name: 'Daily Summary',
        pathName: 'dailysummary'
    },
    {
        name: 'Daily Transaction',
        pathName: 'dailytransaction'
    },
    // {
    //     name: 'Test Type Report',
    //     pathName: 'testtype'
    // },
    {
        name: 'Requestor Report',
        pathName: 'requestor'
    },
    {
        name: 'Referer Report',
        pathName: 'referer'
    },
    {
        name: 'Requestor Sales Summary',
        pathName: 'requestorsales'
    },
]

const CareLab = () => {

    return (
        <CareLabContain>
            <PageHeader pageTitle="MIS Reports"></PageHeader>
            <div className="contents">
                {
                    data.map(e => (
                        <Link to={`/datametric/${e.pathName}`} pathname={e.pathName}>{e.name}</Link>
                    ))
                }
            </div>
        </CareLabContain>
    )
}

export default CareLab

const CareLabContain = styled.div`
  background: rgba( 255, 255, 255, 0.25 );
  box-shadow: 0 2px 22px 0 rgba( 31, 38, 135, 0.10 );
  backdrop-filter: blur( 4px );
  -webkit-backdrop-filter: blur( 4px );
  border-radius: 10px;
  border: 1px solid rgba( 255, 255, 255, 0.18 );
  overflow: hidden;
  margin-bottom: 50px;
  .contents{
    width: 100%;
    padding: 40px 20px;
    display: flex;
    flex-wrap: wrap;
    gap: 20px;
    a{
    font-size: 18px;
    padding: 20px 30px;
    background: rgba( 255, 255, 255, 0.25 );
    box-shadow: 0 2px 22px 0 rgba( 31, 38, 135, 0.17 );
    backdrop-filter: blur( 4px );
    -webkit-backdrop-filter: blur( 4px );
    border-radius: 10px;
    border: 1px solid rgba( 255, 255, 255, 0.18 );
    color: #2f2f33;
    }
    @media (max-width: 768px) {
      a {
        width: 100%;
      }
    }
  }
  `