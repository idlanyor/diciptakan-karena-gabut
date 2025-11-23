import { FaSignInAlt, FaUser, FaLock, FaExclamationCircle, FaShieldAlt } from "react-icons/fa";
import { useState, useEffect } from "react";
import axios from "axios";
import Swall from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import { Link, useNavigate } from "react-router-dom";
import ENDPOINT_PPDB from "../constants";
import { setTokenPanel } from "../Components/Reusable";

const letSwall = withReactContent(Swall);

export default function Login() {
    const navigasi = useNavigate();
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [showAlert, setAlert] = useState(true);
    const [isLoading, setLoading] = useState(false);
    const closeAlert = () => {
        setAlert(false);
    };

    const [validasi, setValidasi] = useState({ username: false, password: false, code: 0, message: '' });
    const loginHandler = async (e) => {
        e.preventDefault();
        setLoading(true);
        const requestData = {
            username: username,
            password: password
        };
        await axios.post(ENDPOINT_PPDB + 'panel/login', requestData)
            .then((response) => {
                // console.log(response)
                setTokenPanel(response.data.token)
                letSwall.fire({
                    title: "Sukses",
                    text: "Login berhasil,mengalihkan...",
                    icon: 'success',
                    timer: 1500,
                    timerProgressBar: true
                }).then(() => {
                    navigasi('/panel/dashboard')
                });
                setLoading(false);
            }).catch((e) => {
                // console.log(e.response?.data)
                setValidasi(e.response?.data);
                setAlert(true);
                setLoading(false);
            });
    };
    const handleUsernameChange = (e) => {
        setUsername(e.target.value);
        if (e.target.value != '') {
            setValidasi(prevState => ({ ...prevState, username: false }));
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
    return (
        <section className="min-h-screen flex items-center justify-center px-4 py-8 bg-gradient-to-br from-purple-50 via-indigo-50 to-pink-50 dark:from-gray-900 dark:via-purple-900/20 dark:to-indigo-900/20">
            <div className="w-full max-w-xl">
                {/* Header */}
                <div className="text-center mb-8 animate-fade-in">
                    <div className="inline-flex items-center justify-center w-16 h-16 mb-4 rounded-2xl bg-gradient-to-br from-purple-600 to-pink-600 text-white shadow-lg">
                        <FaShieldAlt className="text-3xl" />
                    </div>
                    <h1 className="text-3xl md:text-4xl font-extrabold bg-gradient-to-r from-purple-600 to-pink-600 dark:from-purple-400 dark:to-pink-400 bg-clip-text text-transparent mb-2">
                        Admin Panel
                    </h1>
                    <p className="text-gray-600 dark:text-gray-400">
                        Login sebagai Administrator PPDB
                    </p>
                </div>

                {/* Form Card */}
                <div className="bg-white dark:bg-gray-800/50 backdrop-blur-sm rounded-3xl shadow-2xl border-2 border-purple-100 dark:border-purple-900/50 p-6 md:p-10 animate-fade-in-up">
                    {/* Error Alert */}
                    {validasi.code === 401 && showAlert && (
                        <div className="mb-6 p-4 bg-red-50 dark:bg-red-900/20 border-2 border-red-200 dark:border-red-800 rounded-xl flex items-start gap-3 animate-fade-in">
                            <FaExclamationCircle className="text-red-500 dark:text-red-400 text-xl flex-shrink-0 mt-0.5" />
                            <div className="flex-grow">
                                <p className="text-sm font-medium text-red-800 dark:text-red-300">
                                    {validasi.message}
                                </p>
                            </div>
                            <button
                                type="button"
                                onClick={closeAlert}
                                className="text-red-500 dark:text-red-400 hover:text-red-700 dark:hover:text-red-300 transition-colors"
                            >
                                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                                    <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                                </svg>
                            </button>
                        </div>
                    )}

                    {/* Form */}
                    <form onSubmit={loginHandler} className="space-y-6">
                        {/* Username */}
                        <div>
                            <label htmlFor="username" className="flex items-center gap-2 mb-2 text-sm font-semibold text-gray-900 dark:text-white">
                                <FaUser className="text-purple-600 dark:text-purple-400" />
                                Username
                            </label>
                            <div className="relative">
                                <input
                                    onChange={handleUsernameChange}
                                    type="text"
                                    name="username"
                                    id="username"
                                    placeholder="Masukkan username"
                                    className={`w-full px-4 py-3 bg-gray-50 dark:bg-gray-700/50 border-2 rounded-xl text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500 transition-all duration-200 focus:outline-none focus:ring-4 ${
                                        validasi.username
                                            ? 'border-red-500 focus:border-red-500 focus:ring-red-200 dark:focus:ring-red-800'
                                            : 'border-gray-200 dark:border-gray-600 focus:border-purple-500 focus:ring-purple-200 dark:focus:ring-purple-800'
                                    }`}
                                />
                            </div>
                            {validasi.username && (
                                <p className="mt-2 text-sm text-red-600 dark:text-red-400 flex items-center gap-1">
                                    <FaExclamationCircle />
                                    {validasi.username}
                                </p>
                            )}
                        </div>

                        {/* Password */}
                        <div>
                            <label htmlFor="password" className="flex items-center gap-2 mb-2 text-sm font-semibold text-gray-900 dark:text-white">
                                <FaLock className="text-purple-600 dark:text-purple-400" />
                                Password
                            </label>
                            <div className="relative">
                                <input
                                    onChange={handlePasswordChange}
                                    type="password"
                                    name="password"
                                    id="password"
                                    placeholder="Masukkan password"
                                    className={`w-full px-4 py-3 bg-gray-50 dark:bg-gray-700/50 border-2 rounded-xl text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500 transition-all duration-200 focus:outline-none focus:ring-4 ${
                                        validasi.password
                                            ? 'border-red-500 focus:border-red-500 focus:ring-red-200 dark:focus:ring-red-800'
                                            : 'border-gray-200 dark:border-gray-600 focus:border-purple-500 focus:ring-purple-200 dark:focus:ring-purple-800'
                                    }`}
                                />
                            </div>
                            {validasi.password && (
                                <p className="mt-2 text-sm text-red-600 dark:text-red-400 flex items-center gap-1">
                                    <FaExclamationCircle />
                                    {validasi.password}
                                </p>
                            )}
                        </div>

                        {/* Submit Button */}
                        <button
                            type="submit"
                            disabled={isLoading}
                            className="group w-full flex items-center justify-center gap-2 px-6 py-4 text-base font-semibold text-white bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 dark:from-purple-500 dark:to-pink-500 dark:hover:from-purple-600 dark:hover:to-pink-600 rounded-xl shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 transition-all duration-200 focus:ring-4 focus:ring-purple-300 dark:focus:ring-purple-800 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
                        >
                            {isLoading ? (
                                <div className="flex items-center gap-2">
                                    <svg className="w-5 h-5 animate-spin" viewBox="0 0 24 24" fill="none">
                                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                                    </svg>
                                    <span>Memproses...</span>
                                </div>
                            ) : (
                                <>
                                    <FaSignInAlt className="text-lg" />
                                    Masuk
                                    <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-200" fill="currentColor" viewBox="0 0 20 20">
                                        <path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd" />
                                    </svg>
                                </>
                            )}
                        </button>

                        {/* Register Link */}
                        <div className="text-center pt-4 border-t-2 border-gray-100 dark:border-gray-700">
                            <p className="text-sm text-gray-600 dark:text-gray-400">
                                Belum punya akun?{' '}
                                <Link
                                    to={'/panel/registrasi'}
                                    className="font-semibold text-purple-600 hover:text-purple-700 dark:text-purple-400 dark:hover:text-purple-300 transition-colors"
                                >
                                    Daftar Sekarang
                                </Link>
                            </p>
                        </div>
                    </form>
                </div>
            </div>
        </section>
    );
}
