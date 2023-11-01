import Cookies from "js-cookie";

import { AuthError } from "../errors";
import {  AuthStateUserObject, TokenObject, TokenHeader, TokenDecodeOptions } from "../types"

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
    return isTokenValid(token)
  }
  return false
}

function b64DecodeUnicode(str: string) {
  return decodeURIComponent(
    atob(str).replace(/(.)/g, (p) => {
      let code = (p as string).charCodeAt(0).toString(16).toUpperCase();
      if (code.length < 2) {
        code = "0" + code;
      }
      return "%" + code;
    }),
  );
}

function base64UrlDecode(str: string) {
  let output = str.replace(/-/g, "+").replace(/_/g, "/");
  switch (output.length % 4) {
    case 0:
      break;
    case 2:
      output += "==";
      break;
    case 3:
      output += "=";
      break;
    default:
      throw new Error("base64 string is not of the correct length");
  }

  try {
    return b64DecodeUnicode(output);
  } catch (err) {
    return atob(output);
  }
}

function tokenDecode<T = TokenHeader | TokenObject>(token: string, options?: TokenDecodeOptions) : T {
  if (typeof token !== "string") {
    throw new AuthError("Invalid token specified: must be a string");
  }
  options ||= {};

  const pos = options.header === true ? 0 : 1;
  const part = token.split(".")[pos];

  if (typeof part !== "string") {
    throw new AuthError(`Invalid token specified: missing part #${pos + 1}`);
  }

  let decoded: string;
  try {
    decoded = base64UrlDecode(part);
  } catch (e) {
    throw new AuthError(
      `Invalid token specified: invalid base64 for part #${pos + 1} (${(e as Error).message})`,
    );
  }

  try {
    return JSON.parse(decoded) as T;
  } catch (e) {
    throw new AuthError(
      `Invalid token specified: invalid json for part #${pos + 1} (${(e as Error).message})`,
    );
  }
}

function isTokenValid(token: string) : boolean {
  if (token) {
    const decodedJwt:  TokenObject = tokenDecode(token);
    if (typeof decodedJwt === 'object' && decodedJwt !== null) {
      return decodedJwt.exp * 1000 > Date.now()
    }
  }
  return false;
}


export { isTokenValid, setStateUser, getStateUser, deleteStateUser, isAuthenticated, tokenDecode };
