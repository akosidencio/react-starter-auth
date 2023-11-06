import * as React from 'react'

import { StarterContextType } from './types'

const AuthContext = React.createContext<StarterContextType | null>(null)

export default AuthContext


