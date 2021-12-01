import React, { useEffect, useState } from 'react';
import { Route } from 'react-router-dom';
import { Redirect } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';

const PrivateRouter = ({ component: Component, layout: Layout, forEdit, secondaryNav, secondaryNavigation, ...rest }) => {
//   const dispatch = useDispatch();
//   const history = useHistory();
//   const profileReducer = useSelector(state => state.profile);

//   useEffect(() => {
//     essentialServices();
//   }, [])

  const checkAuthentication = () => {
    return true
  }

  return (
    <Route
      {...rest}
      render={props => (
        checkAuthentication() ?
          <Layout secondaryNav={secondaryNav} secondaryNavigation={secondaryNavigation}>
              <Component forEdit={forEdit} {...props} />
          </Layout>
          :
          <Redirect to={{
            pathname: '/login'
          }} />
      )}
    />
  )
}

export default PrivateRouter;