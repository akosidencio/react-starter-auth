import * as React from 'react';
import { isAuthenticated } from "./utils"

const withAuthentication = <P extends Record<string, unknown>>(
    Component: React.ComponentType<P>
  ): React.FC<P> => {
    const Auth: React.FC<P> = (props) => {
      if(!isAuthenticated()) {
        window.location.pathname = '/login'
        return
      }
      return <Component {...props} />;
    };
    return Auth;
  };
  
  export default withAuthentication;