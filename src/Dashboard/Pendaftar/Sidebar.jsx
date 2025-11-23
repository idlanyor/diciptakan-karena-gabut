/* eslint-disable react/prop-types */
import { FaBullhorn, FaSignOutAlt, FaUpload } from "react-icons/fa";
import { FaGrip, FaNoteSticky } from "react-icons/fa6";
import { Link } from "react-router-dom";
const Sidebar = ({ isDrawerOpen, handleSwipe, logoutHandler, menu }) => {
  return (<aside {...handleSwipe} className={`fixed top-0 left-0 z-10 w-64 h-screen pt-14 transition-transform ${isDrawerOpen ? 'translate-x-0' : '-translate-x-full'} bg-white/95 backdrop-blur-sm border-r border-gray-200 md:translate-x-0 dark:bg-gray-800/95 dark:border-gray-700 shadow-lg`} aria-label="Sidenav" id="drawer-navigation">
    <div className="overflow-y-auto py-5 px-3 h-full bg-gradient-to-b from-white/50 to-purple-50/30 dark:from-gray-800/50 dark:to-purple-900/10">
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
      <ul className="space-y-2">
        {
          menu.map((d, index) => {
            const isActive = window.location.pathname === d.link;
            return (
              <li key={index}>
                <Link
                  to={d.link}
                  className={`flex items-center gap-3 p-3 text-base font-medium rounded-xl transition-all duration-200 group ${
                    isActive
                      ? 'bg-gradient-to-r from-purple-500 to-purple-600 text-white shadow-lg shadow-purple-500/30'
                      : 'text-gray-700 dark:text-gray-200 hover:bg-purple-50 dark:hover:bg-gray-700/50 hover:shadow-md'
                  }`}
                >
                  <div className={`p-2 rounded-lg transition-all ${
                    isActive
                      ? 'bg-white/20'
                      : 'bg-purple-100 dark:bg-purple-900/30 text-purple-600 dark:text-purple-400 group-hover:bg-purple-200 dark:group-hover:bg-purple-800/40'
                  }`}>
                    <d.icon className={isActive ? 'text-white' : ''} />
                  </div>
                  <span className={`${isActive ? 'font-semibold' : ''}`}>{d.judul}</span>
                  {isActive && (
                    <div className="ml-auto w-2 h-2 rounded-full bg-white animate-pulse"></div>
                  )}
                </Link>
              </li>
            );
          })
        }
      </ul>
    </div>
    <div className={`md:hidden absolute bottom-0 left-0 p-4 w-full bg-gradient-to-t from-white to-transparent dark:from-gray-800 dark:to-transparent z-20 ${isDrawerOpen ? 'flex' : 'flex'}`}>
      <button
        onClick={logoutHandler}
        className="w-full flex items-center justify-center gap-2 p-3 text-white bg-gradient-to-r from-red-500 to-red-600 rounded-xl hover:from-red-600 hover:to-red-700 transition-all duration-200 shadow-lg hover:shadow-xl font-medium"
      >
        <FaSignOutAlt className="text-lg" />
        <span>Keluar</span>
      </button>
    </div>
  </aside>);
};
export default Sidebar;
