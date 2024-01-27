/* eslint-disable no-unused-vars */
import { useState, useEffect } from "react";
import { FaEye, FaTrashAlt, FaUserEdit } from "react-icons/fa";
import { getTokenPanel, rosevelt } from "../../Components/Reusable";
import { data } from "autoprefixer";

const ManajemenUser = () => {
    // State untuk menyimpan data user
    const [users, setUsers] = useState([]);
    // State untuk menyimpan data biodata pendaftar
    const [biodata, setBiodata] = useState([]);

    // Mengambil data user saat komponen dimount
    useEffect(() => {
        fetchData();
    }, []);

    // Fungsi untuk mengambil data user dan biodata pendaftar dari backend
    const fetchData = async () => {
        try {
            // Mengambil data user
            rosevelt.defaults.headers.common['Authorization'] = `Bearer ${getTokenPanel()}`
            const dataUser = await rosevelt.get('panel/user');
            // const dataUser = await responseUser.json();
            setUsers(dataUser.data);

            // // Mengambil data biodata pendaftar
            // const responseBiodata = await rosevelt.get("/biodata");
            // // const dataBiodata = await responseBiodata.json();
            // setBiodata(responseBiodata.data);
        } catch (error) {
            console.error("Error fetching data:", error);
        }
    };
    console.log(users);

    // Fungsi untuk menampilkan form tambah user
    const handleTambahUser = () => {
        // Implementasikan logika untuk menampilkan form tambah user
    };

    // Fungsi untuk menampilkan form edit user
    const handleEditUser = (userId) => {
        // Implementasikan logika untuk menampilkan form edit user
    };

    // Fungsi untuk menampilkan modal konfirmasi hapus user
    const handleHapusUser = (userId) => {
        // Implementasikan logika untuk menampilkan modal konfirmasi hapus user
    };

    return (<>
        {/* Start block */}
        <section className=" antialiased">
            <div className="mx-auto">
                <div className="bg-white dark:bg-gray-800 relative shadow-md sm: overflow-hidden">
                    <div className="flex flex-col md:flex-row md:items-center md:justify-between space-y-3 md:space-y-0 md:space-x-4 p-4">
                        <div className="flex-1 flex items-center space-x-2">
                            <h5>
                                <span className="text-gray-300 text-xl">Manajemen User Pendaftar</span>
                            </h5>
                            <button type="button" className="group" data-tooltip-target="results-tooltip">
                                <svg aria-hidden="true" xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white" viewBox="0 0 20 20" fill="currentColor">
                                    <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                                </svg>
                                <span className="sr-only">More info</span>
                            </button>
                            <div id="results-tooltip" role="tooltip" className="absolute z-10 invisible inline-block px-3 py-2 text-sm font-medium text-white transition-opacity duration-300 bg-gray-900  shadow-sm opacity-0 tooltip dark:bg-gray-700">
                                Showing 1-100 of 436 results
                                <div className="tooltip-arrow" data-popper-arrow=""></div>
                            </div>
                        </div>
                    </div>
                    <div className="flex flex-col md:flex-row items-stretch md:items-center md:space-x-3 space-y-3 md:space-y-0 justify-between mx-4 py-4 border-t dark:border-gray-700">
                        <div className="w-full md:w-auto flex flex-col md:flex-row space-y-2 md:space-y-0 items-stretch md:items-center justify-end md:space-x-3 flex-shrink-0">
                            <button type="button" id="createProductButton" data-modal-toggle="createProductModal" className="flex items-center justify-center text-white bg-primary-700 hover:bg-primary-800 focus:ring-4 focus:ring-primary-300 font-medium  text-sm px-4 py-2 dark:bg-blue-600 dark:hover:bg-primary-700 focus:outline-none dark:focus:ring-primary-800">
                                <svg className="h-3.5 w-3.5 mr-1.5 -ml-1" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                                    <path clipRule="evenodd" fillRule="evenodd" d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" />
                                </svg>
                                Tambah User
                            </button>
                        </div>
                    </div>
                    <div className="overflow-x-auto">
                        <table className="w-full text-sm text-left text-gray-500 dark:text-white">
                            <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-white">
                                <tr>
                                    <th scope="col" className="p-4">No</th>
                                    <th scope="col" className="p-4">Nama Lengkap</th>
                                    <th scope="col" className="p-4">Email</th>
                                    <th scope="col" className="p-4">Tangga Daftar</th>
                                    <th scope="col" className="p-4">Gelombang/Tahun</th>
                                    <th scope="col" className="p-4">Tanggal Diterima</th>
                                    <th scope="col" className="p-4">Jalur yang Dipilih</th>
                                    <th scope="col" className="p-4">Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {biodata.map((user, index) => (
                                    <tr key={user.id} className="border-b dark:border-gray-600 hover:bg-gray-100 dark:hover:bg-gray-700">

                                        <td className="px-4 py-3 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                            {index + 1}
                                        </td>
                                        <td className="px-4 py-3 font-medium text-gray-900 whitespace-nowrap dark:text-white">{user.nama_lengkap}</td>
                                        <td className="px-4 py-3 font-medium text-gray-900 whitespace-nowrap dark:text-white">{user.email}</td>
                                        <td className="px-4 py-3 font-medium text-gray-900 whitespace-nowrap dark:text-white">{user.tgl_lahir}</td>
                                        <td className="px-4 py-3 font-medium text-gray-900 whitespace-nowrap dark:text-white"> {/* Tambahkan data gelombang/tahun sesuai kebutuhan */}</td>
                                        <td className="px-4 py-3 font-medium text-gray-900 whitespace-nowrap dark:text-white"> {/* Tambahkan data tanggal diterima sesuai kebutuhan */}</td>
                                        <td className="px-4 py-3 font-medium text-gray-900 whitespace-nowrap dark:text-white"> {/* Tambahkan data jalur yang dipilih sesuai kebutuhan */}</td>
                                        <td className="px-4 py-3 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                            <div className="flex items-center space-x-4">
                                                <button
                                                    type="button"
                                                    className="py-2 px-3 flex items-center text-sm font-medium text-center text-white bg-green-700  hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-green-300 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800"
                                                    onClick={() => handleEditUser(user.id)}
                                                >
                                                    <FaUserEdit />
                                                </button>
                                                <button
                                                    type="button"
                                                    className="py-2 px-3 flex items-center text-sm font-medium text-center text-gray-900 focus:outline-none bg-white  border border-yellow-200 hover:bg-yellow-200 hover:text-yellow-700 focus:z-10 focus:ring-4 focus:ring-yellow-200 dark:focus:ring-yellow-700 dark:bg-yellow-800 dark:text-yellow-400 dark:border-yellow-600 dark:hover:text-white dark:hover:bg-yellow-700"
                                                >
                                                    <FaEye />
                                                </button>
                                                <button
                                                    type="button"
                                                    className="flex items-center text-red-700 hover:text-white border border-red-700 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium  text-sm px-3 py-2 text-center dark:border-red-500 dark:text-red-500 dark:hover:text-white dark:hover:bg-red-600 dark:focus:ring-red-900"
                                                    onClick={() => handleHapusUser(user.id)}
                                                >
                                                    <FaTrashAlt />
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                    <nav className="flex flex-col md:flex-row justify-between items-start md:items-center space-y-3 md:space-y-0 p-4" aria-label="Table navigation">
                        <span className="text-sm font-normal text-gray-500 dark:text-white">
                            Showing
                            <span className="font-semibold text-gray-900 dark:text-white"> 1-10 </span>
                            of
                            <span className="font-semibold text-gray-900 dark:text-white"> 1000 </span>
                        </span>
                        <ul className="inline-flex items-stretch -space-x-px">
                            <li>
                                <a href="#" className="flex items-center justify-center h-full py-1.5 px-3 ml-0 text-gray-500 bg-white -l-lg border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-white dark:hover:bg-gray-700 dark:hover:text-white">
                                    <span className="sr-only">Previous</span>
                                    <svg className="w-5 h-5" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                                        <path fillRule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clipRule="evenodd" />
                                    </svg>
                                </a>
                            </li>
                            <li>
                                <a href="#" className="flex items-center justify-center text-sm py-2 px-3 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-white dark:hover:bg-gray-700 dark:hover:text-white">1</a>
                            </li>
                            <li>
                                <a href="#" className="flex items-center justify-center text-sm py-2 px-3 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-white dark:hover:bg-gray-700 dark:hover:text-white">2</a>
                            </li>
                            <li>
                                <a href="#" aria-current="page" className="flex items-center justify-center text-sm z-10 py-2 px-3 leading-tight text-primary-600 bg-primary-50 border border-primary-300 hover:bg-primary-100 hover:text-primary-700 dark:border-gray-700 dark:bg-gray-700 dark:text-white">3</a>
                            </li>
                            <li>
                                <a href="#" className="flex items-center justify-center text-sm py-2 px-3 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-white dark:hover:bg-gray-700 dark:hover:text-white">...</a>
                            </li>
                            <li>
                                <a href="#" className="flex items-center justify-center text-sm py-2 px-3 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-white dark:hover:bg-gray-700 dark:hover:text-white">100</a>
                            </li>
                            <li>
                                <a href="#" className="flex items-center justify-center h-full py-1.5 px-3 leading-tight text-gray-500 bg-white -r-lg border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-white dark:hover:bg-gray-700 dark:hover:text-white">
                                    <span className="sr-only">Next</span>
                                    <svg className="w-5 h-5" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                                        <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
                                    </svg>
                                </a>
                            </li>
                        </ul>
                    </nav>
                </div>
            </div>
        </section>
    </>);
}
export default ManajemenUser
