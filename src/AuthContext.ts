import * as React from 'react'
// type
import { AuthContextType } from './types'

const AuthContext = React.createContext<AuthContextType | {}>({})

export default AuthContext


