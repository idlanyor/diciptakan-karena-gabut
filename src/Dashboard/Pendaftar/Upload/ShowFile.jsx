/* eslint-disable no-unused-vars */
import { useEffect, useState } from "react";
import { getTokenPendaftar, rosevelt } from "../../../Components/Reusable";
// import { STORAGE } from "../../../constants";

import { FaSearch, FaUpload } from "react-icons/fa";
function ShowFilePendaftar() {
    const [data, setData] = useState({
        kk: "",
        ijazah: "",
        skl: "",
        pasfoto: "",
        id_pendaftar: 0
    });
    useEffect(() => {
        rosevelt.defaults.headers.common['Authorization'] = `Bearer ${getTokenPendaftar()}`
        rosevelt.get('file-pendaftar').then((res) => {
            setData(res.data);
        });
    }, [])

    return (
        <div className="block p-6 bg-white border border-gray-200 shadow dark:bg-gray-800 dark:border-gray-700">
            <h5 className="mb-2 p-2 text-2xl font-bold border-b tracking-tight text-gray-900 dark:text-white">
                Lihat Berkas Pendaftaran
            </h5>
            <div className="mt-5 flex items-center">
                <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                    <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                        <tr>
                            <th scope="col" className="px-6 py-3">
                                Nama Berkas
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Keterangan
                            </th>
                            <th scope="col" className="px-6 py-3">
                                #
                            </th>

                        </tr>
                    </thead>
                    <tbody>
                        <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                            <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                Kartu Keluarga
                            </th>
                            <td className="px-6 py-4">
                                Belum Upload
                            </td>
                            <td className="px-6 py-4 space-x-4 flex">
                                <button className=" p-2 flex items-center bg-primary-500 hover:bg-primary-700 dark:hover:bg-blue-700 dark:bg-blue-500 text-white"><FaSearch /> &nbsp;Lihat Berkas</button>
                                <button className=" p-2 flex items-center bg-primary-500 dark:bg-blue-500 text-white"><FaUpload />&nbsp;Upload</button>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>


    );
}

export default ShowFilePendaftar;