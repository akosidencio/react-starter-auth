import * as React from "react"
import Cookies from "universal-cookie"

const cookies = new Cookies()

export const useCookie = () => {
    const [value, setValue] = React.useState<string | null>(null)

    const setItem = (key: string, value: string) => {
        cookies.set(key, value, {
            path: '/',
            expires: new Date(),
            httpOnly: true,
            secure: true // Set to true if using HTTPS
        })
        setValue(value)
    }

    const getItem = (key: string) => {
        const value = cookies.get(key)
        setValue(value)
        return value
    }

    const removeItem = (key: string) => {
        cookies.remove(key)
        setValue(null)
    }
    
    return { value, setItem, getItem, removeItem }
}