import * as React from 'react';

import AuthContext from './AuthContext';
import { deleteStateUser, getStateUser, isTokenValid, setStateUser } from './utils/helpers';
import { setAuthToken, getAuthToken } from './utils/cookie';
import { AuthStateInterface } from './types';

const AuthProvider = ({ children } : { children: React.ReactNode }) => {
  const [authUser, setAuthUser] = React.useState(null);
  const [isLoading, setLoading] = React.useState(false);

  React.useEffect(() => {
    async function loadUserFromCookies() {
      setLoading(true)
      const token = getAuthToken()
      if (token) {
          if (isTokenValid(token)) { // check if token expired
            const user = getStateUser();
            setAuthUser(user);
          } else {
            logOut()
          }
          setLoading(false)
      }
      setLoading(false)
    }
    loadUserFromCookies();
  }, []);

  const signIn = (state: AuthStateInterface) => {
    if (state?.token) {
      let secure = false
      if (typeof window !== "undefined") {
        secure = window.location.protocol === 'https:'
      }
      setAuthToken(state?.token, secure);
      if (state?.user) {
        setStateUser(state?.user)
      } else {
        setStateUser({ name: 'Anonymous'})
      }
    }
  };

  const logOut = (redirectPath?: string) => {
    deleteStateUser();
    setAuthUser(null);
    window.location.href = redirectPath || '/';
  };

  return (
    <AuthContext.Provider
      value={{ isLoading: isLoading, isAuthenticated: !!authUser, user: authUser, signIn, logOut }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
