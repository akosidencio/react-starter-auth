import * as React from 'react';
import { deleteStateUser, isAuthenticated } from "./utils/helpers"

type PropType = {
  component: React.FC
  redirectPath?: string
};

const ProtectedRoute: React.FC<PropType> = ({ component: Component, redirectPath: Path }) => {
  if (isAuthenticated){
    return <Component />
  }
  deleteStateUser() // logout
  return window.location.href = Path || '/login'
  
};

export default ProtectedRoute;