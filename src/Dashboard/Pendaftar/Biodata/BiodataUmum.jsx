import axios from "axios";
import { useEffect, useState } from "react";
import ENDPOINT_PPDB from "../../../constants";
import { getTokenPendaftar } from "../../../Components/Reusable";
const initialData = {
    id: 0,
    nama_lengkap: '',
    nik: '',
    jk: '',
    tmpt_lahir: '',
    tgl_lahir: '',
    agama: '',
    kewarganegaraan: '',
    addr_prov: '',
    addr_kab: '',
    addr_kec: '',
    addr_des: '',
    addr_dus: '',
    addr_rt: '',
    addr_rw: '',
    id_pendaftar: 0,
    created_at: '',
    updated_at: '',
};
export default function BiodataUmum() {
    // Provinsi
    const [provinsi, setProvinsi] = useState([]);
    const [idProv, setIdProv] = useState(0);
    useEffect(() => {
        const getProvinsi = async () => {
            axios.defaults.headers.common["Content-Type"] = 'application/json';
            await axios.get('https://indo.rosevelt.my.id/api/provinsi?limit=99')
                .then((res) => {
                setProvinsi(res.data.data);
            });
        };
        getProvinsi();
    }, []);
    const handleProvChange = (e) => {
        const selectedIndex = e.target.selectedIndex;
        if (selectedIndex !== 0) {
            const selectedCode = provinsi[selectedIndex - 1].id;
            setIdProv(selectedCode);
        }
    };
    // Kabupaten
    const [kabupaten, setKabupaten] = useState([]);
    const [idKab, setIdKab] = useState(0);
    useEffect(() => {
        const getKabupaten = async () => {
            axios.defaults.headers.common["Content-Type"] = 'application/json';
            await axios.get(`https://indo.rosevelt.my.id/api/kabupaten?limit=99&provinsi_id=${idProv}`)
                .then((res) => {
                setKabupaten(res.data.data);
            });
        };
        getKabupaten();
    }, [idProv]);
    const handleKabChange = (e) => {
        const selectedIndex = e.target.selectedIndex;
        if (selectedIndex !== 0) {
            const selectedCode = kabupaten[selectedIndex - 1].id;
            setIdKab(selectedCode);
        }
    };
    // Kecamatan
    const [kecamatan, setKecamatan] = useState([]);
    const [idKec, setIdKec] = useState(0);
    useEffect(() => {
        const getKecamatan = async () => {
            axios.defaults.headers.common["Content-Type"] = 'application/json';
            await axios.get(`https://indo.rosevelt.my.id/api/kecamatan?limit=30&kabupaten_id=${idKab}`)
                .then((res) => {
                setKecamatan(res.data.data);
            });
        };
        getKecamatan();
    }, [idKab]);
    const handleKecChange = (e) => {
        const selectedIndex = e.target.selectedIndex;
        if (selectedIndex !== 0) {
            const selectedCode = kecamatan[selectedIndex - 1].id;
            setIdKec(selectedCode);
        }
    };
    // Kelurahan
    const [kelurahan, setKelurahan] = useState([]);
    useEffect(() => {
        const getKelurahan = async () => {
            axios.defaults.headers.common["Content-Type"] = 'application/json';
            await axios.get(`https://indo.rosevelt.my.id/api/kelurahan?limit=30&kecamatan_id=${idKec}`)
                .then((res) => {
                setKelurahan(res.data.data);
            });
        };
        getKelurahan();
    }, [idKec]);
    // Get Biodata umum
    const [dataBio, setDataBio] = useState(initialData);
    useEffect(() => {
        const getBio = async () => {
            axios.defaults.headers.common['Authorization'] = `Bearer ${getTokenPendaftar()}`;
            await axios.get(ENDPOINT_PPDB + 'biodata')
                .then((res) => {
                setDataBio(res.data.data[0]);
                // console.log(res.data.data[0])
            }).catch((e) => { throw e; });
        };
        getBio();
    }, []);
    // const [jenisKelamin,setJenisKelamin] = useState<string>('');
    // const [agama,setAgama] = useState<string>('');
    // const [kewarganegaraan,setKewarganegaraan] = useState<string>('');
    // setter method
    console.log(dataBio);
    return (<div className="block p-6 bg-white border border-gray-200  shadow  dark:bg-gray-800 dark:border-gray-700 ">
            <div className="py-2 px-4 mx-auto lg:py-4">
                <h2 className="mb-4 text-xl font-bold text-gray-900 dark:text-white">Biodata Umum</h2>
                <form action="#">
                    <div className="grid gap-4 sm:grid-cols-2 sm:gap-6">
                        <div className="sm:col-span-2">
                            <label htmlFor="name" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Nama Lengkap</label>
                            <input type="text" name="name" id="name" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm -lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" placeholder="Masukkan nama lengkap"/>
                        </div>
                        <div className="w-full">
                            <label htmlFor="nik" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">NIK</label>
                            <input type="text" name="nik" id="nik" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm -lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" placeholder="Nomor Identitas Kependudukan"/>
                        </div>
                        <div className="w-full">
                            <label htmlFor="jenis_kelamin" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Jenis Kelamin</label>
                            <select id="jenis_kelamin" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm -lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500">
                                <option>Pilih Jenis Kelamin</option>
                                <option value="Laki - Laki">Laki - Laki</option>
                                <option value="Perempuan">Perempuan</option>
                            </select>
                        </div>
                        <div>
                            <label htmlFor="tempat_lahir" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Tempat lahir</label>
                            <input type="text" name="tempat_lahir" id="tempat_lahir" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm -lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" placeholder="Masukkan tempat lahir"/>
                        </div>
                        <div>
                            <label htmlFor="tgl_lahir" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Tanggal Lahir</label>
                            <input type="date" name="tgl_lahir" id="tgl_lahir" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm -lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" placeholder="Masukkan tanggal lahir"/>
                        </div>
                        <div>
                            <label htmlFor="agama" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Agama</label>
                            <select id="agama" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm -lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500">
                                <option>Pilih Agama</option>
                                <option value={1}>Islam</option>
                                <option value={2}>Kristen</option>
                                <option value={3}>Katholik</option>
                                <option value={4}>Hindu</option>
                                <option value={5}>Buddha</option>
                                <option value={6}>Konghuchu</option>
                            </select>
                        </div>
                        <div>
                            <label htmlFor="kewarganegaraan" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Kewarganegaraan</label>
                            <select id="kewarganegaraan" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm -lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500">
                                <option>Pilih Kewarganegaraan</option>
                                <option value="WNA">WNI ( Warga Negara Indonesia )</option>
                                <option value="Perempuan">WNA ( Warga Negara Asing )</option>
                            </select>
                        </div>
                        <div>
                            <label htmlFor="provinsi" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Provinsi</label>
                            <select id="provinsi" onChange={handleProvChange} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm -lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500">
                                <option defaultValue={1}>Pilih Provinsi</option>
                                {provinsi.map((pv) => (<option key={pv.id} id={pv.code} value={pv.name}>
                                        {pv.name}
                                    </option>))}
                            </select>
                        </div>
                        <div>
                            <label htmlFor="kabupaten" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Kabupaten</label>
                            <select disabled={kabupaten.length === 0} onChange={handleKabChange} id="kabupaten" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm -lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500">
                                {kabupaten.length == 0 && <option defaultValue={1}>Pilih Provinsi terlebih dahulu</option>}
                                {kabupaten.length > 0 && (<>
                                            <option defaultValue={1}>Pilih Kabupaten</option>
                                            {kabupaten.map((kab) => (<option key={kab.id} id={kab.code} value={kab.name}>
                                                    {kab.name}
                                                </option>))}
                                        </>)}
                            </select>
                        </div>
                        <div>
                            <label htmlFor="kecamatan" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Kecamatan</label>
                            <select disabled={kecamatan.length === 0} onChange={handleKecChange} id="kecamatan" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm -lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500">
                                {kecamatan.length == 0 && <option defaultValue={1}>Pilih Kabupaten terlebih dahulu</option>}
                                {kecamatan.length > 0 && (<>
                                            <option defaultValue={1}>Pilih Kecamatan</option>
                                            {kecamatan.map((kec) => (<option key={kec.id} id={kec.code} value={kec.name}>
                                                    {kec.name}
                                                </option>))}
                                        </>)}
                            </select>
                        </div>
                        <div>
                            <label htmlFor="kelurahan" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Kelurahan/Desa</label>
                            <select disabled={kelurahan.length === 0} id="kelurahan" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm -lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500">
                                {kelurahan.length == 0 && <option defaultValue={1}>Pilih Kecamatan terlebih dahulu</option>}
                                {kelurahan.length > 0 && (<>
                                            <option defaultValue={1}>Pilih Kelurahan</option>
                                            {kelurahan.map((kelur) => (<option key={kelur.id} id={kelur.code} value={kelur.name}>
                                                    {kelur.name}
                                                </option>))}
                                        </>)}
                            </select>
                        </div>
                        <div>
                            <label htmlFor="rt" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">RT</label>
                            <input type="text" name="rt" id="rt" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm -lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" placeholder="RT"/>
                        </div>
                        <div>
                            <label htmlFor="rw" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">RW</label>
                            <input type="text" name="rw" id="rw" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm -lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" placeholder="RW"/>
                        </div>
                    </div>
                    <button type="submit" className="inline-flex items-center px-5 py-2.5 mt-4 sm:mt-6 text-sm font-medium text-center text-white bg-primary-700 -lg focus:ring-4 focus:ring-primary-200 dark:focus:ring-primary-900 hover:bg-primary-800">
                        Simpan
                    </button>
                    <button type="submit" className="inline-flex mx-2 items-center px-5 py-2.5 mt-4 sm:mt-6 text-sm font-medium text-center text-white bg-primary-700 -lg focus:ring-4 focus:ring-primary-200 dark:focus:ring-primary-900 hover:bg-primary-800">
                        Simpan
                    </button>
                </form>
            </div>
        </div>);
}
