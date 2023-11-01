import { deleteStateUser, isAuthenticated } from "./utils/helpers"

type Props = {
    children: string | JSX.Element | JSX.Element[];
};

function ProtectRoute({ children }: Props)  {
    if (!isAuthenticated){
      deleteStateUser() // logout
    }
    return children;
};

export default ProtectRoute