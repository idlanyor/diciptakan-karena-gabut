import axios from "axios"
import { Modal } from "flowbite";
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
/**
 * 
 * @param {string} targetEl berisi selector dom modal yang akan diinteraksi
 * @param {string} idModal value id modal yang akan diinteraksi
 * @returns instansiasi objek Modal untuk mengakses property dan method yang ada didalamnya
 */
export const modal = (idModal) => {
    const targetEl = document.getElementById(idModal)
    const modalInstance = new Modal(targetEl, {
        placement: 'center',
        backdrop: 'dynamic',
        backdropClasses: 'bg-gray-900/50 dark:bg-gray-900/80 fixed inset-0 z-40',
        closable: true,
        onHide: () => {
            console.log('hidden')
        },
        onShow: () => {
            console.log('showing')
        },
        onToggle: () => {
            console.log('toggling')
        }
    }, {
        id: idModal,
        override: true
    })
    return modalInstance
}
