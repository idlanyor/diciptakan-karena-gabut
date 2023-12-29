/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import ENDPOINT_PPDB from "../constants";
import letSwall from "../Components/Sweetalert";
import { getTokenPendaftar } from "../Components/Reusable";
export default function RegistrasiPanel() {
    const navigasi = useNavigate()
    const [nama, setNamaLengkap] = useState('');
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [jabatan, setJabatan] = useState('');
    const [showAlert, setAlert] = useState(true);
    const closeAlert = () => {
        setAlert(false);
    };
    const ping = () => {
        axios.defaults.headers.common['Authorization'] = `Bearer ${getTokenPendaftar()}`;
        axios.get(ENDPOINT_PPDB + 'ping')
            .then((res) => {
                if (res.data.logged_in && res.data.tipe === 'panel') {
                    navigasi('/panel/login')
                } else {
                    if (res.data.tipe === 'panel') {
                        console.log(res.data.user)
                    } else if (res.data.tipe) {
                        console.log('panel only')
                    }
                }
            })
            .catch(e => console.log(e));
    }
    useEffect(() => {
        ping();

    },
        [])
    const [validasi, setValidasi] = useState({ username: false, password: false, jabatan: false, nama: false, code: 0, message: '' });
    const registerHandler = async (e) => {
        e.preventDefault();
        const requestData = {
            nama: nama,
            username: username,
            password: password,
            jabatan: jabatan
        };
        await axios.post(`${ENDPOINT_PPDB}panel/registrasi`, requestData)
            .then(() => {
                letSwall.fire({
                    titleText: "Sukses",
                    text: "Registrasi berhasil,mengalihkan....",
                    icon: 'success',
                    timer: 1500,
                    timerProgressBar: true,
                    showConfirmButton: false,
                    showCloseButton: false,
                }).then(() => {
                    navigasi('/panel')
                });
            }).catch((e) => {
                console.log(e.response?.data);
                setValidasi(e.response?.data);
                setAlert(true);
            });
    };
    const handleNameChange = (e) => {
        setNamaLengkap(e.target.value);
        if (e.target.value != '') {
            setValidasi(prevState => ({ ...prevState, nama: false }));
        }
    };
    const handleUsernameChange = (e) => {
        setUsername(e.target.value);
        if (e.target.value != '') {
            setValidasi(prevState => ({ ...prevState, username: false }));
        }
    };
    const handleJabatanChange = (e) => {
        setJabatan(e.target.value);
    };
    const handlePasswordChange = (e) => {
        setPassword(e.target.value);
        if (e.target.value != '') {
            setValidasi(prevState => ({ ...prevState, password: false }));
        }
    };
    useEffect(() => {
        const timer = setTimeout(() => {
            setAlert(false);
        }, 5000);
        return () => { clearTimeout(timer); };
    }, [showAlert]);
    return (<section className="bg-purple-400 dark:bg-gray-900">
        <div className="h-screen flex items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">

            <div className="w-full bg-white shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
                <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
                    <h1 className="text-xl text-center font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                        Registrasi
                    </h1>
                    {validasi.code === 401 && showAlert && (<div id="alert-2" role="alert" className="flex items-center p-4 mb-4 text-red-800  bg-red-50 dark:bg-gray-800 dark:text-red-400">
                        <svg className="flex-shrink-0 w-4 h-4" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                            <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5ZM9.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM12 15H8a1 1 0 0 1 0-2h1v-3H8a1 1 0 0 1 0-2h2a1 1 0 0 1 1 1v4h1a1 1 0 0 1 0 2Z" />
                        </svg>
                        <span className="sr-only">Info</span>
                        <div className="ms-3 text-sm font-medium">
                            {validasi.message}
                        </div>
                        <button type="button" onClick={closeAlert} className="ms-auto -mx-1.5 -my-1.5 bg-red-50 text-red-500  focus:ring-2 focus:ring-red-400 p-1.5 hover:bg-red-200 inline-flex items-center justify-center h-8 w-8 dark:bg-gray-800 dark:text-red-400 dark:hover:bg-gray-700" data-dismiss-target="#alert-2" aria-label="Close">
                            <span className="sr-only">Close</span>
                            <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6" />
                            </svg>
                        </button>
                    </div>)}

                    <form onSubmit={registerHandler} className="space-y-4 md:space-y-6">
                        <div>
                            <label htmlFor="nama" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Nama Lengkap</label>
                            <input onChange={handleNameChange} type="text" name="nama" id="nama" className={`bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm  focus:ring-purple-600 focus:border-purple-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-purple-500 dark:focus:border-purple-500 ${validasi.nama ? 'border-red-500' : ''}`} />
                            {validasi.nama && (<span className="text-sm text-red-500">
                                {validasi.nama}
                            </span>)}
                        </div>
                        <div>
                            <label htmlFor="username" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Username</label>
                            <input onChange={handleUsernameChange} type="text" name="username" id="username" className={`bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm  focus:ring-purple-600 focus:border-purple-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-purple-500 dark:focus:border-purple-500 ${validasi.username ? 'border-red-500' : ''}`} />
                            {validasi.username && (<span className="text-sm text-red-500">
                                {validasi.username}
                            </span>)}
                        </div>
                        <div>
                            <label htmlFor="jabatan" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                                Jabatan
                            </label>
                            <select onChange={handleJabatanChange} name="jabatan" id="jabatan" value={jabatan} className={`bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm  focus:ring-purple-600 focus:border-purple-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-purple-500 dark:focus:border-purple-500 ${validasi.jabatan ? 'border-red-500' : ''}`}>
                                <option value="">Pilih Role</option>
                                <option value="Operator">Operator</option>
                                <option value="Petugas">Petugas</option>
                            </select>
                        </div>
                        <div>
                            <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Password</label>
                            <input onChange={handlePasswordChange} type="password" name="password" id="password" className={`bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm  focus:ring-purple-600 focus:border-purple-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-purple-500 dark:focus:border-purple-500 ${validasi.password ? 'border-red-500' : ''}`} />
                            {validasi.password && (<span className="text-sm text-red-500">
                                {validasi.password}
                            </span>)}
                        </div>

                        <button type="submit" className="w-full text-white bg-purple-600 hover:bg-purple-700 focus:ring-4 focus:outline-none focus:ring-purple-300 font-medium  text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-purple-700 dark:focus:ring-purple-800">Daftar</button>
                        <p className="text-sm font-light text-gray-500 dark:text-white">
                            Sudah punya akun? <Link to={'/registrasi'} className="font-medium text-purple-600 hover:underline dark:text-purple-500">Masuk</Link>
                        </p>
                    </form>
                </div>
            </div>
        </div>
    </section>);
}
