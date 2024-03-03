import { useState } from "react";
import { Link, Outlet } from "react-router-dom";
import { useSwipeable } from "react-swipeable";

const Navbar = () => {
    const [isMobileNav, setIsMobileNav] = useState(false);
    const handleSwipe = useSwipeable({
        onTouchStartOrOnMouseDown: () => {
            setIsMobileNav(false)
        },
    })
    const menu = [
        {
            link: '/',
            name: 'Beranda'
        },
        {
            link: '/jadwal-pendaftaran',
            name: 'Jadwal Pendaftaran'
        },
        {
            link: '/rincian-biaya',
            name: 'Rincian Biaya'
        },
        {
            link: '/pengumuman',
            name: 'Informasi Lain'
        },
    ]
    return (
        <div >
            <nav className="bg-white md:rounded-full my-5 mx-5 dark:bg-gray-900 sticky z-20 top-0 start-0 border-b border-gray-200 dark:border-gray-600">
                <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
                    <Link to={"/"} className="flex items-center space-x-3 rtl:space-x-reverse">
                        <img src="/vite.svg" className="h-8" alt="Flowbite Logo" />
                        <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">PPDB</span>
                    </Link>
                    <div className="flex md:order-2 space-x-3 md:space-x-0 rtl:space-x-reverse">
                        <Link to={'/registrasi'} className="text-white bg-purple-700 hover:bg-purple-800 focus:ring-4 focus:outline-none focus:ring-purple-300 font-medium md:rounded-full  text-sm px-4 p-2 md:p3 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Mendaftar</Link>
                        <button onClick={() => setIsMobileNav(!isMobileNav)} data-collapse-toggle="navbar-sticky" type="button" className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500  md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-white dark:hover:bg-gray-700 dark:focus:ring-gray-600" aria-controls="navbar-sticky" aria-expanded={isMobileNav}>
                            <span className="sr-only">Open main menu</span>
                            <svg className="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 17 14">
                                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 1h15M1 7h15M1 13h15" />
                            </svg>
                        </button>
                    </div>
                    <div className={`items-center justify-between md:flex w-full md:w-auto md:order-1 ${isMobileNav ? 'block' : 'hidden'}`} id="navbar-sticky">
                        <ul className="flex flex-col md:items-center p-4 md:p-0 mt-4 font-medium border border-gray-100  md:space-x-8 rtl:space-x-reverse md:flex-row md:mt-0 md:border-0 md:bg-white dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700">
                            {
                                menu && menu.map((d, index) => (
                                    <li key={index}>
                                        <Link
                                            to={d.link}
                                            className={
                                                `block 
                                            py-2 
                                            px-3 
                                            text-gray-900 
                                            hover:bg-primary-400 
                                            md:hover:bg-primary-400 
                                            md:hover:text-white
                                            md:dark:hover:text-blue-500 
                                            dark:text-white
                                            dark:hover:bg-blue-700 
                                            dark:hover:text-white 
                                            md:dark:hover:bg-transparent 
                                            dark:bg-blue-500 
                                            md:p-2 
                                            md:rounded-full
                                            dark:border-gray-700 
                                            ${window.location.pathname == d.link ?
                                                    'md:bg-primary md:dark:bg-transparent bg-primary-500 text-white md:p-2 md:rounded-full md:dark:text-blue-500 ' :
                                                    'dark:bg-transparent md:dark:text-white'
                                                }`
                                            }
                                        >
                                            {d.name}
                                        </Link>
                                    </li>
                                ))
                            }
                        </ul>
                    </div>
                </div>
            </nav>
            <div {...handleSwipe}>
                <Outlet />
            </div>
        </div>
    );
};
export default Navbar;
