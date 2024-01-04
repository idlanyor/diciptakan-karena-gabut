import axios from "axios"
// import { Modal } from "flowbite";
import ENDPOINT_PPDB from "../constants"

export const getTokenPanel = () => {
    return localStorage.getItem('tokenPanel')
}
export const delTokenPanel = () => {
    return localStorage.removeItem('tokenPanel')
}
export const setTokenPanel = (value) => {
    return localStorage.setItem('tokenPanel', value)
}

export const getTokenPendaftar = () => {
    return localStorage.getItem('tokenPendaftar')
}
export const delTokenPendaftar = () => {
    return localStorage.removeItem('tokenPendaftar')
}
export const setTokenPendaftar = (value) => {
    return localStorage.setItem('tokenPendaftar', value)
}
export const rosevelt = axios.create({
    baseURL: ENDPOINT_PPDB
})

// export const modal = new Modal()
