/* eslint-disable no-unused-vars */
import { FaPencilAlt } from "react-icons/fa";
import { useEffect, useState } from "react";
import { getTokenPanel, makeModal, rosevelt } from "../../../Components/Reusable";
import { FaRegCalendarDays, FaTrashCan } from "react-icons/fa6";

export default function TahunAkademikSettings() {
    const JadwalModalId = {
        show: 'showJadwal',
        edit: 'editJadwal',
        hapus: 'hapusJadwal'
    }
    const initialData = [
        {
            id: "",
            tahun_ajaran: "",
            mulai: "",
            akhir: "",
            status: ""
        }
    ]
    // const showJadwalModal = makeModal(JadwalModalId.show)
    const [selectedId, setSelectedId] = useState(0);
    const [data, setData] = useState(initialData);
    const [jadwal, setJadwal] = useState([]);
    useEffect(() => {
        rosevelt.defaults.headers.common['Authorization'] = `Bearer ${getTokenPanel()}`
        rosevelt.get('panel/tahun-akademik').then((res) => {
            setData(res.data.data);
        }).catch((e) => {
            console.log(e);
        })
    }, [])
    // console.log(data)

    const editHandler = (id) => {
        setSelectedId(id)
    };
    const hapusHandler = (id) => {
        setSelectedId(id)
    };
    // const selectedData = selectedId ? dummyData.find(data => data.id === selectedId) : null;
    return (
        <div className="block p-6 bg-white border border-gray-200  shadow  dark:bg-gray-800 dark:border-gray-700 ">
            <div className="py-2 px-4 mx-auto lg:py-4">
                <div className="relative overflow-x-auto shadow-md ">
                    <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                            <tr>
                                <th scope="col" className="px-6 py-3">
                                    No
                                </th>
                                <th scope="col" className="px-6 py-3">
                                    Tahun Pelajaran
                                </th>
                                <th scope="col" className="px-6 py-3">
                                    Periode Mulai
                                </th>
                                <th scope="col" className="px-6 py-3">
                                    Periode Akhir
                                </th>
                                <th scope="col" className="px-6 py-3">
                                    Status
                                </th>
                                <th scope="col" className="px-6 py-3">
                                    #
                                    <span className="sr-only">Edit</span>
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                data.map((d, index) => (
                                    <>
                                        <tr key={d.id} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                                            <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                                {index + 1}
                                            </th>
                                            <td className="px-6 py-4">
                                                {d.tahun_ajaran}
                                            </td>
                                            <td className="px-6 py-4 ">
                                                {d.mulai}
                                            </td>
                                            <td className="px-6 py-4 ">
                                                {(d.akhir == null) ? "Belum ditentukan" : (d.akhir)}
                                            </td>
                                            <td className="px-6 py-4 ">
                                                {(d.status) ? "Aktif" : "Tidak Aktif"}
                                            </td>
                                            <td className="px-6 py-4 flex space-x-2">
                                                <button onClick={() => editHandler(d.id)} className="block text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium text-sm p-2 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800" type="button">
                                                    <FaPencilAlt />
                                                </button>
                                                <button onClick={() => hapusHandler(d.id)} className="block text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium text-sm p-2 text-center dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-800" type="button">
                                                    <FaTrashCan />
                                                </button>
                                            </td>

                                        </tr>
                                    </>
                                ))
                            }
                        </tbody>
                    </table>
                </div>
            </div>
        </div>);
}
