/* eslint-disable no-unused-vars */
import axios from "axios";
import { getTokenPendaftar } from "../../Components/Reusable";
import ENDPOINT_PPDB from "../../constants";
import { useState } from "react";

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
                className="block w-full text-lg text-gray-900 border border-gray-300 cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400"
                id={id}
                type="file"
                accept="image/*"
            />
            <p className="mt-1 text-sm text-gray-500 dark:text-gray-300" id={`${id}_help`}>
                SVG, PNG, JPG, or GIF (Maximum 2Mb). Make sure the photo is clear.
            </p>
        </form>
    );

};


const UploadFilePendaftar = () => {
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

    const handleSubmitAllFiles = async (e) => {
        e.preventDefault();

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
                    // Add any other headers if required, like authorization headers
                },
            });

            console.log('File upload response:', response.data);
            // Handle success response here
        } catch (error) {
            console.log('Error uploading files:', error);
            console.log(error.response?.data)
        }
    };

    return (
        <div className="block p-6 bg-white border border-gray-200 shadow dark:bg-gray-800 dark:border-gray-700">
            <h5 className="mb-2 p-2 text-2xl font-bold border-b tracking-tight text-gray-900 dark:text-white">
                Upload Berkas Pendaftaran
            </h5>

            {fileFields.map((field, index) => (
                <FileUploadField key={index} label={field.label} id={field.id} setter={field.setter} state={field.state} />
            ))}

            <button type="submit" onClick={handleSubmitAllFiles}>Upload</button>
        </div>
    );
};

export default UploadFilePendaftar;
