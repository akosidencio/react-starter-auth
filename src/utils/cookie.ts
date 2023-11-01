import Cookies from "js-cookie";

const tokenName = 'starter_auth_token'

const setAuthToken = (token: string, secure: boolean) => {
    Cookies.set(tokenName, token, { secure: secure });
};

const getAuthToken = (): string | null => {
    return Cookies.get(tokenName);
};

const clearAuthToken = ()  => {
    Cookies.remove(tokenName);
};

export { setAuthToken, getAuthToken, clearAuthToken }