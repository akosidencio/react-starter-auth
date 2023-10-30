export interface AuthStateUserObject {
  [x: string]: any;
}

export interface AuthStateInterface {
  token: string,
  user: AuthStateUserObject | null,
  // isSignIn: boolean
  // isUsingRefreshToken: boolean,
  // typeOfStorage: "cookie" | "localstorage"
}

export interface TokenObject {
  exp: number
}

