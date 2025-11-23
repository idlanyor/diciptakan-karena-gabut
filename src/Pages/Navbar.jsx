import { useState, useEffect } from "react";
import { Link, Outlet, useLocation } from "react-router-dom";
import { useSwipeable } from "react-swipeable";
import ThemeToggle from "../Components/ThemeToggle";
import { HiMenu, HiX } from "react-icons/hi";

const Navbar = () => {
    const [isMobileNav, setIsMobileNav] = useState(false);
    const [isScrolled, setIsScrolled] = useState(false);
    const location = useLocation();

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 20);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    useEffect(() => {
        setIsMobileNav(false);
    }, [location]);

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
        <div>
            <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
                isScrolled
                    ? 'bg-white/80 dark:bg-gray-900/80 backdrop-blur-lg shadow-lg'
                    : 'bg-white/60 dark:bg-gray-900/60 backdrop-blur-md'
            }`}>
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex items-center justify-between h-16 md:h-20">
                        {/* Logo */}
                        <Link to={"/"} className="flex items-center space-x-3 group">
                            <div className="relative">
                                <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-blue-600 rounded-lg blur opacity-25 group-hover:opacity-50 transition-opacity"></div>
                                <img src="/vite.svg" className="relative h-8 md:h-10 transform group-hover:scale-110 transition-transform duration-300" alt="PPDB Logo" />
                            </div>
                            <span className="text-2xl md:text-3xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
                                PPDB
                            </span>
                        </Link>

                        {/* Desktop Menu */}
                        <div className="hidden md:flex items-center space-x-1">
                            {menu.map((item, index) => {
                                const isActive = location.pathname === item.link;
                                return (
                                    <Link
                                        key={index}
                                        to={item.link}
                                        className={`relative px-4 py-2 rounded-lg font-medium transition-all duration-300 ${
                                            isActive
                                                ? 'text-white'
                                                : 'text-gray-700 dark:text-gray-200 hover:text-purple-600 dark:hover:text-purple-400'
                                        }`}
                                    >
                                        {isActive && (
                                            <span className="absolute inset-0 bg-gradient-to-r from-purple-600 to-blue-600 rounded-lg"></span>
                                        )}
                                        <span className="relative z-10">{item.name}</span>
                                        {!isActive && (
                                            <span className="absolute inset-0 bg-gray-100 dark:bg-gray-800 rounded-lg opacity-0 hover:opacity-100 transition-opacity duration-300"></span>
                                        )}
                                    </Link>
                                );
                            })}
                        </div>

                        {/* Right Section */}
                        <div className="flex items-center gap-3">
                            <ThemeToggle />
                            <Link
                                to={'/registrasi'}
                                className="hidden sm:block relative group"
                            >
                                <div className="absolute -inset-0.5 bg-gradient-to-r from-purple-600 to-blue-600 rounded-full blur opacity-60 group-hover:opacity-100 transition duration-300"></div>
                                <div className="relative px-6 py-2.5 bg-gradient-to-r from-purple-600 to-blue-600 rounded-full text-white font-semibold text-sm shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300">
                                    Mendaftar
                                </div>
                            </Link>

                            {/* Mobile Menu Button */}
                            <button
                                onClick={() => setIsMobileNav(!isMobileNav)}
                                className="md:hidden p-2 rounded-lg text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                                aria-label="Toggle menu"
                            >
                                {isMobileNav ? <HiX className="w-6 h-6" /> : <HiMenu className="w-6 h-6" />}
                            </button>
                        </div>
                    </div>
                </div>

                {/* Mobile Menu */}
                <div className={`md:hidden transition-all duration-300 ease-in-out ${
                    isMobileNav
                        ? 'max-h-screen opacity-100'
                        : 'max-h-0 opacity-0 overflow-hidden'
                }`}>
                    <div className="px-4 pt-2 pb-4 space-y-2 bg-white/95 dark:bg-gray-900/95 backdrop-blur-lg border-t border-gray-200 dark:border-gray-700">
                        {menu.map((item, index) => {
                            const isActive = location.pathname === item.link;
                            return (
                                <Link
                                    key={index}
                                    to={item.link}
                                    className={`block px-4 py-3 rounded-lg font-medium transition-all duration-300 ${
                                        isActive
                                            ? 'bg-gradient-to-r from-purple-600 to-blue-600 text-white shadow-lg'
                                            : 'text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800'
                                    }`}
                                >
                                    {item.name}
                                </Link>
                            );
                        })}
                        <Link
                            to={'/registrasi'}
                            className="block sm:hidden"
                        >
                            <div className="px-4 py-3 bg-gradient-to-r from-purple-600 to-blue-600 rounded-lg text-white font-semibold text-center shadow-lg">
                                Mendaftar
                            </div>
                        </Link>
                    </div>
                </div>
            </nav>

            {/* Spacer to prevent content from going under fixed navbar */}
            <div className="h-16 md:h-20"></div>

            <div {...handleSwipe}>
                <Outlet />
            </div>
        </div>
    );
};
export default Navbar;
