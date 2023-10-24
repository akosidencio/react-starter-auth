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