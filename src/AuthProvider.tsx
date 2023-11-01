import * as React from 'react';
import Cookies from 'js-cookie';

import AuthContext from './AuthContext';
import { deleteStateUser, getStateUser, isTokenValid, setStateUser } from './utils';

import { AuthStateInterface } from './types';

const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = React.useState(null);
  
  React.useEffect(() => {
    async function loadUserFromCookies() {
      const token = Cookies.get('starter_auth_token');
      if (token) {
          if (isTokenValid(token)) { // check if token expired
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
      if (state?.user) {
        setStateUser(state?.user)
      } else {
        setStateUser({ name: 'Anonymous'})
      }
    }
  };

  const logOut = () => {
    deleteStateUser();
    setUser(null);
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
