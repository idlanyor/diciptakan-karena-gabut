/* eslint-disable react-hooks/exhaustive-deps */
import axios from "axios";
import { format, parseISO } from "date-fns";
import { id } from "date-fns/locale";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import ENDPOINT_PPDB from "../../../constants";
import { getTokenPendaftar } from "../../../Components/Reusable";
import { FaCalendarAlt, FaRoute, FaCheckCircle, FaTimesCircle, FaClock, FaClipboardList, FaUserCircle } from "react-icons/fa";
import { HiSparkles } from "react-icons/hi";
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

    // Function to get status badge styling
    const getStatusBadge = (status) => {
        switch (status) {
            case 0:
                return {
                    bg: 'bg-blue-100 dark:bg-blue-900/30',
                    text: 'text-blue-800 dark:text-blue-300',
                    icon: <FaClock className="inline mr-1" />,
                    label: 'Tahap Pendaftaran Awal'
                };
            case 1:
                return {
                    bg: 'bg-yellow-100 dark:bg-yellow-900/30',
                    text: 'text-yellow-800 dark:text-yellow-300',
                    icon: <FaClock className="inline mr-1" />,
                    label: 'Proses Validasi'
                };
            case 3:
                return {
                    bg: 'bg-green-100 dark:bg-green-900/30',
                    text: 'text-green-800 dark:text-green-300',
                    icon: <FaCheckCircle className="inline mr-1" />,
                    label: 'Diterima'
                };
            case 4:
                return {
                    bg: 'bg-red-100 dark:bg-red-900/30',
                    text: 'text-red-800 dark:text-red-300',
                    icon: <FaTimesCircle className="inline mr-1" />,
                    label: 'Tidak Diterima'
                };
            default:
                return {
                    bg: 'bg-gray-100 dark:bg-gray-900/30',
                    text: 'text-gray-800 dark:text-gray-300',
                    icon: <FaClock className="inline mr-1" />,
                    label: 'Tahap Pendaftaran Awal'
                };
        }
    };

    const statusBadge = getStatusBadge(user.status);
    return (<>
        {/* Welcome Card with Gradient */}
        <div className="relative overflow-hidden bg-gradient-to-br from-purple-500 via-purple-600 to-blue-600 rounded-2xl shadow-xl p-8 mb-6 animate-fade-in-up">
            <div className="absolute top-0 right-0 -mt-4 -mr-4 w-32 h-32 bg-white/10 rounded-full blur-3xl"></div>
            <div className="absolute bottom-0 left-0 -mb-4 -ml-4 w-40 h-40 bg-white/10 rounded-full blur-3xl"></div>
            <div className="relative z-10">
                <div className="flex items-center gap-3 mb-4">
                    <HiSparkles className="text-yellow-300 text-3xl animate-pulse" />
                    <h5 className="text-3xl font-bold text-white">Selamat Datang!</h5>
                </div>
                <Link to="/dashboard/akun" className="inline-flex items-center gap-2 text-2xl font-semibold text-white hover:text-yellow-200 transition-colors group">
                    <FaUserCircle className="text-xl" />
                    {user.nama_lengkap}
                    <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                </Link>
            </div>
        </div>

        {/* Registration Information Card */}
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg border border-gray-200 dark:border-gray-700 p-6 mb-6 animate-fade-in-up" style={{animationDelay: '0.1s'}}>
            <div className="flex items-center gap-3 mb-6">
                <div className="p-3 bg-gradient-to-br from-purple-500 to-purple-600 rounded-xl">
                    <FaClipboardList className="text-white text-xl" />
                </div>
                <h5 className="text-2xl font-bold text-gray-900 dark:text-white">Informasi Pendaftaran</h5>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Tanggal Mendaftar */}
                <div className="flex items-start gap-3 p-4 bg-gray-50 dark:bg-gray-900/50 rounded-xl hover:shadow-md transition-shadow">
                    <div className="p-2 bg-blue-100 dark:bg-blue-900/30 rounded-lg">
                        <FaCalendarAlt className="text-blue-600 dark:text-blue-400" />
                    </div>
                    <div>
                        <p className="text-sm text-gray-500 dark:text-gray-400 font-medium">Tanggal Mendaftar</p>
                        <p className="text-base font-semibold text-gray-900 dark:text-white">{tglDaftar}</p>
                    </div>
                </div>

                {/* Gelombang/Jalur */}
                <div className="flex items-start gap-3 p-4 bg-gray-50 dark:bg-gray-900/50 rounded-xl hover:shadow-md transition-shadow">
                    <div className="p-2 bg-purple-100 dark:bg-purple-900/30 rounded-lg">
                        <FaRoute className="text-purple-600 dark:text-purple-400" />
                    </div>
                    <div>
                        <p className="text-sm text-gray-500 dark:text-gray-400 font-medium">Gelombang / Jalur</p>
                        <p className="text-base font-semibold text-gray-900 dark:text-white">{user.gelombang} / {user.jalur_pendaftaran}</p>
                    </div>
                </div>

                {/* Status Pendaftaran */}
                <div className="flex items-start gap-3 p-4 bg-gray-50 dark:bg-gray-900/50 rounded-xl hover:shadow-md transition-shadow">
                    <div className={`p-2 ${statusBadge.bg} rounded-lg`}>
                        <span className={statusBadge.text}>{statusBadge.icon}</span>
                    </div>
                    <div>
                        <p className="text-sm text-gray-500 dark:text-gray-400 font-medium">Status Pendaftaran</p>
                        <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-semibold ${statusBadge.bg} ${statusBadge.text}`}>
                            {statusBadge.icon}
                            {statusBadge.label}
                        </span>
                    </div>
                </div>

                {/* Tanggal Diterima */}
                <div className="flex items-start gap-3 p-4 bg-gray-50 dark:bg-gray-900/50 rounded-xl hover:shadow-md transition-shadow">
                    <div className="p-2 bg-green-100 dark:bg-green-900/30 rounded-lg">
                        <FaCheckCircle className="text-green-600 dark:text-green-400" />
                    </div>
                    <div>
                        <p className="text-sm text-gray-500 dark:text-gray-400 font-medium">Tanggal Diterima</p>
                        <p className="text-base font-semibold text-gray-900 dark:text-white">{tglDiterima}</p>
                    </div>
                </div>
            </div>
        </div>

        {/* Registration Process Card */}
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg border border-gray-200 dark:border-gray-700 p-6 animate-fade-in-up" style={{animationDelay: '0.2s'}}>
            <div className="flex items-center gap-3 mb-6">
                <div className="p-3 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl">
                    <FaClipboardList className="text-white text-xl" />
                </div>
                <h5 className="text-2xl font-bold text-gray-900 dark:text-white">Proses Pendaftaran Online</h5>
            </div>
            <div className="relative overflow-x-auto rounded-xl">
                {
                    loading ? (
                        <div role="status" className="max-w-full animate-pulse space-y-4 p-4">
                            <div className="flex space-x-4 justify-between">
                                <div className="h-8 bg-gradient-to-r from-gray-200 to-gray-300 dark:from-gray-700 dark:to-gray-600 rounded-lg w-1/12"></div>
                                <div className="h-8 bg-gradient-to-r from-gray-200 to-gray-300 dark:from-gray-700 dark:to-gray-600 rounded-lg w-6/12"></div>
                                <div className="h-8 bg-gradient-to-r from-gray-200 to-gray-300 dark:from-gray-700 dark:to-gray-600 rounded-lg w-4/12"></div>
                            </div>
                            {[...Array(5)].map((_, i) => (
                                <div key={i} className="flex space-x-4 justify-between">
                                    <div className="h-12 bg-gray-200 dark:bg-gray-700 rounded-lg w-1/12"></div>
                                    <div className="h-12 bg-gray-200 dark:bg-gray-700 rounded-lg w-6/12"></div>
                                    <div className="h-12 bg-gray-200 dark:bg-gray-700 rounded-lg w-4/12"></div>
                                </div>
                            ))}
                            <span className="sr-only">Loading...</span>
                        </div>
                    ) : (
                        <div className="overflow-hidden rounded-xl border border-gray-200 dark:border-gray-700">
                            <table className="w-full text-sm text-left">
                                <thead className="text-xs font-semibold uppercase bg-gradient-to-r from-purple-50 to-blue-50 dark:from-gray-700 dark:to-gray-600">
                                    <tr>
                                        <th scope="col" className="px-6 py-4 text-purple-900 dark:text-purple-200">
                                            No
                                        </th>
                                        <th scope="col" className="px-6 py-4 text-purple-900 dark:text-purple-200">
                                            Proses
                                        </th>
                                        <th scope="col" className="px-6 py-4 text-purple-900 dark:text-purple-200">
                                            Status
                                        </th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {proses && proses.map((item, index) => (
                                        <tr
                                            key={item.id}
                                            className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 hover:bg-purple-50 dark:hover:bg-gray-700/50 transition-colors"
                                        >
                                            <th scope="row" className="px-6 py-4 font-bold text-purple-600 dark:text-purple-400">
                                                {index + 1}
                                            </th>
                                            <td className="px-6 py-4 text-gray-900 dark:text-white font-medium">
                                                <div className="flex items-center gap-2">
                                                    <div className="w-2 h-2 rounded-full bg-purple-500 animate-pulse"></div>
                                                    {item.nama_tahapan_proses}
                                                </div>
                                            </td>
                                            <td className="px-6 py-4">
                                                <span className={`inline-flex items-center px-3 py-1.5 rounded-full text-xs font-semibold ${
                                                    item.status.toLowerCase().includes('selesai') || item.status.toLowerCase().includes('lengkap')
                                                        ? 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300'
                                                        : item.status.toLowerCase().includes('proses') || item.status.toLowerCase().includes('validasi')
                                                        ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-300'
                                                        : item.status.toLowerCase().includes('belum')
                                                        ? 'bg-gray-100 text-gray-800 dark:bg-gray-900/30 dark:text-gray-300'
                                                        : 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300'
                                                }`}>
                                                    {item.status.toLowerCase().includes('selesai') || item.status.toLowerCase().includes('lengkap') ? (
                                                        <FaCheckCircle className="mr-1" />
                                                    ) : (
                                                        <FaClock className="mr-1" />
                                                    )}
                                                    {item.status}
                                                </span>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    )
                }
            </div>

        </div>
    </>);
};
export default InformasiUmumPendaftar;
