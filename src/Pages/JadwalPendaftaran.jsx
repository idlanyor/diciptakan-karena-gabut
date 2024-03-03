import { useState } from 'react';
import { FaCalendar, FaClock } from 'react-icons/fa';

function JadwalPendaftaran() {
    const [activeAccordion, setActiveAccordion] = useState(null);

    const accordionData = [
        {
            id: 1,
            title: 'Zonasi',
            child: [
                {
                    title: 'Simulasi',
                    jadwal: '19 Mar 2023 08:00 - 19 Mar 2023 23:59',
                    count: 'Berakhir 9 bulan yang lalu'
                },
                {
                    title: 'Pendaftaran',
                    jadwal: '19 Mar 2023 08:00 - 19 Mar 2023 23:59',
                    count: 'Berakhir 9 bulan yang lalu'
                },
            ]
        },
        {
            id: 2,
            title: 'Afirmasi',
            child: [
                {
                    title: 'Simulasi',
                    jadwal: '19 Mar 2023 08:00 - 19 Mar 2023 23:59',
                    count: 'Berakhir 9 bulan yang lalu'
                },
                {
                    title: 'Pendaftaran',
                    jadwal: '19 Mar 2023 08:00 - 19 Mar 2023 23:59',
                    count: 'Berakhir 9 bulan yang lalu'
                },
            ]
        },
    ];

    const toggleAccordion = (accordionId) => {
        setActiveAccordion(activeAccordion === accordionId ? null : accordionId);
    };

    return (
        <div className="p-8 bg-white m-5">
            <h3 className=''>Informasi Jadwal Pendaftaran</h3>
            <div id="accordion-collapse" data-accordion="collapse">
                {accordionData.map((accordion) => (
                    <div key={accordion.id}>
                        <h2 id={`accordion-collapse-heading-${accordion.id}`}>
                            <button
                                type="button"
                                className={`flex items-center justify-between w-full p-5 font-medium rtl:text-right text-gray-500 border border-gray-200 focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-800 dark:border-gray-700 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 gap-3 ${activeAccordion === accordion.id ? 'active' : ''
                                    }`}
                                onClick={() => toggleAccordion(accordion.id)}
                                aria-expanded={activeAccordion === accordion.id}
                                aria-controls={`accordion-collapse-body-${accordion.id}`}
                            >
                                <span className='font-bold'>{accordion.title}</span>
                                <svg
                                    data-accordion-icon
                                    className={`w-3 h-3  shrink-0 ${activeAccordion === accordion.id ? 'active rotate-180' : ''
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
                            className={`p-5 border border-gray-200 dark:border-gray-700 ${activeAccordion === accordion.id ? '' : 'hidden'
                                }`}
                            aria-labelledby={`accordion-collapse-heading-${accordion.id}`}
                        >
                            {accordion.child.map((item, index) => (
                                <div key={index} className="p-5 border border-gray-200 dark:border-gray-700 dark:bg-gray-900">
                                    <h5 className="font-bold mb-2 text-gray-500 dark:text-gray-400">{item.title}</h5>
                                    <div className="flex space-x-4">
                                        <span className="mb-2 flex items-center text-gray-500 dark:text-gray-400"><FaCalendar />&nbsp;{item.jadwal}</span>
                                        <span className="mb-2 flex items-center text-gray-500 dark:text-gray-400"><FaClock />&nbsp;{item.count}</span>
                                    </div>

                                </div>
                            ))}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );

}

export default JadwalPendaftaran;
