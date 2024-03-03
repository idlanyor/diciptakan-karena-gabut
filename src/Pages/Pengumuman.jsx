import { Link } from "react-router-dom";

function Pengumuman() {
    const posts = [
        {
            title: '4 Jalur pendaftaran PPDB 2023',
            summary: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Rem voluptatem vel corrupti. Expedita explicabo, voluptatum quod harum aliquam veritatis fuga veniam cum rem illo consequatur.',
            link: '/4-jalur-pendaftaran-ppdb-2023'
        },
        {
            title: 'Kriteria Pendaftaran Jalur Afirmasi',
            summary: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Rem voluptatem vel corrupti. Expedita explicabo, voluptatum quod harum aliquam veritatis fuga veniam cum rem illo consequatur.',
            link: '/kriteria-pendaftaran-afirmasi'
        },
        {
            title: 'Kriteria Pendaftaran Jalur Prestasi',
            summary: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Rem voluptatem vel corrupti. Expedita explicabo, voluptatum quod harum aliquam veritatis fuga veniam cum rem illo consequatur.',
            link: '/kriteria-pendaftaran-prestasi'
        },
        {
            title: 'Cakupan dan Kuota Jalur Zonasi SMP N 48 Rosevelt',
            summary: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Rem voluptatem vel corrupti. Expedita explicabo, voluptatum quod harum aliquam veritatis fuga veniam cum rem illo consequatur.',
            link: '/cakupan-zonasi-dan-kuota-2023'
        },
    ]
    return (
        <div className="p-5 bg-white m-5 rounded-2xl shadow-lg">
            <h1 className="text-2xl mb-2 font-extrabold  text-slate-900 dark:text-white">Informasi lain terkait Pendaftaran</h1>
            {
                posts.map((p, index) => (
                    <Link key={index} to={p.link}>
                        <div className="p-6 mt-5 rounded-lg border border-gray-200  shadow bg-white dark:bg-gray-800 dark:border-gray-700">
                            <a href="#">
                                <h5 className="mb-2 text-xl font-bold tracking-tight text-gray-900 dark:text-blue-500">{p.title}</h5>
                            </a>
                            <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">{p.summary}</p>
                            <a className="inline-flex rounded-lg items-center px-3 py-2 text-sm font-medium text-center text-white bg-purple-700  hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                                Lihat Lainnya
                                <svg className="rtl:rotate-180 w-3.5 h-3.5 ms-2" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 10">
                                    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 5h12m0 0L9 1m4 4L9 9" />
                                </svg>
                            </a>
                        </div>
                    </Link>
                ))
            }

        </div>);
}

export default Pengumuman;