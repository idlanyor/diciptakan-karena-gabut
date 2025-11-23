import { FaCheckCircle, FaBook, FaTshirt, FaUsers, FaLaptop } from 'react-icons/fa';

function RincianBiaya() {
    const data = [
        {
            plan: 'Jalur Zonasi',
            harga: 'GRATIS',
            description: 'Untuk siswa dalam zona wilayah sekolah',
            color: 'from-blue-500 to-indigo-600',
            borderColor: 'border-blue-200 dark:border-blue-800',
            bgColor: 'bg-blue-50 dark:bg-blue-900/10',
            popular: false,
            features: [
                { text: 'Bebas Biaya Pendaftaran', included: true },
                { text: 'Seragam Sekolah', included: true },
                { text: 'Buku Pelajaran Semester 1', included: true },
                { text: 'Kegiatan Ekstrakurikuler', included: true },
                { text: 'Kartu Pelajar Digital', included: true },
                { text: 'Fasilitas Laboratorium', included: false },
                { text: 'Program Beasiswa', included: false },
            ]
        },
        {
            plan: 'Jalur Afirmasi',
            harga: 'GRATIS',
            description: 'Untuk siswa dari keluarga kurang mampu',
            color: 'from-purple-500 to-pink-600',
            borderColor: 'border-purple-200 dark:border-purple-800',
            bgColor: 'bg-purple-50 dark:bg-purple-900/10',
            popular: true,
            features: [
                { text: 'Bebas Biaya Pendaftaran', included: true },
                { text: 'Seragam Sekolah', included: true },
                { text: 'Buku Pelajaran Lengkap', included: true },
                { text: 'Kegiatan Ekstrakurikuler', included: true },
                { text: 'Kartu Pelajar Digital', included: true },
                { text: 'Fasilitas Laboratorium', included: true },
                { text: 'Program Beasiswa', included: true },
            ]
        },
        {
            plan: 'Jalur Prestasi',
            harga: 'GRATIS',
            description: 'Untuk siswa berprestasi akademik/non-akademik',
            color: 'from-amber-500 to-orange-600',
            borderColor: 'border-amber-200 dark:border-amber-800',
            bgColor: 'bg-amber-50 dark:bg-amber-900/10',
            popular: false,
            features: [
                { text: 'Bebas Biaya Pendaftaran', included: true },
                { text: 'Seragam Sekolah', included: true },
                { text: 'Buku Pelajaran Lengkap', included: true },
                { text: 'Kegiatan Ekstrakurikuler', included: true },
                { text: 'Kartu Pelajar Digital', included: true },
                { text: 'Fasilitas Laboratorium', included: true },
                { text: 'Program Beasiswa', included: false },
            ]
        },
    ];

    return (
        <div className="p-6 md:p-10 bg-gradient-to-br from-white to-gray-50 dark:from-gray-900 dark:to-gray-800 m-5 rounded-3xl shadow-xl transition-all duration-300">
            {/* Header Section */}
            <div className="mb-12 text-center animate-fade-in">
                <div className="inline-block mb-4 px-4 py-2 bg-gradient-to-r from-blue-100 to-indigo-100 dark:from-blue-900/50 dark:to-indigo-900/50 rounded-full">
                    <span className="text-sm font-semibold text-blue-600 dark:text-blue-300">Informasi Biaya</span>
                </div>
                <h2 className="text-3xl md:text-4xl font-extrabold bg-gradient-to-r from-gray-900 to-gray-700 dark:from-white dark:to-gray-300 bg-clip-text text-transparent mb-3">
                    Rincian Biaya Pendaftaran
                </h2>
                <p className="text-gray-600 dark:text-gray-400 text-lg max-w-2xl mx-auto">
                    Pilih jalur pendaftaran yang sesuai dengan kondisi dan prestasi Anda
                </p>
            </div>

            {/* Pricing Cards */}
            <div className="grid gap-8 lg:grid-cols-3 max-w-7xl mx-auto">
                {data.map((item, index) => (
                    <div
                        key={index}
                        className={`relative w-full place-self-center p-8 bg-white dark:bg-gray-800/50 border-2 ${item.borderColor} rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 animate-fade-in-up ${
                            item.popular ? 'lg:scale-105 ring-2 ring-purple-300 dark:ring-purple-700' : ''
                        }`}
                        style={{animationDelay: `${index * 0.1}s`}}
                    >
                        {/* Popular Badge */}
                        {item.popular && (
                            <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                                <span className="px-4 py-1 bg-gradient-to-r from-purple-500 to-pink-600 text-white text-sm font-bold rounded-full shadow-lg">
                                    Paling Populer
                                </span>
                            </div>
                        )}

                        {/* Header */}
                        <div className="text-center mb-6">
                            <div className={`inline-flex items-center justify-center w-16 h-16 mb-4 rounded-2xl bg-gradient-to-br ${item.color} text-white shadow-lg`}>
                                <FaBook className="text-2xl" />
                            </div>
                            <h5 className="mb-2 text-2xl font-bold text-gray-900 dark:text-white">{item.plan}</h5>
                            <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">{item.description}</p>
                            <div className="flex items-baseline justify-center text-gray-900 dark:text-white">
                                <span className="text-5xl font-extrabold tracking-tight bg-gradient-to-r ${item.color} bg-clip-text text-transparent">
                                    {item.harga}
                                </span>
                            </div>
                        </div>

                        {/* Features List */}
                        <ul role="list" className="space-y-4 mb-8">
                            {item.features.map((feature, idx) => (
                                <li key={idx} className={`flex items-center ${!feature.included ? 'opacity-50' : ''}`}>
                                    {feature.included ? (
                                        <FaCheckCircle className="flex-shrink-0 w-5 h-5 text-green-500 dark:text-green-400" />
                                    ) : (
                                        <svg className="flex-shrink-0 w-5 h-5 text-gray-400 dark:text-gray-600" fill="currentColor" viewBox="0 0 20 20">
                                            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                                        </svg>
                                    )}
                                    <span className={`text-base font-normal leading-tight ms-3 ${
                                        feature.included
                                            ? 'text-gray-700 dark:text-gray-300'
                                            : 'text-gray-500 dark:text-gray-500 line-through'
                                    }`}>
                                        {feature.text}
                                    </span>
                                </li>
                            ))}
                        </ul>

                        {/* CTA Button */}
                        <button
                            type="button"
                            className={`w-full text-white bg-gradient-to-r ${item.color} hover:opacity-90 focus:ring-4 focus:outline-none focus:ring-blue-200 dark:focus:ring-blue-900 font-semibold rounded-xl text-base px-6 py-4 text-center transition-all duration-200 transform hover:scale-105 shadow-lg hover:shadow-xl`}
                        >
                            Pilih Jalur Ini
                        </button>
                    </div>
                ))}
            </div>

            {/* Footer Info */}
            <div className="mt-12 p-6 bg-blue-50 dark:bg-blue-900/20 rounded-2xl border-2 border-blue-200 dark:border-blue-800 max-w-4xl mx-auto animate-fade-in">
                <div className="flex items-start gap-4">
                    <div className="flex-shrink-0">
                        <div className="w-10 h-10 rounded-lg bg-blue-600 dark:bg-blue-500 flex items-center justify-center">
                            <FaCheckCircle className="text-white text-xl" />
                        </div>
                    </div>
                    <div>
                        <h4 className="text-lg font-bold text-gray-900 dark:text-white mb-2">Informasi Penting</h4>
                        <p className="text-gray-700 dark:text-gray-300 text-sm leading-relaxed">
                            Semua jalur pendaftaran PPDB SMP Negeri 48 Rosevelt adalah <strong>GRATIS</strong> tanpa dipungut biaya apapun.
                            Fasilitas yang tercantum akan diberikan sesuai dengan jalur pendaftaran yang dipilih.
                            Untuk informasi lebih lanjut, hubungi panitia PPDB.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default RincianBiaya;