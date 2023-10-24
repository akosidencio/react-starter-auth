import Cookies from 'universal-cookie'
import jwt_decode from "jwt-decode"
import { Token } from "./types"
const cookies = new Cookies()
/**
 * 
 * @param authProps 
 * @returns 
 */
export const setJWTtoken = (jwtToken: string) => {
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
    } catch (error) {
        throw new TypeError("Invalid token")
    }
}

/**
 * 
 */
export const getJWTtoken = () => {
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
 * 
 */
export const clearJWTtoken = () => {
    cookies.remove('jwt_token')
}