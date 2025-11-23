import { Link } from "react-router-dom";
import Edu from '../assets/education.svg'
import { FaAddressCard, FaBullhorn, FaTeamspeak, } from "react-icons/fa";
import { FaCalendarDays, FaCircleInfo, FaListCheck } from "react-icons/fa6";
export default function Depan() {
    return (
        <>
            <section className="relative overflow-hidden bg-gradient-to-br from-blue-50 via-white to-blue-50 dark:from-blue-900 dark:via-blue-800 dark:to-indigo-900 rounded-3xl shadow-xl m-5 transition-all duration-300">
                {/* Decorative background elements */}
                <div className="absolute top-0 right-0 -mt-10 -mr-10 w-64 h-64 bg-blue-200 dark:bg-blue-700 rounded-full opacity-20 blur-3xl"></div>
                <div className="absolute bottom-0 left-0 -mb-10 -ml-10 w-80 h-80 bg-indigo-200 dark:bg-indigo-600 rounded-full opacity-20 blur-3xl"></div>

                <div className="relative lg:grid flex text-center flex-col-reverse max-w-screen-xl px-4 py-12 mx-auto lg:gap-12 xl:gap-16 lg:py-20 lg:grid-cols-12">
                    <div className="mr-auto mt-8 place-self-center lg:col-span-7 lg:text-left animate-fade-in">
                        <div className="inline-block mb-4 px-4 py-2 bg-blue-100 dark:bg-blue-700/50 rounded-full">
                            <span className="text-sm font-semibold text-blue-600 dark:text-blue-200">Tahun Ajaran 2024/2025</span>
                        </div>
                        <h1 className="max-w-2xl mb-4 text-4xl font-extrabold tracking-tight leading-tight md:text-5xl xl:text-6xl bg-gradient-to-r from-blue-600 to-indigo-600 dark:from-blue-300 dark:to-indigo-300 bg-clip-text text-transparent animate-slide-in-left">
                            Portal PPDB
                        </h1>
                        <h1 className="max-w-2xl mb-6 text-4xl font-extrabold tracking-tight leading-tight md:text-5xl xl:text-6xl text-gray-800 dark:text-white animate-slide-in-left" style={{animationDelay: '0.1s'}}>
                            SMP Negeri 48 Rosevelt
                        </h1>
                        <p className="max-w-2xl mb-8 font-normal text-gray-600 lg:mb-10 md:text-lg lg:text-xl dark:text-gray-200 leading-relaxed animate-slide-in-left" style={{animationDelay: '0.2s'}}>
                            Bergabunglah dengan keluarga besar SMP Negeri 48 Rosevelt dan raih masa depan gemilang bersama kami. Proses pendaftaran yang mudah, cepat, dan transparan untuk generasi masa depan Indonesia.
                        </p>
                        <div className="flex flex-col sm:flex-row gap-4 animate-slide-in-left" style={{animationDelay: '0.3s'}}>
                            <Link to={'/registrasi'} className="group inline-flex items-center justify-center px-6 py-4 text-base font-semibold text-center text-white bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 dark:from-blue-500 dark:to-indigo-500 dark:hover:from-blue-600 dark:hover:to-indigo-600 rounded-xl shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 transition-all duration-200 focus:ring-4 focus:ring-blue-300 dark:focus:ring-blue-800">
                                Daftar Sekarang
                                <svg className="w-5 h-5 ml-2 -mr-1 group-hover:translate-x-1 transition-transform duration-200" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                                    <path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd"></path>
                                </svg>
                            </Link>
                            <Link to={'/login'} className="inline-flex items-center justify-center px-6 py-4 text-base font-semibold text-center text-gray-700 dark:text-white bg-white dark:bg-gray-800/50 border-2 border-gray-200 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-700/50 rounded-xl shadow-md hover:shadow-lg transform hover:-translate-y-0.5 transition-all duration-200 focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-700">
                                Masuk
                            </Link>
                        </div>
                    </div>
                    <div className="lg:mt-0 lg:col-span-5 lg:flex hidden items-center justify-center animate-float">
                        <div className="relative">
                            <div className="absolute inset-0 bg-gradient-to-r from-blue-400 to-indigo-400 dark:from-blue-500 dark:to-indigo-500 rounded-full opacity-20 blur-2xl"></div>
                            <img src={Edu} alt="Education illustration" className="relative w-full max-w-lg drop-shadow-2xl" />
                        </div>
                    </div>
                </div>
            </section>
            <section className="bg-gradient-to-b from-white to-gray-50 dark:from-gray-900 dark:to-gray-800 m-5 rounded-3xl shadow-xl transition-all duration-300">
                <div className="py-12 px-4 mx-auto max-w-screen-xl sm:py-20 lg:px-6">
                    <div className="max-w-screen-lg mb-12 lg:mb-20 text-center mx-auto animate-fade-in">
                        <div className="inline-block mb-4 px-4 py-2 bg-gradient-to-r from-blue-100 to-indigo-100 dark:from-blue-900/50 dark:to-indigo-900/50 rounded-full">
                            <span className="text-sm font-semibold text-blue-600 dark:text-blue-300">Fitur Unggulan</span>
                        </div>
                        <h2 className="mb-6 text-4xl tracking-tight font-extrabold bg-gradient-to-r from-gray-900 to-gray-700 dark:from-white dark:to-gray-300 bg-clip-text text-transparent">
                            Penerimaan Peserta Didik Baru (PPDB) SMP Lebih Mudah
                        </h2>
                        <p className="text-gray-600 sm:text-xl dark:text-gray-300 leading-relaxed">
                            Kami berkomitmen untuk memberikan pengalaman terbaik dalam PPDB SMP N 48 Rosevelt. Teknologi yang inovatif, integrasi yang sempurna, dan kemudahan akses untuk meningkatkan proses penerimaan siswa.
                        </p>
                    </div>
                    <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
                        <div className="group p-6 bg-white dark:bg-gray-800/50 rounded-2xl shadow-lg hover:shadow-2xl transform hover:-translate-y-2 transition-all duration-300 border border-gray-100 dark:border-gray-700 animate-fade-in-up" style={{animationDelay: '0.1s'}}>
                            <div className="flex justify-center items-center mb-5 w-14 h-14 rounded-xl bg-gradient-to-br from-blue-500 to-indigo-600 text-white shadow-lg group-hover:scale-110 transition-transform duration-300">
                                <FaAddressCard className="text-2xl" />
                            </div>
                            <h3 className="mb-3 text-xl font-bold text-gray-900 dark:text-white">Pendaftaran Online</h3>
                            <p className="text-gray-600 dark:text-gray-300 leading-relaxed">Daftar secara online dengan mudah. Pelajari informasi lengkap, unggah dokumen, dan ikuti langkah-langkah pendaftaran langsung melalui platform kami.</p>
                        </div>
                        <div className="group p-6 bg-white dark:bg-gray-800/50 rounded-2xl shadow-lg hover:shadow-2xl transform hover:-translate-y-2 transition-all duration-300 border border-gray-100 dark:border-gray-700 animate-fade-in-up" style={{animationDelay: '0.2s'}}>
                            <div className="flex justify-center items-center mb-5 w-14 h-14 rounded-xl bg-gradient-to-br from-green-500 to-emerald-600 text-white shadow-lg group-hover:scale-110 transition-transform duration-300">
                                <FaListCheck className="text-2xl" />
                            </div>
                            <h3 className="mb-3 text-xl font-bold text-gray-900 dark:text-white">Verifikasi Dokumen</h3>
                            <p className="text-gray-600 dark:text-gray-300 leading-relaxed">Lengkapi proses verifikasi dokumen secara online. Kami menyediakan alur kerja yang aman dan efisien untuk memvalidasi dokumen-dokumen penting.</p>
                        </div>
                        <div className="group p-6 bg-white dark:bg-gray-800/50 rounded-2xl shadow-lg hover:shadow-2xl transform hover:-translate-y-2 transition-all duration-300 border border-gray-100 dark:border-gray-700 animate-fade-in-up" style={{animationDelay: '0.3s'}}>
                            <div className="flex justify-center items-center mb-5 w-14 h-14 rounded-xl bg-gradient-to-br from-purple-500 to-pink-600 text-white shadow-lg group-hover:scale-110 transition-transform duration-300">
                                <FaBullhorn className="text-2xl" />
                            </div>
                            <h3 className="mb-3 text-xl font-bold text-gray-900 dark:text-white">Pengumuman Hasil</h3>
                            <p className="text-gray-600 dark:text-gray-300 leading-relaxed">Lihat hasil seleksi dengan cepat dan mudah. Informasi terkait diterima atau tidaknya peserta didik baru akan tersedia secara langsung di platform kami.</p>
                        </div>
                        <div className="group p-6 bg-white dark:bg-gray-800/50 rounded-2xl shadow-lg hover:shadow-2xl transform hover:-translate-y-2 transition-all duration-300 border border-gray-100 dark:border-gray-700 animate-fade-in-up" style={{animationDelay: '0.4s'}}>
                            <div className="flex justify-center items-center mb-5 w-14 h-14 rounded-xl bg-gradient-to-br from-orange-500 to-red-600 text-white shadow-lg group-hover:scale-110 transition-transform duration-300">
                                <FaCalendarDays className="text-2xl" />
                            </div>
                            <h3 className="mb-3 text-xl font-bold text-gray-900 dark:text-white">Informasi Jadwal</h3>
                            <p className="text-gray-600 dark:text-gray-300 leading-relaxed">Akses jadwal lengkap untuk tahapan PPDB SMP. Jadwal tes, pengumuman, dan tahapan lainnya tersedia secara transparan untuk memudahkan para calon siswa.</p>
                        </div>
                        <div className="group p-6 bg-white dark:bg-gray-800/50 rounded-2xl shadow-lg hover:shadow-2xl transform hover:-translate-y-2 transition-all duration-300 border border-gray-100 dark:border-gray-700 animate-fade-in-up" style={{animationDelay: '0.5s'}}>
                            <div className="flex justify-center items-center mb-5 w-14 h-14 rounded-xl bg-gradient-to-br from-teal-500 to-cyan-600 text-white shadow-lg group-hover:scale-110 transition-transform duration-300">
                                <FaTeamspeak className="text-2xl" />
                            </div>
                            <h3 className="mb-3 text-xl font-bold text-gray-900 dark:text-white">Bantuan Online</h3>
                            <p className="text-gray-600 dark:text-gray-300 leading-relaxed">Dapatkan bantuan langsung melalui layanan dukungan online. Tim kami siap membantu dan menjawab pertanyaan seputar proses PPDB dengan cepat.</p>
                        </div>
                        <div className="group p-6 bg-white dark:bg-gray-800/50 rounded-2xl shadow-lg hover:shadow-2xl transform hover:-translate-y-2 transition-all duration-300 border border-gray-100 dark:border-gray-700 animate-fade-in-up" style={{animationDelay: '0.6s'}}>
                            <div className="flex justify-center items-center mb-5 w-14 h-14 rounded-xl bg-gradient-to-br from-yellow-500 to-amber-600 text-white shadow-lg group-hover:scale-110 transition-transform duration-300">
                                <FaCircleInfo className="text-2xl" />
                            </div>
                            <h3 className="mb-3 text-xl font-bold text-gray-900 dark:text-white">Informasi Sekolah</h3>
                            <p className="text-gray-600 dark:text-gray-300 leading-relaxed">Dapatkan informasi lengkap mengenai sekolah, kurikulum, fasilitas, dan kegiatan ekstrakurikuler. Temukan segala yang perlu diketahui tentang lingkungan pendidikan kami.</p>
                        </div>
                    </div>
                </div>
            </section>

        </>
    );
}
