import NotFoundSVG from '../assets/notfound.svg'
import { Link } from "react-router-dom";
import { FaHome, FaSearch, FaArrowLeft } from "react-icons/fa";

export default function NotFound() {
    return (
        <section className="relative bg-gradient-to-br from-white via-blue-50 to-indigo-50 dark:from-gray-900 dark:via-blue-900/20 dark:to-indigo-900/20 min-h-screen flex items-center overflow-hidden">
            {/* Decorative background elements */}
            <div className="absolute top-0 right-0 w-96 h-96 bg-blue-200 dark:bg-blue-700 rounded-full opacity-20 blur-3xl -mr-48 -mt-48"></div>
            <div className="absolute bottom-0 left-0 w-96 h-96 bg-indigo-200 dark:bg-indigo-700 rounded-full opacity-20 blur-3xl -ml-48 -mb-48"></div>

            <div className="relative py-8 px-4 mx-auto max-w-screen-xl lg:py-16 lg:px-6 w-full">
                <div className="mx-auto max-w-screen-md flex flex-col items-center">
                    {/* 404 Large Text */}
                    <div className="mb-8 animate-fade-in">
                        <h1 className="text-9xl md:text-[12rem] font-extrabold bg-gradient-to-r from-blue-600 to-indigo-600 dark:from-blue-400 dark:to-indigo-400 bg-clip-text text-transparent leading-none">
                            404
                        </h1>
                    </div>

                    {/* Title */}
                    <div className="text-center animate-fade-in-up" style={{animationDelay: '0.2s'}}>
                        <h2 className="mb-4 text-3xl md:text-4xl lg:text-5xl tracking-tight font-extrabold text-gray-900 dark:text-white">
                            Halaman Tidak Ditemukan
                        </h2>
                        <p className="mb-2 text-xl font-semibold text-blue-600 dark:text-blue-400">
                            Oops! Ada yang hilang...
                        </p>
                    </div>

                    {/* Description */}
                    <p className="mb-8 text-base md:text-lg text-center text-gray-600 dark:text-gray-300 max-w-xl leading-relaxed animate-fade-in-up" style={{animationDelay: '0.3s'}}>
                        Maaf, halaman yang Anda cari tidak dapat ditemukan. Mungkin halaman tersebut telah dipindahkan atau URL yang Anda masukkan salah.
                        Silakan kembali ke beranda atau cari informasi yang Anda butuhkan.
                    </p>

                    {/* Action Buttons */}
                    <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto animate-fade-in-up" style={{animationDelay: '0.4s'}}>
                        <Link
                            to="/"
                            className="group inline-flex items-center justify-center gap-2 px-6 py-4 text-base font-semibold text-white bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 dark:from-blue-500 dark:to-indigo-500 dark:hover:from-blue-600 dark:hover:to-indigo-600 rounded-xl shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 transition-all duration-200 focus:ring-4 focus:ring-blue-300 dark:focus:ring-blue-800"
                        >
                            <FaHome className="text-lg" />
                            Kembali ke Beranda
                            <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-200" fill="currentColor" viewBox="0 0 20 20">
                                <path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd"></path>
                            </svg>
                        </Link>

                        <button
                            onClick={() => window.history.back()}
                            className="inline-flex items-center justify-center gap-2 px-6 py-4 text-base font-semibold text-gray-700 dark:text-white bg-white dark:bg-gray-800/50 border-2 border-gray-200 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-700/50 rounded-xl shadow-md hover:shadow-lg transform hover:-translate-y-0.5 transition-all duration-200 focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-700"
                        >
                            <FaArrowLeft className="text-lg" />
                            Kembali
                        </button>
                    </div>

                    {/* Quick Links */}
                    <div className="mt-12 p-6 bg-white dark:bg-gray-800/50 rounded-2xl shadow-lg border border-gray-200 dark:border-gray-700 w-full max-w-2xl animate-fade-in-up" style={{animationDelay: '0.5s'}}>
                        <div className="flex items-center gap-2 mb-4">
                            <FaSearch className="text-blue-600 dark:text-blue-400" />
                            <h3 className="text-lg font-bold text-gray-900 dark:text-white">
                                Halaman Populer
                            </h3>
                        </div>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                            <Link
                                to="/registrasi"
                                className="p-3 text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 bg-gray-50 dark:bg-gray-700/50 hover:bg-blue-50 dark:hover:bg-blue-900/20 rounded-lg transition-all duration-200 font-medium"
                            >
                                → Registrasi PPDB
                            </Link>
                            <Link
                                to="/jadwal-pendaftaran"
                                className="p-3 text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 bg-gray-50 dark:bg-gray-700/50 hover:bg-blue-50 dark:hover:bg-blue-900/20 rounded-lg transition-all duration-200 font-medium"
                            >
                                → Jadwal Pendaftaran
                            </Link>
                            <Link
                                to="/rincian-biaya"
                                className="p-3 text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 bg-gray-50 dark:bg-gray-700/50 hover:bg-blue-50 dark:hover:bg-blue-900/20 rounded-lg transition-all duration-200 font-medium"
                            >
                                → Rincian Biaya
                            </Link>
                            <Link
                                to="/pengumuman"
                                className="p-3 text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 bg-gray-50 dark:bg-gray-700/50 hover:bg-blue-50 dark:hover:bg-blue-900/20 rounded-lg transition-all duration-200 font-medium"
                            >
                                → Pengumuman
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
