import { FaCalendarTimes, FaPencilAlt } from "react-icons/fa";
import { useState } from "react";

export default function JalurSettings() {
    const [editModal, setEditModal] = useState(false);
    const [selectedId, setSelectedId] = useState();
    const dummyData = [
        {
            "id": 1,
            "Jalur": "Zonasi",
            "Periode": "12 Januari 2024 - 3 Juni 2024",
            "Jadwal": "Lihat Jadwal",
            "Kuota": "15/200"
        },
        {
            "id": 2,
            "Jalur": "Afirmasi",
            "Periode": "12 Januari 2024 - 3 Juni 2024",
            "Jadwal": "Lihat Jadwal",
            "Kuota": "15/200"
        },
        {
            "id": 3,
            "Jalur": "Prestasi",
            "Periode": "12 Januari 2024 - 3 Juni 2024",
            "Jadwal": "Lihat Jadwal",
            "Kuota": "15/200"
        },
        {
            "id": 4,
            "Jalur": "Perpindahan Orang Tua",
            "Periode": "12 Januari 2024 - 3 Juni 2024",
            "Jadwal": "Lihat Jadwal",
            "Kuota": "15/200"
        },
    ];
    const editHandler = (id) => {
        setEditModal(!editModal);
        setSelectedId(id)
    };
    const hapusHandler = (id) => {
        setEditModal(!editModal);
        setSelectedId(id)
    };
    const selectedData = selectedId ? dummyData.find(data => data.id === selectedId) : null;
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
                                    Jalur
                                </th>
                                <th scope="col" className="px-6 py-3">
                                    Periode
                                </th>
                                <th scope="col" className="px-6 py-3">
                                    Jadwal
                                </th>
                                <th scope="col" className="px-6 py-3">
                                    Kuota
                                </th>
                                <th scope="col" className="px-6 py-3">
                                    #
                                    <span className="sr-only">Edit</span>
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                dummyData.map((d, index) => (
                                    <tr key={index} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                                        <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                            {d.id}
                                        </th>
                                        <td className="px-6 py-4">
                                            {d.Jalur}
                                        </td>
                                        <td className="px-6 py-4">
                                            {d.Periode}
                                        </td>
                                        <td className="px-6 py-4">
                                            <button className="bg-purple-500 text-white p-2 flex items-center">
                                                <FaCalendarTimes />&nbsp;Lihat Jadwal
                                            </button>
                                        </td>
                                        <td className="px-6 py-4 ">
                                            {d.Kuota}
                                        </td>
                                        <td className="px-6 py-4 flex space-x-2">
                                            <button onClick={() => editHandler(d.id)} className="block text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium text-sm p-2 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800" type="button">
                                                <FaPencilAlt />
                                            </button>
                                            <button onClick={() => editHandler(d.id)} className="block text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium text-sm p-2 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800" type="button">
                                                <FaPencilAlt />
                                            </button>
                                        </td>
                                    </tr>
                                ))
                            }

                        </tbody>
                    </table>
                </div>

            </div>
        </div>);
}
