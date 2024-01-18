/* eslint-disable no-unused-vars */
import axios from "axios";
import React, { useEffect, useMemo, useState } from "react";
import ENDPOINT_PPDB from "../../constants";
import letSwall from "../../Components/Sweetalert";
import { getTokenPendaftar } from "../../Components/Reusable";
import { useNavigate } from "react-router-dom";
export default function AkunPendaftar() {
    const [dataPendaftar, setDataPendaftar] = useState();
    const navigasi = useNavigate();
    useEffect(() => {
        const getDataPendaftar = async () => {
            axios.defaults.headers.common['Authorization'] = `Bearer ${getTokenPendaftar()}`;
            await axios.get(ENDPOINT_PPDB + 'pendaftar').then((res) => {
                setDataPendaftar(res.data.data);
            });
        };
        getDataPendaftar();
    }, []);
    // State untuk nilai input
    const [inputValues, setInputValues] = useState({
        email: '',
        nama_lengkap: '',
        tgl_lahir: '',
        password: ''
    });
    const firstData = useMemo(() => {
        return dataPendaftar ? dataPendaftar : { email: '', id: 0, nama_lengkap: '', tgl_lahir: '' };
    }, [dataPendaftar]);
    useEffect(() => {
        const pwdDefault = (tanggal) => {
            const date = new Date(tanggal);
            const day = ("0" + date.getDate()).slice(-2); // Ambil hari dengan format dua digit (misalnya: 01)
            const month = ("0" + (date.getMonth() + 1)).slice(-2); // Ambil bulan dengan format dua digit (misalnya: 05)
            const year = date.getFullYear().toString(); // Ambil tahun
            return `${day}${month}${year}`; // Menggabungkan hari, bulan, dan tahun tanpa tanda pemisah
        };
        setInputValues({
            email: firstData.email,
            nama_lengkap: firstData.nama_lengkap,
            tgl_lahir: firstData.tgl_lahir,
            password: ''
        });
    }, [firstData]);
    // Handler untuk perubahan input
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setInputValues({
            ...inputValues,
            [name]: value
        });
    };
    // let dataToSend = {
    //     ...inputValues,
    //     // Hanya update password jika tidak kosong
    //     password: inputValues.password !== '' && inputValues.password !== undefined ? inputValues.password : undefined
    // };
    // dataToSend = Object.fromEntries(Object.entries(dataToSend).filter(([_, v]) => v !== undefined));

    // Handler untuk mengirim data ke server
    const handleSubmit = async (e) => {
        e.preventDefault();
        let dataToSend = { ...inputValues };
        if (dataToSend.password === '' || dataToSend.password === undefined) {
            const { password, ...rest } = dataToSend
            dataToSend = { ...rest }
        }
        try {
            axios.defaults.headers.common['Authorization'] = `Bearer ${getTokenPendaftar()}`;
            await axios.put(ENDPOINT_PPDB + 'pendaftar', dataToSend);
            // Berhasil mengirim, lakukan sesuatu (redirect, tampilkan pesan sukses, dll.)
            console.log('Data berhasil dikirim:', dataToSend);
            letSwall.fire({
                title: "Berhasil",
                text: "Data berhasil diperbarui",
                icon: 'success',
                timer: 1500,
                timerProgressBar: true,
                customClass: {
                    popup: 'bg-gray-50 dark:bg-slate-900'
                }
            });
            navigasi('/dashboard')
        }
        catch (error) {
            console.error('Terjadi kesalahan:', error);
        }
    };
    return (<div className="block p-6 bg-white border border-gray-200  shadow  dark:bg-gray-800 dark:border-gray-700 ">
        <div className="py-2 px-4 mx-auto lg:py-4">
            <h2 className="mb-4 text-xl font-bold text-gray-900 dark:text-white">Update Data Akun</h2>
            <form onSubmit={handleSubmit}>
                <div className="grid gap-4 sm:grid-cols-2 sm:gap-6">
                    <div className="w-full">
                        <label htmlFor="nama_lengkap" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Nama Lengkap</label>
                        <input onChange={handleInputChange} type="text" value={inputValues.nama_lengkap} name="nama_lengkap" id="nama_lengkap" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm  focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" />
                    </div>
                    <div className="w-full">
                        <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Email</label>
                        <input onChange={handleInputChange} type="email" value={inputValues.email} name="email" id="email" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm  focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" />
                    </div>
                    <div className="w-full">
                        <label htmlFor="tgl_lahir" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Tanggal Lahir</label>
                        <input onChange={handleInputChange} type="date" value={inputValues.tgl_lahir} name="tgl_lahir" id="tgl_lahir" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm  focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" />
                    </div>
                    <div>
                        <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Password</label>
                        <input onChange={handleInputChange} type="password" name="password" value={inputValues.password} id="password" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm  focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" />
                    </div>
                </div>
                <button type="submit" className="inline-flex items-center px-5 py-2.5 mt-4 sm:mt-6 text-sm font-medium text-center text-white bg-primary-700  focus:ring-4 focus:ring-primary-200 dark:focus:ring-primary-900 hover:bg-primary-800">
                    Update Data
                </button>
            </form>
        </div>
    </div>);
}
