export interface StarterContextType {
  isLoading: boolean
  isAuthenticated: boolean
  user: AuthStateUserObject
  signIn: (state: AuthStateInterface) => void
  logOut: () => void
}

export interface AuthStateUserObject {
  [x: string]: any;
}

export interface AuthStateInterface {
  token: string,
  user?: AuthStateUserObject | null,
}

export interface TokenObject {
  iss?: string;
  sub?: string;
  aud?: string[] | string;
  exp?: number;
  nbf?: number;
  iat?: number;
  jti?: string;

}

export interface TokenHeader {
  typ?: string;
  alg?: string;
  kid?: string;
}

export interface TokenDecodeOptions {
  header?: boolean;
}


export interface FetcherOptions  {[key: string]: string | any | undefined}

export interface FetcherHeaders  {[key: string]: string | any | undefined}

