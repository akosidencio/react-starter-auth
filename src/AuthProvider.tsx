import * as React from 'react';
import Cookies from 'js-cookie';

import AuthContext from './AuthContext';
import httpClient from './httpClient';
import { deleteStateUser, getStateUser, isTokenValid, setStateUser } from './utils';

import { AuthStateInterface } from './types';

type Props = {
  children: string | JSX.Element | JSX.Element[];
};

const AuthProvider = ({ children }: Props) => {
  const [user, setUser] = React.useState(null);
  
  React.useEffect(() => {
    async function loadUserFromCookies() {
      const token = Cookies.get('starter_auth_token');
      if (token) {
          if (isTokenValid(token)) { // check if token expired
            httpClient.defaults.headers.Authorization = `Bearer ${token}`
            const user = getStateUser();
            setUser(user);
          } else {
            logOut()
          }
      }
    }
    loadUserFromCookies();
  }, []);

  const signIn = (state: AuthStateInterface) => {
    if (state?.token) {
      let secure = false
      if (typeof window !== "undefined") {
        secure = window.location.protocol === 'https:'
      }
      Cookies.set('starter_auth_token', state?.token, { secure: secure });
      httpClient.defaults.headers.Authorization = `Bearer ${state?.token}`
      if (state?.user) {
        setStateUser(state?.user)
      }
    }
  };

  const logOut = () => {
    deleteStateUser();
    setUser(null);
    delete httpClient.defaults.headers.Authorization
    window.location.pathname = '/';
  };

  return (
    <AuthContext.Provider
      value={{ isAuthenticated: !!user, user, signIn, logOut }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
