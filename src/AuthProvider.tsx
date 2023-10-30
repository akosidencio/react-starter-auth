import React from 'react';
import Cookies from 'js-cookie';

import AuthContext from './AuthContext';
import clientApi from './api';
import { getStateUser, isAuthenticated, setStateUser } from './utils/utils';

import { AuthStateInterface } from './types';

type Props = {
  children: string | JSX.Element | JSX.Element[];
};

const AuthProvider = ({ children }: Props) => {
  const [user, setUser] = React.useState(null);
  // const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    async function loadUserFromCookies() {
      const token = Cookies.get('starter_auth_token');
      if (token) {
        const isTokenValid = isAuthenticated(token); // check if token expired
        if (isTokenValid) {
          clientApi.defaults.headers.Authorization = `Bearer ${token}`
          const user = getStateUser();
          if (user) setUser(user);
        } else {
          // logout
          logout()
        }
      }
    }
    loadUserFromCookies();
  }, []);

  const setAuth = async (state: AuthStateInterface) => {
    if (state?.token) {
      let secure = false
      if (typeof window !== "undefined") {
        secure = window.location.protocol === 'https:'
      }
      Cookies.set('starter_auth_token', state?.token, { secure: secure });
      clientApi.defaults.headers.Authorization = `Bearer ${state?.token}`
      if (state?.user) {
        setStateUser(state?.user)
      }
    }
  };

  const logout = () => {
    Cookies.remove('starter_auth_token');
    setUser(null);
    delete clientApi.defaults.headers.Authorization
    window.location.pathname = '/';
  };

  return (
    <AuthContext.Provider
      value={{ isAuthenticated: !!user, user, setAuth, logout }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
