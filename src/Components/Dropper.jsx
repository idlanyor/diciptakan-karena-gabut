// import { useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
function fileExtValidator(file) {
    console.log(file.type);
    if (file.type != 'image/jpeg' && file.type != 'image/png') {
        return {
            code: 'not-allowed',
            message: `Selain gambar tidak diizinkan`,
        };
    }
    return null;
}
const Uploader = () => {
    const { acceptedFiles, getRootProps, getInputProps, } = useDropzone({
        validator: fileExtValidator,
    });
    const acceptedFileItems = acceptedFiles.map((file) => (<div key={file.name}>
        {file.name} - {file.size} byte
    </div>));
    // const onDrop = useCallback((acceptedFiles) => {
    //     console.log(acceptedFiles);
    // }, []);
    return (<>
        <div className="flex items-center justify-center w-full">
            <div {...getRootProps({ className: 'dropzone' })} className="flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-bray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600">
                <div className="flex flex-col items-center justify-center pt-5 pb-6">
                    <svg className="w-8 h-8 mb-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 16">
                        <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2" />
                    </svg>
                    <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
                        {acceptedFileItems.length > 0 ? (acceptedFileItems) : (<>
                            <span className="font-semibold">
                                Click to upload or drag and drop
                            </span>
                        </>)}
                    </p>
                    <p className="text-xs text-gray-500 dark:text-gray-400">Ekstensi yang diizinkan : PNG, JPG atau JPEG ( MAX. 2MB )</p>
                </div>
                <input {...getInputProps()} />
            </div>
        </div>
    </>);
};
export default Uploader;
