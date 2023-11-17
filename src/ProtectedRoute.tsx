import * as React from 'react';
import { deleteStateUser, isAuthenticated } from "./utils/helpers"

type PropType = {
  component: React.FC
  redirectPath?: string
};

const ProtectedRoute: React.FC<PropType> = ({ component: Component, redirectPath: Path }) => {
  if (!isAuthenticated){
    deleteStateUser() // logout
    window.location.pathname = Path || '/'
  }
  return <Component />
};

export default ProtectedRoute;