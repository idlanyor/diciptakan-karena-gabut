import axios from "axios";
import { useEffect, useState } from "react";
import ENDPOINT_PPDB from "../../../constants";
import { getTokenPendaftar, rosevelt } from "../../../Components/Reusable";
import letSwall from "../../../Components/Sweetalert";
export default function BiodataUmum() {
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
    };
    
    const initValidasi = {
        nama_lengkap: [],
        nik: [],
        jk: [],
        tmpt_lahir: [],
        tgl_lahir: [],
        agama: [],
        kewarganegaraan: [],
        addr_prov: [],
        addr_kab: [],
        addr_kec: [],
        addr_des: [],
        addr_dus: [],
        addr_rt: [],
        addr_rw: [],
    };
    const [value, setValue] = useState(initialData)
    const [validasi, setValidasi] = useState(initValidasi)
    const inputHandler = (e) => {
        const { name, value: inputValue } = e.target;
        setValue((prevValue) => ({
            ...prevValue,
            [name]: inputValue,
        }));
    };


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
        inputHandler(e)
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
        inputHandler(e)
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
        inputHandler(e)
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
    useEffect(() => {
        const getBio = async () => {
            rosevelt.defaults.headers.common['Authorization'] = `Bearer ${getTokenPendaftar()}`;
            await rosevelt.get(ENDPOINT_PPDB + 'biodata-umum')
                .then((res) => {
                    if (res.data.data !== null) {
                        setValue(res.data.data);
                        // Setter agama dropdown
                        const setDropdownValue = (idElement, value) => {
                            const elDropdown = document.getElementById(idElement);
                            const selectedEl = res.data.data[value];
                            for (let i = 0; i < elDropdown.options.length; i++) {
                                if (elDropdown.options[i].value === selectedEl) {
                                    elDropdown.options[i].setAttribute('selected', 'selected');
                                }
                            }
                        }
                        if (document.getElementById('agama')) {
                            setDropdownValue('agama', 'agama')
                        }
                        if (document.getElementById('kewarganegaraan')) {
                            setDropdownValue('kewarganegaraan', 'kewarganegaraan')
                        }
                        // if (document.getElementById('provinsi')) {
                        //     setDropdownValue('provinsi', 'addr_prov')
                        // }
                        // if (document.getElementById('kabupaten')) {
                        //     setDropdownValue('kabupaten', 'addr_kab')
                        // }
                        // if (document.getElementById('kecamatan')) {
                        //     setDropdownValue('kecamatan', 'addr_kec')
                        // }
                        // if (document.getElementById('kelurahan')) {
                        //     setDropdownValue('kelurahan', 'addr_des')
                        // }
                        // if (document.getElementById('jenis_kelamin')) {
                        //     setDropdownValue('jenis_kelamin', 'jk')
                        // }
                    }
                }).catch((e) => { throw e; });
        };
        getBio();
    }, []);
    //kirim ke server
    const handleSubmit = async (e) => {
        e.preventDefault();
        let dataToSend = { ...value, id_pendaftar: 0 };
        // console.log(dataToSend)
        try {
            rosevelt.defaults.headers.common['Authorization'] = `Bearer ${getTokenPendaftar()}`;
            await rosevelt.post(ENDPOINT_PPDB + 'biodata-umum', dataToSend);
            // Berhasil mengirim, lakukan sesuatu (redirect, tampilkan pesan sukses, dll.)
            console.log('Data berhasil dikirim:', dataToSend);
            letSwall.fire({
                title: "Berhasil",
                text: "Data berhasil diperbarui",
                icon: 'success',
                timer: 1500,
                timerProgressBar: true,
                customClass: {
                    popup: 'bg-gray-50 dark:bg-slate-900'
                }
            });
        }
        catch (error) {
            setValidasi(error.response?.data)
            console.log(error)
            letSwall.fire({
                title: 'Ups,Terjadi Kesalahan',
                text: error,
                icon: 'error'
            })
            // console.log(error.response?.data.nama_lengkap[0]);
        }
    };

    return (<div className="block p-6 bg-white border border-gray-200  shadow  dark:bg-gray-800 dark:border-gray-700 ">
        <div className="py-2 px-4 mx-auto lg:py-4">
            <h2 className="mb-4 text-xl font-bold text-gray-900 dark:text-white">Biodata</h2>
            <form onSubmit={handleSubmit}>
                {validasi.nama_lengkap && (<span>{validasi.nama_lengkap[0]}</span>)}
                <div className="grid gap-4 sm:grid-cols-2 sm:gap-6">
                    <div className="sm:col-span-2">
                        <label htmlFor="nama_lengkap" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Nama Lengkap</label>
                        <input onChange={inputHandler} value={value.nama_lengkap} type="text" name="nama_lengkap" id="name" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm -lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" placeholder="Masukkan nama lengkap" />
                    </div>
                    <div className="w-full">
                        <label htmlFor="nik" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">NIK</label>
                        <input onChange={inputHandler} value={value.nik} type="text" name="nik" id="nik" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm -lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" placeholder="Nomor Identitas Kependudukan" />
                    </div>
                    <div className="w-full">
                        <label htmlFor="jenis_kelamin" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Jenis Kelamin</label>
                        <select name="jk" onChange={inputHandler} id="jenis_kelamin" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm -lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500">
                            <option>Pilih Jenis Kelamin</option>
                            <option value="Laki - laki">Laki - Laki</option>
                            <option value="Perempuan">Perempuan</option>
                        </select>
                    </div>
                    <div>
                        <label htmlFor="tempat_lahir" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Tempat lahir</label>
                        <input onChange={inputHandler} type="text" value={value.tmpt_lahir} name="tmpt_lahir" id="tempat_lahir" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm -lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" placeholder="Masukkan tempat lahir" />
                    </div>
                    <div>
                        <label htmlFor="tgl_lahir" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Tanggal Lahir</label>
                        <input onChange={inputHandler} type="date" value={value.tgl_lahir} name="tgl_lahir" id="tgl_lahir" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm -lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" placeholder="Masukkan tanggal lahir" />
                    </div>
                    <div>
                        <label htmlFor="agama" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Agama</label>
                        <select name="agama" onChange={inputHandler} id="agama" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm -lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500">
                            <option>Pilih Agama</option>
                            <option value="Islam">Islam</option>
                            <option value="Kristen">Kristen</option>
                            <option value="Katholik">Katholik</option>
                            <option value="Hindu">Hindu</option>
                            <option value="Buddha">Buddha</option>
                            <option value="Konghuchu">Konghuchu</option>
                        </select>
                    </div>
                    <div>
                        <label htmlFor="kewarganegaraan" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Kewarganegaraan</label>
                        <select onChange={inputHandler} name="kewarganegaraan" id="kewarganegaraan" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm -lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500">
                            <option>Pilih Kewarganegaraan</option>
                            <option value="WNI">WNI ( Warga Negara Indonesia )</option>
                            <option value="WNA">WNA ( Warga Negara Asing )</option>
                        </select>
                    </div>
                    <div>
                        <label htmlFor="provinsi" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Provinsi</label>
                        <select id="provinsi" onChange={handleProvChange} name="addr_prov" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm -lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500">
                            <option value={1}>Pilih Provinsi</option>
                            {provinsi.map((pv) => (<option key={pv.id} id={pv.code} value={pv.id}>
                                {pv.name}
                            </option>))}
                        </select>
                    </div>
                    <div>
                        <label htmlFor="kabupaten" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Kabupaten</label>
                        <select name="addr_kab" onChange={handleKabChange} id="kabupaten" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm -lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500">
                            {kabupaten.length == 0 && <option defaultValue={1}>Pilih Provinsi terlebih dahulu</option>}
                            {kabupaten.length > 0 && (<>
                                <option value={1}>Pilih Kabupaten</option>
                                {kabupaten.map((kab) => (<option key={kab.id} id={kab.code} value={kab.id}>
                                    {kab.name}
                                </option>))}
                            </>)}
                        </select>
                    </div>
                    <div>
                        <label htmlFor="kecamatan" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Kecamatan</label>
                        <select name="addr_kec" onChange={handleKecChange} id="kecamatan" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm -lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500">
                            {kecamatan.length == 0 && <option value={1}>Pilih Kabupaten terlebih dahulu</option>}
                            {kecamatan.length > 0 && (<>
                                <option value={1}>Pilih Kecamatan</option>
                                {kecamatan.map((kec) => (<option key={kec.id} id={kec.code} value={kec.id}>
                                    {kec.name}
                                </option>))}
                            </>)}
                        </select>
                    </div>
                    <div>
                        <label htmlFor="kelurahan" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Kelurahan/Desa</label>
                        <select onChange={inputHandler} name="addr_des" id="kelurahan" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm -lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500">
                            {kelurahan.length == 0 && <option value={1}>Pilih Kecamatan terlebih dahulu</option>}
                            {kelurahan.length > 0 && (<>
                                <option value={1}>Pilih Kelurahan</option>
                                {kelurahan.map((kelur) => (<option key={kelur.id} id={kelur.code} value={kelur.id}>
                                    {kelur.name}
                                </option>))}
                            </>)}
                        </select>
                    </div>
                    <div className="sm:col-span-2">
                        <label htmlFor="rt" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Dusun</label>
                        <input type="text" onChange={inputHandler} value={value.addr_dus} name="addr_dus" id="dusun" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm -lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" placeholder="Dusun" />
                    </div>
                    <div>
                        <label htmlFor="rt" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">RT</label>
                        <input type="text" onChange={inputHandler} value={value.addr_rt} name="addr_rt" id="rt" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm -lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" placeholder="RT" />
                    </div>
                    <div>
                        <label htmlFor="rw" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">RW</label>
                        <input type="text" onChange={inputHandler} value={value.addr_rw} name="addr_rw" id="rw" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm -lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" placeholder="RW" />
                    </div>
                </div>
                <button type="submit" className="inline-flex items-center px-5 py-2.5 mt-4 sm:mt-6 text-sm font-medium text-center text-white bg-primary-700 -lg focus:ring-4 focus:ring-primary-200 dark:focus:ring-primary-900 hover:bg-primary-800">
                    Simpan
                </button>
                <button onClick={() => setValue(initialData)} className="inline-flex mx-2 items-center px-5 py-2.5 mt-4 sm:mt-6 text-sm font-medium text-center text-white bg-red-700 -lg focus:ring-4 focus:ring-primary-200 dark:focus:ring-primary-900 hover:bg-primary-800">
                    Reset
                </button>
            </form>
        </div>
    </div>);
}
