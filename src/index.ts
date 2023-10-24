import Cookies from "universal-cookie"
import jwt_decode from "jwt-decode"
import { Token, AuthOptions, User } from "./types"
const cookies = new Cookies()
/**
 * 
 * @param authProps 
 * @return void
 */
export const setJWTtoken = (jwtToken: string, options?: AuthOptions) : void => {
    try {
        if (jwtToken) {
            const decodedToken: Token = jwt_decode(jwtToken) // decode token
            if (decodedToken !== null && typeof decodedToken === 'object') {
                cookies.set('jwt_token', jwtToken, {
                    path: '/',
                    expires: new Date(decodedToken?.exp),
                    httpOnly: true,
                    secure: true // Set to true if using HTTPS
                })
            }
        }
        if (options && typeof options === 'object') {
            if (typeof window !== 'undefined'){
                window.localStorage.setItem('user', JSON.stringify(options))
            }
        }
    } catch (error) {
        throw new TypeError("Invalid token")
    }
}

/**
 * @return string | null
 */
export const getJWTtoken = (): string | null => {
    try {
        const storedCookieToken = cookies.get('jwt_token')
        if (storedCookieToken) {
            return storedCookieToken
        }
        return null
    } catch (error) {
        throw new TypeError("Empty jwt token")
    }
}

/**
 * @return void
 */
export const clearJWTtoken = () : void => {
    cookies.remove('jwt_token')
}

/**
 * 
 * @return User | null
 */
export const getAuthUser = (): User | null => {
    if (typeof window !== 'undefined'){
        const storedUser = window.localStorage.getItem('user')
        if (storedUser) {
            return JSON.parse(storedUser)
        }
    }
    return null
}