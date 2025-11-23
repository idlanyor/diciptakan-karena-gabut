/* eslint-disable react/prop-types */
import { useState } from "react";
import { Link } from "react-router-dom";
import { useSwipeable } from "react-swipeable";
import { Avatar, Dropdown, Navbar } from 'flowbite-react';
import ThemeToggle from '../../Components/ThemeToggle';
const NavbarPendaftar = ({ toggleDrawer, menu }) => {
    const [isMobileNav, setIsMobileNav] = useState(false);
    const handleSwipe = useSwipeable({
        onTouchStartOrOnMouseDown: () => {
            setIsMobileNav(false)
        },
    })
    // user drawer
    const ua = navigator.userAgent;
    return (
        <>
            {
                ua.includes('Windows') ? (
                    <Navbar className="bg-white w-full border-b border-gray-200 px-4 py-2.5 dark:bg-gray-800 dark:border-gray-700 fixed z-50">
                        <div className="flex justify-between w-full items-center">
                            <button onClick={toggleDrawer} className="p-2 mr-2 text-gray-600 rounded-lg cursor-pointer md:hidden hover:text-gray-900 hover:bg-gray-100 focus:bg-gray-100 dark:focus:bg-gray-700 focus:ring-2 focus:ring-gray-100 dark:focus:ring-gray-700 dark:text-white dark:hover:bg-gray-700 dark:hover:text-white">
                                <svg aria-hidden="true" className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                                    <path fillRule="evenodd" d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h6a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clipRule="evenodd"></path>
                                </svg>
                                <svg aria-hidden="true" className="hidden w-6 h-6" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                                    <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd"></path>
                                </svg>
                                <span className="sr-only">Toggle sidebar</span>
                            </button>
                            <Link to={'/dashboard'} className="flex items-center justify-between mr-4">
                                <img src="/vite.svg" className="mr-3 h-8" alt="PPDB Online" />
                                <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">PPDB SMP N 48 Rosevelt</span>
                            </Link>
                            <div className="flex items-center gap-2">
                                <ThemeToggle />
                                <Dropdown
                                arrowIcon={false}
                                inline
                                label={
                                    <Avatar alt="User settings" img="https://flowbite.com/docs/images/people/profile-picture-5.jpg" rounded />
                                }
                            >
                                <Dropdown.Header>
                                    <span className="block text-sm">Bonnie Green</span>
                                    <span className="block truncate text-sm font-medium">name@flowbite.com</span>
                                </Dropdown.Header>
                                <Dropdown.Item>Dashboard</Dropdown.Item>
                                <Dropdown.Item>Settings</Dropdown.Item>
                                <Dropdown.Item>Earnings</Dropdown.Item>
                                <Dropdown.Divider />
                                <Dropdown.Item>Sign out</Dropdown.Item>
                            </Dropdown>
                            </div>
                        </div>
                    </Navbar>


                ) : (
                    <Navbar fluid rounded className="fixed top-0 w-full mx-auto z-50">
                        <Navbar.Brand href="https://flowbite-react.com">
                            <img src="/vite.svg" className="mr-3 h-6 sm:h-9" alt="PPDB Logo" />
                            <span className="self-center whitespace-nowrap text-xl font-semibold dark:text-white">PPDB</span>
                        </Navbar.Brand>
                        <div className="flex md:order-2 gap-2 items-center">
                            <ThemeToggle />
                            <Dropdown
                                arrowIcon={false}
                                inline
                                label={
                                    <Avatar alt="User settings" img="https://flowbite.com/docs/images/people/profile-picture-5.jpg" rounded />
                                }
                            >
                                <Dropdown.Header>
                                    <span className="block text-sm">Bonnie Green</span>
                                    <span className="block truncate text-sm font-medium">name@flowbite.com</span>
                                </Dropdown.Header>
                                <Dropdown.Item>Dashboard</Dropdown.Item>
                                <Dropdown.Item>Settings</Dropdown.Item>
                                <Dropdown.Item>Earnings</Dropdown.Item>
                                <Dropdown.Divider />
                                <Dropdown.Item>Sign out</Dropdown.Item>
                            </Dropdown>
                            <Navbar.Toggle />
                        </div>
                        <Navbar.Collapse>
                            {
                                menu.map((d, index) => (
                                    <Link
                                        key={index}
                                        to={d.link}
                                        className={`flex border-b items-center mb-2 text-lg  px-2 lg:py-2 ${(window.location.pathname === d.link) ? "bg-purple-500 text-white" : "bg-white text-black"} lg:rounded-lg`}  >
                                        <d.icon />&nbsp; {d.judul}
                                    </Link>
                                ))
                            }
                        </Navbar.Collapse>
                    </Navbar>
                )
            }


        </>
    );
};
export default NavbarPendaftar;
