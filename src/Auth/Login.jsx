/* eslint-disable react-hooks/exhaustive-deps */
import { FaSignInAlt } from "react-icons/fa";
import { useState, useEffect } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import ENDPOINT_PPDB from "../constants";
import { getTokenPendaftar, setTokenPendaftar } from "../Components/Reusable";
export default function Login() {
    const navigasi = useNavigate()
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showAlert, setAlert] = useState(true);
    const [isLoading, setLoading] = useState(false);
    const closeAlert = () => {
        setAlert(false);
    };
    const ping = () => {
        axios.defaults.headers.common['Authorization'] = `Bearer ${getTokenPendaftar()}`;
        axios.get(ENDPOINT_PPDB + 'ping')
            .then((res) => {
                if (res.data.logged_in) {
                    navigasi('/dashboard')
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

    }, [])
    const [validasi, setValidasi] = useState({ email: false, password: false, code: 0, message: '' });
    const loginHandler = async (e) => {
        e.preventDefault();
        setLoading(true);
        const requestData = {
            email: email,
            password: password
        };
        await axios.post(ENDPOINT_PPDB + 'login', requestData)
            .then((response) => {
                setTokenPendaftar(response.data.token)
                navigasi('/dashboard')
                setLoading(false);
            }).catch((e) => {
                // console.log(e.response?.data)
                setValidasi(e.response?.data);
                setAlert(true);
                setLoading(false);
            });
    };
    const handleEmailChange = (e) => {
        setEmail(e.target.value);
        if (e.target.value != '') {
            setValidasi(prevState => ({ ...prevState, email: false }));
        }
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
        <div className="flex items-center h-screen justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">

            <div className="w-full bg-white shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
                <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
                    <h1 className="text-xl text-center font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                        Login
                    </h1>
                    <div className="p-4 mb-4 text-sm text-blue-800 bg-blue-50 dark:bg-gray-600 dark:text-blue-400" role="alert">
                        <span className="font-medium">Silahkan login menggunakan Email dan tanggal lahir Anda dengan format <strong>DDMMYYYY</strong></span>
                    </div>
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

                    <form onSubmit={loginHandler} className="space-y-4 md:space-y-6">
                        <div>
                            <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Email</label>
                            <input onChange={handleEmailChange} type="email" name="email" id="email" className={`bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm  focus:ring-purple-600 focus:border-purple-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-purple-500 dark:focus:border-purple-500 ${validasi.email ? 'border-red-500' : ''}`} />
                            {validasi.email && (<span className="text-sm text-red-500">
                                {validasi.email}
                            </span>)}
                        </div>
                        <div>
                            <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Password</label>
                            <input onChange={handlePasswordChange} type="password" name="password" id="password" className={`bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm  focus:ring-purple-600 focus:border-purple-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-purple-500 dark:focus:border-purple-500 ${validasi.password ? 'border-red-500' : ''}`} />
                            {validasi.password && (<span className="text-sm text-red-500">
                                {validasi.password}
                            </span>)}
                        </div>

                        <button type="submit" disabled={isLoading} className="w-fit flex justify-center text-white bg-purple-600 hover:bg-purple-700 focus:ring-4 focus:outline-none focus:ring-purple-300 font-medium  text-sm px-5 py-2.5 text-center dark:bg-purple-600 dark:hover:bg-purple-700 dark:focus:ring-purple-800">
                            {isLoading ? (<div role="status" className="flex space-x-2">
                                <svg aria-hidden="true" className="w-5 text-gray-200 animate-spin dark:text-gray-600 fill-purple-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor" />
                                    <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill" />
                                </svg>
                                <span>Memproses...</span>
                            </div>) : (<>
                                <FaSignInAlt />&nbsp;
                                Masuk
                            </>)}
                        </button>
                        <p className="text-sm font-light text-gray-500 dark:text-gray-400">
                            Belum mendaftar? <Link to={'/registrasi'} className="font-medium text-purple-600 hover:underline dark:text-purple-500">Daftar Sekarang</Link>
                        </p>
                    </form>
                </div>
            </div>
        </div>
    </section>);
}
