import React from 'react'
import styled from 'styled-components'
import PageHeader from '../Common/pageHeader'
import { Link } from 'react-router-dom'

// const columns = [
//   {
//     title: 'Id',
//     dataIndex: 'RId',
//     key: 'rackId'
//   },
//   {
//     title: 'Rack Code',
//     dataIndex: 'RackCode',
//     key: 'rackCode'
//   },
//   {
//     title: 'Rack Name',
//     dataIndex: 'RackName',
//     key: 'rackName'
//   },
//   {
//     title: 'Is Active',
//     dataIndex: 'IsActive',
//     key: 'isActive',
//     render: (text) => {
//       if (text === true) {
//         return 'Active'
//       }
//       return 'Inactive'
//     }
//   },
//   {
//     title: 'action',
//     key: 'action',
//     render: (text, record) => (
//       <Space size="middle">
//         <a href="#">Edit</a>
//         <a href="#">Delete</a>
//       </Space>
//     )
//   }
// ]

const data = [
  {
    name: 'Goods in Report',
    pathName: 'goodsin'
  },
  {
    name: 'Goods Out reports',
    pathName: 'goodsout'
  },
  {
    name: 'Consumption Report',
    pathName: 'consumption'
  },
  {
    name: 'Stocks',
    pathName: 'stocks'
  },
  {
    name: 'Overall Report',
    pathName: 'invs'
  },

]

const Index = () => {
  // const dispatch = useDispatch();
  // const history = useHistory();

  // const [tableData, setTableData] = useState([])

  // const locateRange = (val) => {
  //   dispatch(getRackDetApi(val, (value) => {
  //     setTableData(value)
  //   }))
  // }

  return (
    <ReportContainer>
      <PageHeader pageTitle="Reports"></PageHeader>
      <div className="contents">
        {
          data.map(e => (
            <Link to={`./reports/${e.pathName}`} pathname={e.pathName}>{e.name}</Link>
          ))
        }
      </div>
     
    </ReportContainer>
  )
}

export default Index

const ReportContainer = styled.div`
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
    }
  }


  
`
