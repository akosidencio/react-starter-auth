import jwtDecode from "jwt-decode";
import Cookies from "js-cookie";

import {  AuthStateUserObject, TokenObject } from "../types"

function isTokenValid(token: string) : boolean {
  if (token) {
    const decodedJwt:  TokenObject = jwtDecode(token);
    if (typeof decodedJwt === 'object' && decodedJwt !== null) {
      return decodedJwt.exp * 1000 > Date.now()
    }
  }
  return false;
}

function setStateUser(user:  AuthStateUserObject) {
  if (typeof window !== "undefined" && window.localStorage) {
    localStorage.setItem('starter_auth_user', JSON.stringify(user));
  }
}

function getStateUser() {
  if (typeof window !== "undefined" && window.localStorage) {
    const user = localStorage.getItem('starter_auth_user');
    if (user) {
      return JSON.parse(user);
    }
  }
}

function deleteStateUser() {
  Cookies.remove('starter_auth_token');
  if (typeof window !== "undefined" && window.localStorage) {
    localStorage.removeItem('starter_auth_user');
  }
}

function isAuthenticated() {
  const token = Cookies.get('starter_auth_token');
  if (token) {
    isTokenValid(token)
  }
}


export { isTokenValid, setStateUser, getStateUser, deleteStateUser, isAuthenticated };
