import { useState } from 'react';
import { FaCalendar, FaClock, FaMapMarkerAlt, FaUserGraduate } from 'react-icons/fa';

function JadwalPendaftaran() {
    const [activeAccordion, setActiveAccordion] = useState(null);

    const accordionData = [
        {
            id: 1,
            title: 'Zonasi',
            icon: <FaMapMarkerAlt className="text-xl" />,
            color: 'from-blue-500 to-indigo-600',
            bgColor: 'bg-blue-50 dark:bg-blue-900/20',
            borderColor: 'border-blue-200 dark:border-blue-800',
            child: [
                {
                    title: 'Simulasi',
                    jadwal: '19 Mar 2023 08:00 - 19 Mar 2023 23:59',
                    count: 'Berakhir 9 bulan yang lalu',
                    status: 'ended'
                },
                {
                    title: 'Pendaftaran',
                    jadwal: '19 Mar 2023 08:00 - 19 Mar 2023 23:59',
                    count: 'Berakhir 9 bulan yang lalu',
                    status: 'ended'
                },
            ]
        },
        {
            id: 2,
            title: 'Afirmasi',
            icon: <FaUserGraduate className="text-xl" />,
            color: 'from-purple-500 to-pink-600',
            bgColor: 'bg-purple-50 dark:bg-purple-900/20',
            borderColor: 'border-purple-200 dark:border-purple-800',
            child: [
                {
                    title: 'Simulasi',
                    jadwal: '19 Mar 2023 08:00 - 19 Mar 2023 23:59',
                    count: 'Berakhir 9 bulan yang lalu',
                    status: 'ended'
                },
                {
                    title: 'Pendaftaran',
                    jadwal: '19 Mar 2023 08:00 - 19 Mar 2023 23:59',
                    count: 'Berakhir 9 bulan yang lalu',
                    status: 'ended'
                },
            ]
        },
    ];

    const toggleAccordion = (accordionId) => {
        setActiveAccordion(activeAccordion === accordionId ? null : accordionId);
    };

    const getStatusBadge = (status) => {
        const badges = {
            ended: 'bg-gray-100 text-gray-700 dark:bg-gray-700 dark:text-gray-300',
            active: 'bg-green-100 text-green-700 dark:bg-green-900/50 dark:text-green-300',
            upcoming: 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900/50 dark:text-yellow-300'
        };
        return badges[status] || badges.ended;
    };

    return (
        <div className="p-6 md:p-10 bg-gradient-to-br from-white to-gray-50 dark:from-gray-900 dark:to-gray-800 m-5 rounded-3xl shadow-xl transition-all duration-300">
            {/* Header Section */}
            <div className="mb-10 text-center animate-fade-in">
                <div className="inline-block mb-4 px-4 py-2 bg-gradient-to-r from-blue-100 to-indigo-100 dark:from-blue-900/50 dark:to-indigo-900/50 rounded-full">
                    <span className="text-sm font-semibold text-blue-600 dark:text-blue-300">Jadwal PPDB 2024/2025</span>
                </div>
                <h2 className="text-3xl md:text-4xl font-extrabold bg-gradient-to-r from-gray-900 to-gray-700 dark:from-white dark:to-gray-300 bg-clip-text text-transparent mb-3">
                    Informasi Jadwal Pendaftaran
                </h2>
                <p className="text-gray-600 dark:text-gray-400 text-lg max-w-2xl mx-auto">
                    Lihat jadwal lengkap setiap tahapan pendaftaran untuk jalur yang tersedia
                </p>
            </div>

            {/* Accordion Section */}
            <div id="accordion-collapse" data-accordion="collapse" className="space-y-4 max-w-5xl mx-auto">
                {accordionData.map((accordion, idx) => (
                    <div
                        key={accordion.id}
                        className="animate-fade-in-up"
                        style={{animationDelay: `${idx * 0.1}s`}}
                    >
                        <h2 id={`accordion-collapse-heading-${accordion.id}`}>
                            <button
                                type="button"
                                className={`flex items-center justify-between w-full p-6 font-semibold text-left border-2 rounded-2xl transition-all duration-300 ${
                                    activeAccordion === accordion.id
                                        ? `${accordion.bgColor} ${accordion.borderColor} shadow-lg scale-[1.02]`
                                        : 'bg-white dark:bg-gray-800/50 border-gray-200 dark:border-gray-700 hover:shadow-md hover:scale-[1.01]'
                                } focus:ring-4 focus:ring-blue-300 dark:focus:ring-blue-800`}
                                onClick={() => toggleAccordion(accordion.id)}
                                aria-expanded={activeAccordion === accordion.id}
                                aria-controls={`accordion-collapse-body-${accordion.id}`}
                            >
                                <div className="flex items-center gap-4">
                                    <div className={`flex items-center justify-center w-12 h-12 rounded-xl bg-gradient-to-br ${accordion.color} text-white shadow-lg`}>
                                        {accordion.icon}
                                    </div>
                                    <span className='text-xl text-gray-900 dark:text-white'>{accordion.title}</span>
                                </div>
                                <svg
                                    data-accordion-icon
                                    className={`w-5 h-5 shrink-0 text-gray-600 dark:text-gray-400 transition-transform duration-300 ${
                                        activeAccordion === accordion.id ? 'rotate-180' : ''
                                    }`}
                                    aria-hidden="true"
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 10 6"
                                >
                                    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5 5 1 1 5" />
                                </svg>
                            </button>
                        </h2>
                        <div
                            id={`accordion-collapse-body-${accordion.id}`}
                            className={`overflow-hidden transition-all duration-300 ${
                                activeAccordion === accordion.id ? 'max-h-[1000px] mt-3' : 'max-h-0'
                            }`}
                            aria-labelledby={`accordion-collapse-heading-${accordion.id}`}
                        >
                            <div className="space-y-3">
                                {accordion.child.map((item, index) => (
                                    <div
                                        key={index}
                                        className={`p-6 bg-white dark:bg-gray-800/50 border-2 ${accordion.borderColor} rounded-xl shadow-md hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1`}
                                    >
                                        <div className="flex items-start justify-between mb-4">
                                            <h5 className="text-xl font-bold text-gray-900 dark:text-white">
                                                {item.title}
                                            </h5>
                                            <span className={`px-3 py-1 rounded-full text-xs font-semibold ${getStatusBadge(item.status)}`}>
                                                {item.status === 'ended' ? 'Berakhir' : item.status === 'active' ? 'Aktif' : 'Mendatang'}
                                            </span>
                                        </div>
                                        <div className="space-y-3">
                                            <div className="flex items-center gap-3 text-gray-600 dark:text-gray-300">
                                                <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-blue-100 dark:bg-blue-900/50">
                                                    <FaCalendar className="text-blue-600 dark:text-blue-400" />
                                                </div>
                                                <span className="text-sm md:text-base">{item.jadwal}</span>
                                            </div>
                                            <div className="flex items-center gap-3 text-gray-600 dark:text-gray-300">
                                                <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-purple-100 dark:bg-purple-900/50">
                                                    <FaClock className="text-purple-600 dark:text-purple-400" />
                                                </div>
                                                <span className="text-sm md:text-base">{item.count}</span>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );

}

export default JadwalPendaftaran;
