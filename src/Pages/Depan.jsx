import { Link } from "react-router-dom";
import Edu from '../assets/education.svg'
import { FaAddressCard, FaBullhorn, FaTeamspeak, } from "react-icons/fa";
import { FaCalendarDays, FaCircleInfo, FaListCheck } from "react-icons/fa6";
export default function Depan() {
    return (
        <>
            <section className="bg-bg-purple-200 dark:bg-blue-500 -5">
                <div className="lg:grid flex text-center flex-col-reverse max-w-screen-xl px-4 py-8 mx-auto lg:gap-8 xl:gap-0 lg:py-16 lg:grid-cols-12">
                    <div className="mr-auto mt-5 place-self-center lg:col-span-7">
                        <h1 className="max-w-2xl mb-4 text-4xl font-extrabold tracking-tight leading-none md:text-5xl xl:text-6xl dark:text-white">Portal PPDB </h1>
                        <h1 className="max-w-2xl mb-4 text-4xl font-extrabold tracking-tight leading-none md:text-5xl xl:text-6xl dark:text-white">SMP Negeri 48 Rosevelt </h1>
                        <p className="max-w-2xl mb-6 font-light text-gray-500 lg:mb-8 md:text-lg lg:text-xl dark:text-white">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Nesciunt doloribus ducimus ullam laborum voluptatum aliquid recusandae modi, accusantium accusamus id dolor officiis dolorem nihil laudantium. Obcaecati labore eaque quaerat hic veritatis repellendus sunt consectetur a, sit blanditiis id ipsam quo ex nihil. Sit asperiores modi iure aperiam nulla minima cum.</p>
                        <Link to={'/registrasi'} className="inline-flex items-center justify-center px-5 py-3 mr-3 text-base font-medium text-center text-white  bg-primary-700 dark:bg-blue-700 dark:hover:bg-blue-800 hover:bg-primary-800 focus:ring-4 focus:ring-primary-300 dark:focus:ring-primary-900">
                            Daftar Sekarang
                            <svg className="w-5 h-5 ml-2 -mr-1" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                                <path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd"></path>
                            </svg>
                        </Link>
                        <Link to={'/login'} className="inline-flex items-center justify-center px-5 py-3 text-base font-medium text-center text-gray-900 border border-gray-300  hover:bg-gray-100 focus:ring-4 focus:ring-gray-100 dark:text-white dark:border-gray-700 dark:hover:bg-gray-700 dark:focus:ring-gray-800">
                            Masuk
                        </Link>
                    </div>
                    <div className="lg:mt-0 lg:col-span-5 lg:flex hidden">
                        <img src={Edu} alt="mockup" className="w-1/2 lg:w-auto " />
                    </div>
                </div>
            </section>
            <section>
                <div className="py-8 px-4 mx-auto max-w-screen-xl sm:py-16 lg:px-6">
                    <div className="max-w-screen-lg mb-8 lg:mb-16">
                        <h2 className="mb-4 text-4xl tracking-tight font-extrabold text-gray-900 dark:text-white">Penerimaan Peserta Didik Baru (PPDB) SMP Lebih Mudah</h2>
                        <p className="text-gray-500 sm:text-xl dark:text-white">Kami berkomitmen untuk memberikan pengalaman terbaik dalam PPDB SMP N 48 Rosevelt. Teknologi yang inovatif, integrasi yang sempurna, dan kemudahan akses untuk meningkatkan proses penerimaan siswa.</p>
                    </div>
                    <div className="space-y-8 md:grid md:grid-cols-2 lg:grid-cols-3 md:gap-12 md:space-y-0">
                        <div>
                            <div className="flex justify-center items-center mb-4 dark:text-white w-10 h-10 rounded-full bg-primary-100 lg:h-12 lg:w-12 dark:bg-blue-900">
                                <FaAddressCard />
                            </div>
                            <h3 className="mb-2 text-xl font-bold dark:text-white">Pendaftaran Online</h3>
                            <p className="text-gray-500 dark:text-white">Daftar secara online dengan mudah. Pelajari informasi lengkap, unggah dokumen, dan ikuti langkah-langkah pendaftaran langsung melalui platform kami.</p>
                        </div>
                        <div>
                            <div className="flex justify-center items-center mb-4 dark:text-white w-10 h-10 rounded-full bg-primary-100 lg:h-12 lg:w-12 dark:bg-blue-900">
                                <FaListCheck />
                            </div>
                            <h3 className="mb-2 text-xl font-bold dark:text-white">Verifikasi Dokumen</h3>
                            <p className="text-gray-500 dark:text-white">Lengkapi proses verifikasi dokumen secara online. Kami menyediakan alur kerja yang aman dan efisien untuk memvalidasi dokumen-dokumen penting.</p>
                        </div>
                        <div>
                            <div className="flex justify-center items-center mb-4 dark:text-white w-10 h-10 rounded-full bg-primary-100 lg:h-12 lg:w-12 dark:bg-blue-900">
                                <FaBullhorn />
                            </div>
                            <h3 className="mb-2 text-xl font-bold dark:text-white">Pengumuman Hasil</h3>
                            <p className="text-gray-500 dark:text-white">Lihat hasil seleksi dengan cepat dan mudah. Informasi terkait diterima atau tidaknya peserta didik baru akan tersedia secara langsung di platform kami.</p>
                        </div>
                        <div>
                            <div className="flex justify-center items-center mb-4 dark:text-white w-10 h-10 rounded-full bg-primary-100 lg:h-12 lg:w-12 dark:bg-blue-900">
                                <FaCalendarDays />
                            </div>
                            <h3 className="mb-2 text-xl font-bold dark:text-white">Informasi Jadwal</h3>
                            <p className="text-gray-500 dark:text-white">Akses jadwal lengkap untuk tahapan PPDB SMP. Jadwal tes, pengumuman, dan tahapan lainnya tersedia secara transparan untuk memudahkan para calon siswa.</p>
                        </div>
                        <div>
                            <div className="flex justify-center items-center mb-4 dark:text-white w-10 h-10 rounded-full bg-primary-100 lg:h-12 lg:w-12 dark:bg-blue-900">
                                <FaTeamspeak />
                            </div>
                            <h3 className="mb-2 text-xl font-bold dark:text-white">Bantuan Online</h3>
                            <p className="text-gray-500 dark:text-white">Dapatkan bantuan langsung melalui layanan dukungan online. Tim kami siap membantu dan menjawab pertanyaan seputar proses PPDB dengan cepat.</p>
                        </div>
                        <div>
                            <div className="flex justify-center items-center mb-4 dark:text-white w-10 h-10 rounded-full bg-primary-100 lg:h-12 lg:w-12 dark:bg-blue-900">
                                <FaCircleInfo/>
                            </div>
                            <h3 className="mb-2 text-xl font-bold dark:text-white">Informasi Sekolah</h3>
                            <p className="text-gray-500 dark:text-white">Dapatkan informasi lengkap mengenai sekolah, kurikulum, fasilitas, dan kegiatan ekstrakurikuler. Temukan segala yang perlu diketahui tentang lingkungan pendidikan kami.</p>
                        </div>

                    </div>
                </div>
            </section>

        </>
    );
}
