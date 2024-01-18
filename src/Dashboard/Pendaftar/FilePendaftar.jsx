/* eslint-disable no-unused-vars */
import { useEffect, useState } from "react";
import { getTokenPendaftar, makeModal, rosevelt } from "../../Components/Reusable";

import { FaSearch, FaUpload } from "react-icons/fa";
import { STORAGE } from "../../constants";
function FilePendaftar() {
    // const [modal, setModal] = useState(null);
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
            setData(res.data.data);
        });
    }, [])
    const dataFormat = [
        {
            nama_berkas: 'Kartu Keluarga',
            url_gambar: data.kk
        },
        {
            nama_berkas: 'Surat Keterangan Lulus',
            url_gambar: data.skl
        },
        {
            nama_berkas: 'Pas Foto',
            url_gambar: data.pasfoto
        },
        {
            nama_berkas: 'Ijazah',
            url_gambar: data.ijazah
        },
    ]
    const showModal = (index) => {
        const modal = makeModal(`berkas-modal-${index}`)
        modal.show();
    }
    const hideModal = (index) => {
        const modal = makeModal(`berkas-modal-${index}`)
        modal.hide();
    }
    return (
        <div className="block p-6 bg-white border border-gray-200 shadow dark:bg-gray-800 dark:border-gray-700">
            <h5 className="mb-2 p-2 text-2xl font-bold border-b tracking-tight text-gray-900 dark:text-white">
                Berkas Pendaftaran
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
                                Action
                            </th>

                        </tr>
                    </thead>
                    <tbody>
                        {
                            dataFormat.map((d, index) => (
                                <tr key={index} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                                    <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                        {d.nama_berkas}
                                    </th>
                                    <td className="px-6 py-4">
                                        {
                                            (d.url_gambar === "") ? 'Belum Upload' : 'Sudah Upload'
                                        }
                                    </td>
                                    <td className="px-6 py-4 space-x-4 flex">
                                        <button onClick={() => showModal(index)} className=" p-2 flex items-center bg-primary-500 hover:bg-primary-700 dark:hover:bg-blue-700 dark:bg-blue-500 text-white"><FaSearch /> &nbsp;Lihat Berkas</button>
                                        <button className=" p-2 flex items-center bg-primary-500 hover:bg-primary-700 dark:hover:bg-blue-700 dark:bg-blue-500 text-white"><FaUpload />&nbsp;Upload</button>
                                    </td>
                                    <td>
                                        <div id={`berkas-modal-${index}`} tabIndex="-1" aria-hidden="true" className="hidden overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 justify-center items-center w-full md:inset-0 h-[calc(100%-1rem)] max-h-full">
                                            <div className="relative p-4 w-full max-w-2xl max-h-full">
                                                <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
                                                    <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600">
                                                        <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                                                            {d.nama_berkas}
                                                        </h3>
                                                        <button type="button" onClick={() => hideModal(index)} className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white">
                                                            <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                                                                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6" />
                                                            </svg>
                                                            <span className="sr-only">Close modal</span>
                                                        </button>
                                                    </div>
                                                    <div className="p-4 md:p-5 space-y-4">
                                                        <img src={STORAGE + d.url_gambar} />
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </td>
                                </tr>
                            ))
                        }
                    </tbody>
                </table>
            </div>
        </div>

    );
}

export default FilePendaftar;