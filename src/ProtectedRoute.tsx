import { deleteStateUser, isAuthenticated } from "./utils"

type Props = {
    children: string | JSX.Element | JSX.Element[];
};

function ProtectRoute({ children }: Props)  {
    if (!isAuthenticated){
      deleteStateUser() // logout
      return
    }
    return children;
};

export default ProtectRoute