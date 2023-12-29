/* eslint-disable react-hooks/exhaustive-deps */
import axios from "axios";
import { format, parseISO } from "date-fns";
import { id } from "date-fns/locale";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import ENDPOINT_PPDB from "../../../constants";
import { getTokenPendaftar } from "../../../Components/Reusable";
const InformasiUmumPendaftar = () => {
    const [loading, setLoading] = useState(true)
    const [user, setUser] = useState({
        nama_lengkap: '',
        email: '',
        tgl_lahir: '',
        status: 0,
        tgl_daftar: '2001-05-12',
        tgl_diterima: '2001-05-12'
    });
    const [tglDaftar, setTglDaftar] = useState('');
    const [tglDiterima, setTglDiterima] = useState('');
    const [statusText, setStatusText] = useState('');
    const token = getTokenPendaftar();
    const fetchData = async () => {
        axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
        await axios.get(ENDPOINT_PPDB + 'pendaftar')
            .then((res) => {
                setUser(res.data.data);
            }).catch((e) => {
                console.log(e);
            });
    };
    useEffect(() => {
        fetchData();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [token]);
    useEffect(() => {
        const formatTgl = async (tgl) => {
            // console.log(tgl)
            if (tgl === null) {
                return "Belum ditentukan";
            }
            else {
                const parsedDate = await parseISO(tgl);
                return await format(parsedDate, 'dd MMMM yyyy', { locale: id });
            }
        };
        const formatDates = async () => {
            const tglDaftarFormatted = await formatTgl(user.tgl_daftar);
            const tglDiterimaFormatted = await formatTgl(user.tgl_diterima);
            setTglDaftar(tglDaftarFormatted);
            setTglDiterima(tglDiterimaFormatted);
        };
        formatDates();
    }, [user.tgl_daftar, user.tgl_diterima]);
    useEffect(() => {
        const getStatusText = () => {
            switch (user.status) {
                case 0:
                    setStatusText('Tahap Pendaftaran Awal');
                    break;
                case 1:
                    setStatusText('Proses Validasi');
                    break;
                case 3:
                    setStatusText('Diterima');
                    break;
                case 4:
                    setStatusText('Tidak Diterima');
                    break;
                default:
                    setStatusText('Tahap Pendaftaran Awal');
                    break;
            }
        };
        getStatusText();
    }, []);
    const [proses, setProses] = useState();
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(ENDPOINT_PPDB + 'tahapan', {
                    headers: {
                        'Authorization': `Bearer ${getTokenPendaftar()}`
                    }
                });
                setProses(response.data.data);
            }
            catch (error) {
                console.error("Error fetching data:", error);
            }
            setLoading(false)
        };
        fetchData();
    }, []);
    return (<>
        <div className="block p-6 bg-white border border-gray-200  shadow  dark:bg-gray-800 dark:border-gray-700 ">
            <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">Selamat datang <Link to="/dashboard/akun" className="text-blue-500 hover:underline">{user.nama_lengkap}</Link></h5>
            <p className="text-gray-700 dark:text-white font-bold">Informasi Pendaftaran</p>
            <p className="font-normal text-gray-700 dark:text-white">Tanggal Mendaftar : {tglDaftar}</p>
            <p className="font-normal text-gray-700 dark:text-white">Gelombang /Jalur Pendaftaran : {user.gelombang + ' / ' + user.jalur_pendaftaran}</p>
            <p className="font-normal text-gray-700 dark:text-white">Status Pendaftaran : {statusText}</p>
            <p className="font-normal text-gray-700 dark:text-white">Tanggal Diterima : {tglDiterima}</p>
        </div>
        <div className="block p-6 mt-4 bg-white border border-gray-200  shadow  dark:bg-gray-800 dark:border-gray-700 ">
            <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">Proses Pendaftaran Online</h5>
            <div className="mt-5 relative overflow-x-auto">
                {
                    loading ? (
                        <>

                            <div role="status" className="max-w-full animate-pulse">
                                <div className="flex space-x-2 justify-between">
                                    <div className="h-5 bg-gray-200 dark:bg-gray-500 w-2/12 mb-4"></div>
                                    <div className="h-5 bg-gray-200 dark:bg-gray-500 w-6/12 mb-4"></div>
                                    <div className="h-5 bg-gray-200 dark:bg-gray-500 w-4/12 mb-4"></div>
                                </div>
                                <div className="h-2 bg-gray-200 dark:bg-gray-700 mb-2.5"></div>
                                <div className="h-2 bg-gray-200 dark:bg-gray-700 mb-2.5"></div>
                                <div className="h-2 bg-gray-200 dark:bg-gray-700 mb-2.5"></div>
                                <div className="h-2 bg-gray-200 dark:bg-gray-700 mb-2.5"></div>
                                <div className="h-2 bg-gray-200 dark:bg-gray-700 "></div>
                                <span className="sr-only">Loading...</span>
                            </div>


                        </>
                    ) : (

                        <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-white">
                            <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-white">
                                <tr>
                                    <th scope="col" className="px-6 py-3 w-2">
                                        No
                                    </th>
                                    <th scope="col" className="px-6 py-3">
                                        Proses
                                    </th>
                                    <th scope="col" className="px-6 py-3">
                                        Status
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                {proses && proses.map((item, index) => (<tr key={item.id} className="bg-white border-t dark:bg-gray-800 dark:border-gray-700">
                                    <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                        {index + 1}
                                    </th>
                                    <td className="px-6 py-4">
                                        {item.nama_tahapan_proses}
                                    </td>
                                    <td className="px-6 py-4">
                                        {item.status}
                                    </td>
                                </tr>))}
                            </tbody>
                        </table>
                    )
                }
            </div>

        </div>
    </>);
};
export default InformasiUmumPendaftar;
