import Cookies from "js-cookie";

export const getCookie = (key: string) => {
    return JSON.parse(Cookies.get(key) || '{}')
}

export const setCookie = (key: string, value: object) => {
    // expires in 1 day
    return Cookies.set(key, JSON.stringify(value), { expires: 1 })
}

export const removeCookie = (key: string) => {
    return Cookies.remove(key);
}