/* eslint-disable no-unused-vars */
import { useEffect, useState } from "react";
import { getTokenPendaftar, makeModal, rosevelt } from "../../Components/Reusable";

import { FaSearch, FaUpload } from "react-icons/fa";
import { STORAGE } from "../../constants";
import letSwall from "../../Components/Sweetalert";

function FilePendaftar() {
    // const [modal, setModal] = useState(null);
    const [file, setFile] = useState(null);
    const [data, setData] = useState({
        kk: "",
        ijazah: "",
        skl: "",
        pasfoto: "",
        id_pendaftar: 0
    });
    const fileFields = [
        { label: 'Kartu Keluarga', id: 0, name: 'kk' },
        { label: 'Ijazah', id: 1, name: 'ijazah' },
        { label: 'Surat Keterangan Lulus', id: 2, name: 'skl' },
        { label: 'Pasfoto Rasio 4x6', id: 3, name: 'pasfoto' },
    ];
    useEffect(() => {
        rosevelt.defaults.headers.common['Authorization'] = `Bearer ${getTokenPendaftar()}`
        rosevelt.get('file-pendaftar').then((res) => {
            setData(res.data.data);
        });
    }, []);
    const handleUpload = async (id) => {
        letSwall.fire({
            title: 'Konfirmasi Upload',
            text: `Apakah anda yakin untuk mengupload ${fileFields[id].label} ?`,
            icon: 'question',
            confirmButtonText: 'Yakin',
            showCancelButton: true,
            cancelButtonText: 'Belum'
        }).then(async (res) => {
            if (res.isConfirmed) {
                try {
                    const formData = new FormData();
                    formData.append('id_pendaftar', data.id_pendaftar);
                    formData.append(fileFields[id].name, file);
                    console.log(formData.getAll(fileFields[id].name))
                    const response = await rosevelt.post('file-pendaftar', formData, {
                        headers: {
                            'Content-Type': 'multipart/form-data',
                            Authorization: `Bearer ${getTokenPendaftar()}`,
                        },
                    });

                    console.log(`${fileFields[id].label} upload response:`, response.data);
                    letSwall.fire({
                        title: 'Sukses',
                        text: `${fileFields[id].label} berhasil diupload`,
                        icon: 'success'
                    });

                    // Refresh data setelah upload berhasil
                    rosevelt.get('file-pendaftar').then((res) => {
                        setData(res.data.data);
                    });
                } catch (error) {
                    console.log(`Error uploading ${fileFields[id].label}:`, error);
                    letSwall.fire({
                        title: 'Oops !',
                        text: error
                    });
                }
            }
        });
    };
    console.log(data)
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
    const showBerkasModal = (index) => {
        const modal = makeModal(`berkas-modal-${index}`)
        modal.show();
    }
    const hideBerkasModal = (index) => {
        const modal = makeModal(`berkas-modal-${index}`)
        modal.hide();
    }
    const showUploadModal = (index) => {
        const modal = makeModal(`upload-modal-${index}`)
        modal.show();
    }
    const hideUploadModal = (index) => {
        const modal = makeModal(`upload-modal-${index}`)
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
                                        <button onClick={() => showBerkasModal(index)} className=" p-2 flex items-center bg-primary-500 hover:bg-primary-700 dark:hover:bg-blue-700 dark:bg-blue-500 text-white"><FaSearch /> &nbsp;Lihat Berkas</button>
                                        <button onClick={() => showUploadModal(index)} className=" p-2 flex items-center bg-primary-500 hover:bg-primary-700 dark:hover:bg-blue-700 dark:bg-blue-500 text-white"><FaUpload />&nbsp;Upload</button>
                                    </td>
                                    <td>
                                        <div id={`berkas-modal-${index}`} tabIndex="-1" aria-hidden="true" className="hidden overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 justify-center items-center w-full md:inset-0 h-[calc(100%-1rem)] max-h-full">
                                            <div className="relative p-4 w-full max-w-2xl max-h-full">
                                                <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
                                                    <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600">
                                                        <h3 className="text-2xl font-semibold text-gray-900 dark:text-white">
                                                            Lihat {d.nama_berkas}
                                                        </h3>
                                                        <button type="button" onClick={() => hideBerkasModal(index)} className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white">
                                                            <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                                                                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6" />
                                                            </svg>
                                                            <span className="sr-only">Close modal</span>
                                                        </button>
                                                    </div>
                                                    <div className="p-4 md:p-5 space-y-4">
                                                        {
                                                            (d.url_gambar === "") ? (<span className=" text-gray-800 dark:text-gray-300 text-lg"> Belum Upload File</span>)
                                                                :
                                                                (<img src={STORAGE + d.url_gambar} />)
                                                        }

                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div id={`upload-modal-${index}`} tabIndex="-1" aria-hidden="true" className="hidden overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 justify-center items-center w-full md:inset-0 h-[calc(100%-1rem)] max-h-full">
                                            <div className="relative p-4 w-full max-w-2xl max-h-full">
                                                <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
                                                    <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600">
                                                        <h3 className="text-2xl font-semibold text-gray-900 dark:text-white">
                                                            Upload {d.nama_berkas}
                                                        </h3>
                                                        <button type="button" onClick={() => hideUploadModal(index)} className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white">
                                                            <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                                                                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6" />
                                                            </svg>
                                                            <span className="sr-only">Close modal</span>
                                                        </button>
                                                    </div>
                                                    <div className="p-4 md:p-5 space-y-4">
                                                        <input onChange={(e) => setFile(e.target.files[0])} id={index} name={fileFields[index].name} accept="image/*" className="block w-full text-lg text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400" aria-describedby="file_input_help" type="file" />
                                                        <p className="mt-1 text-sm text-gray-500 dark:text-gray-300" id="file_input_help">SVG, PNG, JPG or GIF (MAX. 800x400px).</p>

                                                    </div>
                                                    <div className="flex items-center p-4 md:p-5 border-t border-gray-200 rounded-b dark:border-gray-600">
                                                        <button onClick={() => handleUpload(index)} type="button" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Upload</button>
                                                        <button onClick={hideUploadModal} type="button" className="ms-3 text-gray-500 bg-white hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-blue-300 rounded-lg border border-gray-200 text-sm font-medium px-5 py-2.5 hover:text-gray-900 focus:z-10 dark:bg-gray-700 dark:text-gray-300 dark:border-gray-500 dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-gray-600">Cancel</button>
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