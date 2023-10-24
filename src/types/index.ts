type User = {
    name: string
    email: string
}

export type AuthUser = User


export type Token = {
    exp: number,
    iat: number
}