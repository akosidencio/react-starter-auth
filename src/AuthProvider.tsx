import * as React from 'react'

import { AuthContext, Props } from './types'

const AuthContext = React.createContext<AuthContext>({ user: null, token: null })

const AuthProvider = ({ children }: Props) => {

  return (
    <AuthContext.Provider value={{ user: null, token: 'hehe'}}>
        {children}
    </AuthContext.Provider>
  )
}

export default AuthProvider