import { User } from "../types"
import { useCookie } from "./useCookie"

export const useAuth = () => {
    const { setItem } = useCookie()

    const setAuthToken = (token: string, user: User) => {
       setItem('token', token)
       console.log(user)
    }

    return { setAuthToken }
}