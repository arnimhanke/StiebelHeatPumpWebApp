import React = require('react');
import { Redirect, Route } from 'react-router-dom';

export const PrivateRoute = ({ component: Component, isAuth, redirectPath, ...rest }: any) => {
    return (
      <Route
        {...rest}
        render={(props) => (
          isAuth || process.env.NO_SECURITY === 'true'
            ? (
              <Component {...props} />
            )
            // : (<Redirect to={{ pathname: redirectPath, state: { from: props.location } }} />)
            : <div>unauth!</div>
        )}
      />
    );
  };
