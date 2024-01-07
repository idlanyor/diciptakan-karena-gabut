import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
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
    return (<>
        <div className=" my-5 flex items-center justify-center px-6 w-full md:w-auto py-8 mx-auto  lg:py-0">
            <div className="w-full bg-white shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
                <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
                    <h1 className="text-xl text-center font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                        Registrasi Calon Peserta Didik Baru
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
                            <label htmlFor="nama_lengkap" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Nama Lengkap</label>
                            <input onChange={handleNameChange} type="text" name="nama_lengkap" id="nama_lengkap" className={`bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm  focus:ring-purple-600 focus:border-purple-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-purple-500 dark:focus:border-purple-500 ${validasi.nama_lengkap ? 'border-red-500' : ''}`} />
                            {validasi.nama_lengkap && (<span className="text-sm text-red-500">
                                {validasi.nama_lengkap}
                            </span>)}
                        </div>
                        <div>
                            <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Email</label>
                            <input onChange={handleEmailChange} type="email" name="email" id="email" className={`bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm  focus:ring-purple-600 focus:border-purple-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-purple-500 dark:focus:border-purple-500 ${validasi.email ? 'border-red-500' : ''}`} />
                            {validasi.email && (<span className="text-sm text-red-500">
                                {validasi.email}
                            </span>)}
                        </div>
                        <div>
                            <label htmlFor="tgl_lahir" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Tanggal Lahir</label>
                            <input onChange={handleTglLahirChange} type="date" name="tgl_lahir" id="tgl_lahir" className={`bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm  focus:ring-purple-600 focus:border-purple-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-purple-500 dark:focus:border-purple-500 ${validasi.tgl_lahir ? 'border-red-500' : ''}`} />
                            {validasi.tgl_lahir && (<span className="text-sm text-red-500">
                                {validasi.tgl_lahir}
                            </span>)}
                        </div>
                        <div>
                            <label htmlFor="jalur_pendaftaran" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                                Jalur Pendaftaran
                            </label>
                            <select onChange={handleJalurPendaftaranChange} name="jalur_pendaftaran" id="jalur_pendaftaran" value={jalur_pendaftaran} className={`bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm  focus:ring-purple-600 focus:border-purple-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-purple-500 dark:focus:border-purple-500`}>
                                <option value={0}>-- Pilih Jalur Pendaftaran --</option>
                                <option value={"Zonasi (Wilayah)"}>Zonasi (Wilayah)</option>
                                <option value={"Afirmasi"}>Afirmasi</option>
                                <option value={"Prestasi"}>Prestasi</option>
                                <option value={"Migrasi Orang tua"}>Migrasi Orang tua</option>
                            </select>
                        </div>
                        <button type="submit" className="w-full text-white bg-purple-600 hover:bg-purple-700 focus:ring-4 focus:outline-none focus:ring-purple-300 font-medium  text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-purple-700 dark:focus:ring-purple-800">Daftar Sekarang</button>
                        <p className="text-sm font-light text-gray-500 dark:text-white">
                            Sudah punya akun? <Link to={'/login'} className="font-medium text-purple-600 hover:underline dark:text-purple-500">Login</Link>
                        </p>
                    </form>
                </div>
            </div>
        </div>
    </>);
}
