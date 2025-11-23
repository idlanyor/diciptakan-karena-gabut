import { Link } from "react-router-dom";
import { FaBullhorn, FaMapMarkerAlt, FaMedal, FaUsers, FaCalendarAlt, FaClock } from "react-icons/fa";

function Pengumuman() {
    const posts = [
        {
            title: '4 Jalur Pendaftaran PPDB 2024/2025',
            summary: 'Informasi lengkap mengenai jalur pendaftaran PPDB tahun ajaran 2024/2025 termasuk jalur zonasi, afirmasi, prestasi, dan perpindahan tugas orang tua. Pahami persyaratan dan kriteria masing-masing jalur.',
            link: '/4-jalur-pendaftaran-ppdb-2023',
            category: 'Informasi Umum',
            icon: <FaBullhorn className="text-xl" />,
            color: 'from-blue-500 to-indigo-600',
            bgColor: 'bg-blue-50 dark:bg-blue-900/20',
            borderColor: 'border-blue-200 dark:border-blue-800',
            date: '15 Januari 2025',
            isNew: true
        },
        {
            title: 'Kriteria Pendaftaran Jalur Afirmasi',
            summary: 'Ketentuan dan persyaratan lengkap untuk pendaftaran jalur afirmasi bagi siswa dari keluarga kurang mampu. Termasuk dokumen yang harus disiapkan dan proses verifikasi yang diperlukan.',
            link: '/kriteria-pendaftaran-afirmasi',
            category: 'Jalur Afirmasi',
            icon: <FaUsers className="text-xl" />,
            color: 'from-purple-500 to-pink-600',
            bgColor: 'bg-purple-50 dark:bg-purple-900/20',
            borderColor: 'border-purple-200 dark:border-purple-800',
            date: '10 Januari 2025',
            isNew: false
        },
        {
            title: 'Kriteria Pendaftaran Jalur Prestasi',
            summary: 'Syarat dan ketentuan untuk jalur prestasi akademik dan non-akademik. Pelajari jenis prestasi yang diakui, dokumen bukti prestasi yang valid, dan sistem penilaian yang digunakan.',
            link: '/kriteria-pendaftaran-prestasi',
            category: 'Jalur Prestasi',
            icon: <FaMedal className="text-xl" />,
            color: 'from-amber-500 to-orange-600',
            bgColor: 'bg-amber-50 dark:bg-amber-900/20',
            borderColor: 'border-amber-200 dark:border-amber-800',
            date: '8 Januari 2025',
            isNew: false
        },
        {
            title: 'Cakupan dan Kuota Jalur Zonasi SMP N 48 Rosevelt',
            summary: 'Detail informasi mengenai radius zona wilayah, pembagian kuota per jalur, dan daftar kelurahan yang termasuk dalam zona SMP Negeri 48 Rosevelt untuk tahun ajaran 2024/2025.',
            link: '/cakupan-zonasi-dan-kuota-2023',
            category: 'Jalur Zonasi',
            icon: <FaMapMarkerAlt className="text-xl" />,
            color: 'from-green-500 to-emerald-600',
            bgColor: 'bg-green-50 dark:bg-green-900/20',
            borderColor: 'border-green-200 dark:border-green-800',
            date: '5 Januari 2025',
            isNew: true
        },
    ];

    return (
        <div className="p-6 md:p-10 bg-gradient-to-br from-white to-gray-50 dark:from-gray-900 dark:to-gray-800 m-5 rounded-3xl shadow-xl transition-all duration-300">
            {/* Header Section */}
            <div className="mb-10 animate-fade-in">
                <div className="inline-block mb-4 px-4 py-2 bg-gradient-to-r from-blue-100 to-indigo-100 dark:from-blue-900/50 dark:to-indigo-900/50 rounded-full">
                    <span className="text-sm font-semibold text-blue-600 dark:text-blue-300">Pengumuman & Informasi</span>
                </div>
                <h1 className="text-3xl md:text-4xl font-extrabold bg-gradient-to-r from-gray-900 to-gray-700 dark:from-white dark:to-gray-300 bg-clip-text text-transparent mb-3">
                    Informasi Terkait Pendaftaran
                </h1>
                <p className="text-gray-600 dark:text-gray-400 text-lg max-w-3xl">
                    Dapatkan informasi terbaru dan lengkap mengenai proses pendaftaran PPDB SMP Negeri 48 Rosevelt
                </p>
            </div>

            {/* Posts Grid */}
            <div className="grid gap-6 lg:grid-cols-2 max-w-7xl mx-auto">
                {posts.map((post, index) => (
                    <Link
                        key={index}
                        to={post.link}
                        className="group animate-fade-in-up"
                        style={{animationDelay: `${index * 0.1}s`}}
                    >
                        <div className={`relative p-6 rounded-2xl border-2 ${post.borderColor} ${post.bgColor} shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 h-full flex flex-col`}>
                            {/* New Badge */}
                            {post.isNew && (
                                <div className="absolute -top-3 -right-3">
                                    <span className="px-3 py-1 bg-gradient-to-r from-red-500 to-pink-600 text-white text-xs font-bold rounded-full shadow-lg animate-pulse">
                                        Baru
                                    </span>
                                </div>
                            )}

                            {/* Category & Date */}
                            <div className="flex items-center justify-between mb-4">
                                <div className="flex items-center gap-2">
                                    <div className={`flex items-center justify-center w-10 h-10 rounded-lg bg-gradient-to-br ${post.color} text-white shadow-md group-hover:scale-110 transition-transform duration-300`}>
                                        {post.icon}
                                    </div>
                                    <span className={`text-sm font-semibold bg-gradient-to-r ${post.color} bg-clip-text text-transparent`}>
                                        {post.category}
                                    </span>
                                </div>
                                <div className="flex items-center gap-1 text-xs text-gray-500 dark:text-gray-400">
                                    <FaCalendarAlt />
                                    <span>{post.date}</span>
                                </div>
                            </div>

                            {/* Title */}
                            <h5 className="mb-3 text-xl md:text-2xl font-bold text-gray-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors duration-300">
                                {post.title}
                            </h5>

                            {/* Summary */}
                            <p className="mb-5 font-normal text-gray-600 dark:text-gray-300 leading-relaxed flex-grow">
                                {post.summary}
                            </p>

                            {/* CTA Button */}
                            <div className="flex items-center gap-2 text-sm font-semibold">
                                <span className={`bg-gradient-to-r ${post.color} bg-clip-text text-transparent group-hover:gap-3 transition-all duration-300`}>
                                    Baca Selengkapnya
                                </span>
                                <svg
                                    className={`w-4 h-4 bg-gradient-to-r ${post.color} text-transparent group-hover:translate-x-2 transition-transform duration-300`}
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                >
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 7l5 5m0 0l-5 5m5-5H6" className={`bg-gradient-to-r ${post.color}`} style={{stroke: 'url(#gradient)'}} />
                                    <defs>
                                        <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                                            <stop offset="0%" stopColor="#3B82F6" />
                                            <stop offset="100%" stopColor="#6366F1" />
                                        </linearGradient>
                                    </defs>
                                </svg>
                            </div>
                        </div>
                    </Link>
                ))}
            </div>

            {/* Footer CTA */}
            <div className="mt-12 p-6 bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 rounded-2xl border-2 border-blue-200 dark:border-blue-800 max-w-4xl mx-auto text-center animate-fade-in">
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
                    Butuh Bantuan Lebih Lanjut?
                </h3>
                <p className="text-gray-600 dark:text-gray-300 mb-4">
                    Tim kami siap membantu menjawab pertanyaan Anda seputar proses pendaftaran
                </p>
                <button className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 transition-all duration-200">
                    <FaUsers />
                    Hubungi Kami
                </button>
            </div>
        </div>
    );
}

export default Pengumuman;