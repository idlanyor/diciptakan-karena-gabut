/* eslint-disable react/prop-types */
import { FaBullhorn, FaSignOutAlt, FaUpload } from "react-icons/fa";
import { FaGrip, FaNoteSticky } from "react-icons/fa6";
import { Link } from "react-router-dom";
const Sidebar = ({ isDrawerOpen, handleSwipe, logoutHandler }) => {
  return (<aside {...handleSwipe} className={`fixed top-0 left-0 z-40 w-64 h-screen pt-14 transition-transform ${isDrawerOpen ? 'translate-x-0' : '-translate-x-full'} bg-white border-r border-gray-200 md:translate-x-0 dark:bg-gray-800 dark:border-gray-700`} aria-label="Sidenav" id="drawer-navigation">
    <div className="overflow-y-auto py-5 px-3 h-full bg-white dark:bg-gray-800">
      <form action="#" method="GET" className="md:hidden mb-2">
        <label htmlFor="sidebar-search" className="sr-only">Search</label>
        <div className="relative">
          <div className="flex absolute inset-y-0 left-0 items-center pl-3 pointer-events-none">
            <svg className="w-5 h-5 text-gray-500 dark:text-white" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
              <path fillRule="evenodd" clipRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"></path>
            </svg>
          </div>
          <input type="text" name="search" id="sidebar-search" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full pl-10 p-2 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" placeholder="Search" />
        </div>
      </form>
      <ul className="space-y-4">
        <li className="border-b border-gray-200 dark:border-gray-700">
          <Link to={"/dashboard"} className="flex items-center p-2 text-base font-medium text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group">
            <FaGrip />
            <span className="ml-3">Dashboard</span>
          </Link>
        </li>
        <li className="border-b border-gray-200 dark:border-gray-700">
          <Link to={'/dashboard/biodata'} className="flex items-center p-2 text-base font-medium text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group">
            <FaNoteSticky />
            <span className="ml-3">Lengkapi Biodata</span>
          </Link>
        </li>
        <li className="border-b border-gray-200 dark:border-gray-700">
          <Link to={"/dashboard/file-pendaftar"} className="flex items-center p-2 text-base font-medium text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group">
            <FaUpload />
            <span className="ml-3">Upload Berkas</span>
          </Link>
        </li>
        <li className="border-b border-gray-200 dark:border-gray-700">
          <Link to={'/dashboard/pengumuman'} className="flex items-center p-2 text-base font-medium text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group">
            <FaBullhorn />
            <span className="ml-3">Pengumuman</span>
          </Link>
        </li>
      </ul>
    </div>
    <div className={`md:hidden absolute bottom-0 left-0 justify-center p-4 space-x-4 w-full lg:flex bg-white dark:bg-gray-800 z-20 ${isDrawerOpen ? 'flex' : 'flex'}`}>
      <a href="#" className="inline-flex justify-center p-2 text-gray-500 rounded cursor-pointer dark:text-white hover:text-gray-900 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-gray-600">
        <svg aria-hidden="true" className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
          <path d="M5 4a1 1 0 00-2 0v7.268a2 2 0 000 3.464V16a1 1 0 102 0v-1.268a2 2 0 000-3.464V4zM11 4a1 1 0 10-2 0v1.268a2 2 0 000 3.464V16a1 1 0 102 0V8.732a2 2 0 000-3.464V4zM16 3a1 1 0 011 1v7.268a2 2 0 010 3.464V16a1 1 0 11-2 0v-1.268a2 2 0 010-3.464V4a1 1 0 011-1z"></path>
        </svg>
      </a>
      <a href="#" data-tooltip-target="tooltip-settings" className="inline-flex justify-center p-2 text-gray-500 rounded cursor-pointer dark:text-white dark:hover:text-white hover:text-gray-900 hover:bg-gray-100 dark:hover:bg-gray-600">
        <svg aria-hidden="true" className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
          <path fillRule="evenodd" d="M11.49 3.17c-.38-1.56-2.6-1.56-2.98 0a1.532 1.532 0 01-2.286.948c-1.372-.836-2.942.734-2.106 2.106.54.886.061 2.042-.947 2.287-1.561.379-1.561 2.6 0 2.978a1.532 1.532 0 01.947 2.287c-.836 1.372.734 2.942 2.106 2.106a1.532 1.532 0 012.287.947c.379 1.561 2.6 1.561 2.978 0a1.533 1.533 0 012.287-.947c1.372.836 2.942-.734 2.106-2.106a1.533 1.533 0 01.947-2.287c1.561-.379 1.561-2.6 0-2.978a1.532 1.532 0 01-.947-2.287c.836-1.372-.734-2.942-2.106-2.106a1.532 1.532 0 01-2.287-.947zM10 13a3 3 0 100-6 3 3 0 000 6z" clipRule="evenodd"></path>
        </svg>
      </a>
      <div id="tooltip-settings" role="tooltip" className="inline-block absolute invisible z-10 py-2 px-3 text-sm font-medium text-white bg-gray-900 rounded-lg shadow-sm opacity-0 transition-opacity duration-300 tooltip">
        Keluar
        <div className="tooltip-arrow" data-popper-arrow></div>
      </div>
      <button onClick={logoutHandler} data-tooltip-target="tooltip-settings" className="inline-flex justify-center p-2 text-gray-500 rounded cursor-pointer dark:text-white dark:hover:text-white hover:text-gray-900 hover:bg-gray-100 dark:hover:bg-gray-600">
        <FaSignOutAlt />
      </button>
      <div id="tooltip-signout" role="tooltip" className="inline-block absolute invisible z-10 py-2 px-3 text-sm font-medium text-white bg-gray-900 rounded-lg shadow-sm opacity-0 transition-opacity duration-300 tooltip">
        Keluar
        <div className="tooltip-arrow" data-popper-arrow></div>
      </div>
    </div>
  </aside>);
};
export default Sidebar;
