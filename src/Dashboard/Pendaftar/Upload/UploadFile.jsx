/* eslint-disable no-unused-vars */
import axios from "axios";
import { getTokenPendaftar } from "../../../Components/Reusable";
import ENDPOINT_PPDB from "../../../constants";
import { useState } from "react";
import letSwall from "../../../Components/Sweetalert";
import { useNavigate } from "react-router-dom";
/* eslint-disable react/prop-types */
const FileUploadField = ({ label, id, setter, state }) => {
    const handleFileChange = (e) => {
        const file = e.target.files[0];
        setter(prevFiles => [...prevFiles, file]);
    };

    return (
        <form>
            <label className="block ml-2 mb-2 text-lg mt-5 font-bold text-gray-900 dark:text-white">{label}</label>
            <input
                onChange={handleFileChange}
                className="block rounded-lg w-full text-lg text-gray-900 border border-gray-300 cursor-pointer bg-gray-50 dark:text-white focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400"
                id={id}
                type="file"
                accept="image/*"
            />
            <p className="mt-1 text-sm text-gray-500 dark:text-gray-300" id={`${id}_help`}>
                File Gambar (Maksimal 2Mb). Pastikan gambar jelas dan mudah terbaca.
            </p>
        </form>
    );

};


const UploadFilePendaftar = () => {
    const navigasi = useNavigate()
    const [kkFile, setKkFile] = useState([]);
    const [ijazahFile, setIjazahFile] = useState([]);
    const [sklFile, setSklFile] = useState([]);
    const [pasfotoFile, setPasfotoFile] = useState([]);

    const fileFields = [
        { label: 'Kartu Keluarga', id: 'kk', setter: setKkFile, state: kkFile },
        { label: 'Ijazah', id: 'ijazah', setter: setIjazahFile, state: ijazahFile },
        { label: 'Surat Keterangan Lulus', id: 'skl', setter: setSklFile, state: sklFile },
        { label: 'Pasfoto Rasio 4x6', id: 'pasfoto', setter: setPasfotoFile, state: pasfotoFile },
    ];

    const handleSubmitAllFiles = (e) => {
        e.preventDefault();
        letSwall.fire({
            title: 'Konfirmasi Upload',
            text: "Apakah anda yakin untuk mengupload File ?",
            icon: 'question',
            confirmButtonText: 'Yakin',
            showCancelButton: true,
            cancelButtonText: 'Belum'
        }).then(async (res) => {
            if (res.isConfirmed) {
                try {
                    const formData = new FormData();
                    fileFields.forEach(({ id, state }) => {
                        state.forEach(file => {
                            formData.append(id, file);
                        });
                    });

                    const response = await axios.post(ENDPOINT_PPDB + 'file-pendaftar', formData, {
                        headers: {
                            'Content-Type': 'multipart/form-data',
                            Authorization: `Bearer ${getTokenPendaftar()}`,
                        },
                    });

                    console.log('File upload response:', response.data);
                    letSwall.fire({
                        title: 'Sukses',
                        text: 'File berhasil diupload',
                        icon: 'success'
                    })
                    navigasi('/dashboard')
                    // Handle success response here
                } catch (error) {
                    console.log('Error uploading files:', error);
                    letSwall.fire({
                        title: 'Oops !',
                        text: error.response?.data.error
                    })
                    console.log(error.response?.data)
                }
            }
        })


    };

    return (
        <div className="block p-6 bg-white border border-gray-200 shadow dark:bg-gray-800 dark:border-gray-700">
            <h5 className="mb-2 p-2 text-2xl font-bold border-b tracking-tight text-gray-900 dark:text-white">
                Upload Berkas Pendaftaran
            </h5>

            {fileFields.map((field, index) => (
                <FileUploadField key={index} label={field.label} id={field.id} setter={field.setter} state={field.state} />
            ))}

            <button type="submit" className="p-2 mt-5 text-white bg-primary-500 dark:bg-blue-500" onClick={handleSubmitAllFiles}>Upload</button>
        </div>
    );
};

export default UploadFilePendaftar;
