import Cookies from "js-cookie";
import { FetcherOptions } from "./types";


function updateOptions(options: FetcherOptions) {
    const update = { ...options };
    const token = Cookies.get('starter_auth_token');
    if (token) {
      update.headers = {
        ...update.headers,
        Authorization: `Bearer ${token}`,
      };
    }
    return update;
}

export default function fetcher(url: string, options?: FetcherOptions | undefined | null) {
    return fetch(url, updateOptions(options))
}
