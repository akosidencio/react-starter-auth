import * as React from 'react'

type AuthStateUser = {}

export interface AuthState  {
    auth: {
      token: string,
      type: string,
      expiresAt: Date
    } | null,
    refresh: {
      token: string,
      expiresAt: Date
    } | null,
    userState: AuthStateUser | null,
    isSignIn: boolean
    isUsingRefreshToken: boolean,
  }
  

export type Token = {
    exp: number,
    iat: number
}

export type AuthOptions = {
    name?: string,
    email?: string,
    role?: string
}

export type User = AuthOptions

export type Props = {
    children?: React.ReactNode
}

export interface AuthContext {
    user: User | null
    token: string | null
}