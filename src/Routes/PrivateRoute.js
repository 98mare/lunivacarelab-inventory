import React from 'react'
import { useHistory } from 'react-router-dom'

const PrivateRoute = ({component: Component, layout: Layout, ...props}) => {
  const history = useHistory();
  return (
    <div>
      <Layout {...props}>
        <Component {...props}></Component>
      </Layout>
      
    </div>
  )
}

export default PrivateRoute
