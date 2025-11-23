import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaUser, FaEnvelope, FaCalendarAlt, FaMapMarkerAlt, FaUserPlus, FaCheckCircle, FaExclamationCircle } from "react-icons/fa";
import letSwall from "../Components/Sweetalert";
import ENDPOINT_PPDB from "../constants";
import { rosevelt } from "../Components/Reusable";

export default function Registrasi() {
    const navigasi = useNavigate();
    const [nama_lengkap, setNamaLengkap] = useState('');
    const [email, setEmail] = useState('');
    const [tgl_lahir, setTglLahir] = useState('');
    const [jalur_pendaftaran, setJalurPendaftaran] = useState('');
    const [showAlert, setAlert] = useState(true);
    const closeAlert = () => {
        setAlert(false);
    };
    const [validasi, setValidasi] = useState({
        nama_lengkap: false,
        email: false,
        tgl_lahir: false,
        code: 0,
        message: ''
    });
    const registerHandler = async (e) => {
        e.preventDefault();
        const requestData = {
            nama_lengkap: nama_lengkap,
            email: email,
            tgl_lahir: tgl_lahir,
            jalur_pendaftaran: jalur_pendaftaran
        };
        await rosevelt.post(ENDPOINT_PPDB + 'registrasi', requestData)
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
                    navigasi('/login')
                });
            }).catch((e) => {
                // console.log(e.response?.data)
                setValidasi(e.response?.data);
                setAlert(true);
            });
    };
    const handleNameChange = (e) => {
        setNamaLengkap(e.target.value);
        if (e.target.value != '') {
            setValidasi(prevState => ({ ...prevState, nama_lengkap: false }));
        }
    };
    const handleEmailChange = (e) => {
        setEmail(e.target.value);
        if (e.target.value != '') {
            setValidasi(prevState => ({ ...prevState, email: false }));
        }
    };
    const handleTglLahirChange = (e) => {
        setTglLahir(e.target.value);
        if (e.target.value != '') {
            setValidasi(prevState => ({ ...prevState, tgl_lahir: false }));
        }
    };
    const handleJalurPendaftaranChange = (e) => {
        setJalurPendaftaran(e.target.value);
    };
    useEffect(() => {
        const timer = setTimeout(() => {
            setAlert(false);
        }, 5000);
        return () => { clearTimeout(timer); };
    }, [showAlert]);
    return (
        <div className="min-h-screen flex items-center justify-center px-4 py-8 bg-gradient-to-br from-white via-blue-50 to-indigo-50 dark:from-gray-900 dark:via-blue-900/20 dark:to-indigo-900/20">
            <div className="w-full max-w-2xl">
                {/* Header */}
                <div className="text-center mb-8 animate-fade-in">
                    <div className="inline-flex items-center justify-center w-16 h-16 mb-4 rounded-2xl bg-gradient-to-br from-blue-600 to-indigo-600 text-white shadow-lg">
                        <FaUserPlus className="text-3xl" />
                    </div>
                    <h1 className="text-3xl md:text-4xl font-extrabold bg-gradient-to-r from-gray-900 to-gray-700 dark:from-white dark:to-gray-300 bg-clip-text text-transparent mb-2">
                        Registrasi PPDB
                    </h1>
                    <p className="text-gray-600 dark:text-gray-400">
                        Lengkapi data diri untuk mendaftar sebagai Calon Peserta Didik Baru
                    </p>
                </div>

                {/* Form Card */}
                <div className="bg-white dark:bg-gray-800/50 backdrop-blur-sm rounded-3xl shadow-2xl border-2 border-gray-100 dark:border-gray-700 p-6 md:p-10 animate-fade-in-up">
                    {/* Alert */}
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
                    <form onSubmit={registerHandler} className="space-y-6">
                        {/* Nama Lengkap */}
                        <div>
                            <label htmlFor="nama_lengkap" className="flex items-center gap-2 mb-2 text-sm font-semibold text-gray-900 dark:text-white">
                                <FaUser className="text-blue-600 dark:text-blue-400" />
                                Nama Lengkap
                            </label>
                            <div className="relative">
                                <input
                                    onChange={handleNameChange}
                                    type="text"
                                    name="nama_lengkap"
                                    id="nama_lengkap"
                                    placeholder="Masukkan nama lengkap"
                                    className={`w-full px-4 py-3 bg-gray-50 dark:bg-gray-700/50 border-2 rounded-xl text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500 transition-all duration-200 focus:outline-none focus:ring-4 ${
                                        validasi.nama_lengkap
                                            ? 'border-red-500 focus:border-red-500 focus:ring-red-200 dark:focus:ring-red-800'
                                            : 'border-gray-200 dark:border-gray-600 focus:border-blue-500 focus:ring-blue-200 dark:focus:ring-blue-800'
                                    }`}
                                />
                            </div>
                            {validasi.nama_lengkap && (
                                <p className="mt-2 text-sm text-red-600 dark:text-red-400 flex items-center gap-1">
                                    <FaExclamationCircle />
                                    {validasi.nama_lengkap}
                                </p>
                            )}
                        </div>

                        {/* Email */}
                        <div>
                            <label htmlFor="email" className="flex items-center gap-2 mb-2 text-sm font-semibold text-gray-900 dark:text-white">
                                <FaEnvelope className="text-blue-600 dark:text-blue-400" />
                                Email
                            </label>
                            <div className="relative">
                                <input
                                    onChange={handleEmailChange}
                                    type="email"
                                    name="email"
                                    id="email"
                                    placeholder="nama@email.com"
                                    className={`w-full px-4 py-3 bg-gray-50 dark:bg-gray-700/50 border-2 rounded-xl text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500 transition-all duration-200 focus:outline-none focus:ring-4 ${
                                        validasi.email
                                            ? 'border-red-500 focus:border-red-500 focus:ring-red-200 dark:focus:ring-red-800'
                                            : 'border-gray-200 dark:border-gray-600 focus:border-blue-500 focus:ring-blue-200 dark:focus:ring-blue-800'
                                    }`}
                                />
                            </div>
                            {validasi.email && (
                                <p className="mt-2 text-sm text-red-600 dark:text-red-400 flex items-center gap-1">
                                    <FaExclamationCircle />
                                    {validasi.email}
                                </p>
                            )}
                        </div>

                        {/* Tanggal Lahir */}
                        <div>
                            <label htmlFor="tgl_lahir" className="flex items-center gap-2 mb-2 text-sm font-semibold text-gray-900 dark:text-white">
                                <FaCalendarAlt className="text-blue-600 dark:text-blue-400" />
                                Tanggal Lahir
                            </label>
                            <div className="relative">
                                <input
                                    onChange={handleTglLahirChange}
                                    type="date"
                                    name="tgl_lahir"
                                    id="tgl_lahir"
                                    className={`w-full px-4 py-3 bg-gray-50 dark:bg-gray-700/50 border-2 rounded-xl text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500 transition-all duration-200 focus:outline-none focus:ring-4 ${
                                        validasi.tgl_lahir
                                            ? 'border-red-500 focus:border-red-500 focus:ring-red-200 dark:focus:ring-red-800'
                                            : 'border-gray-200 dark:border-gray-600 focus:border-blue-500 focus:ring-blue-200 dark:focus:ring-blue-800'
                                    }`}
                                />
                            </div>
                            {validasi.tgl_lahir && (
                                <p className="mt-2 text-sm text-red-600 dark:text-red-400 flex items-center gap-1">
                                    <FaExclamationCircle />
                                    {validasi.tgl_lahir}
                                </p>
                            )}
                        </div>

                        {/* Jalur Pendaftaran */}
                        <div>
                            <label htmlFor="jalur_pendaftaran" className="flex items-center gap-2 mb-2 text-sm font-semibold text-gray-900 dark:text-white">
                                <FaMapMarkerAlt className="text-blue-600 dark:text-blue-400" />
                                Jalur Pendaftaran
                            </label>
                            <div className="relative">
                                <select
                                    onChange={handleJalurPendaftaranChange}
                                    name="jalur_pendaftaran"
                                    id="jalur_pendaftaran"
                                    value={jalur_pendaftaran}
                                    className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-700/50 border-2 border-gray-200 dark:border-gray-600 rounded-xl text-gray-900 dark:text-white transition-all duration-200 focus:outline-none focus:ring-4 focus:border-blue-500 focus:ring-blue-200 dark:focus:ring-blue-800 cursor-pointer"
                                >
                                    <option value={0}>-- Pilih Jalur Pendaftaran --</option>
                                    <option value={"Zonasi (Wilayah)"}>Zonasi (Wilayah)</option>
                                    <option value={"Afirmasi"}>Afirmasi</option>
                                    <option value={"Prestasi"}>Prestasi</option>
                                    <option value={"Migrasi Orang tua"}>Migrasi Orang tua</option>
                                </select>
                            </div>
                        </div>

                        {/* Submit Button */}
                        <button
                            type="submit"
                            className="group w-full flex items-center justify-center gap-2 px-6 py-4 text-base font-semibold text-white bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 dark:from-blue-500 dark:to-indigo-500 dark:hover:from-blue-600 dark:hover:to-indigo-600 rounded-xl shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 transition-all duration-200 focus:ring-4 focus:ring-blue-300 dark:focus:ring-blue-800"
                        >
                            <FaCheckCircle className="text-lg" />
                            Daftar Sekarang
                            <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-200" fill="currentColor" viewBox="0 0 20 20">
                                <path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd" />
                            </svg>
                        </button>

                        {/* Login Link */}
                        <div className="text-center pt-4 border-t-2 border-gray-100 dark:border-gray-700">
                            <p className="text-sm text-gray-600 dark:text-gray-400">
                                Sudah punya akun?{' '}
                                <Link
                                    to={'/login'}
                                    className="font-semibold text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300 transition-colors"
                                >
                                    Login di sini
                                </Link>
                            </p>
                        </div>
                    </form>
                </div>

                {/* Info Box */}
                <div className="mt-6 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-2xl border-2 border-blue-200 dark:border-blue-800 animate-fade-in">
                    <div className="flex items-start gap-3">
                        <FaCheckCircle className="text-blue-600 dark:text-blue-400 text-xl flex-shrink-0 mt-0.5" />
                        <div>
                            <h4 className="text-sm font-semibold text-gray-900 dark:text-white mb-1">Informasi Penting</h4>
                            <p className="text-xs text-gray-600 dark:text-gray-300">
                                Pastikan data yang Anda masukkan sudah benar. Email akan digunakan untuk login dan notifikasi penting terkait pendaftaran.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
