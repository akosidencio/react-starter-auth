import * as React from 'react'
import AuthContext from "./AuthContext";
import { AuthError } from './errors'

import { StarterContextType } from "./types"

const useAuth = (): StarterContextType => {
    const context = React.useContext(AuthContext)
    if (context === null) {
        throw new AuthError('AuthProvider is missing. ' + 'Please add the AuthProvider')
    }
    return context;
}

export default useAuth;
