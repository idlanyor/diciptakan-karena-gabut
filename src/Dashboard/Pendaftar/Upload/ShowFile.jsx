// import { useState } from "react";

// import { FaSearch } from "react-icons/fa";\
function ShowFilePendaftar() {
    // const [data,setData] = useState()
    return (
        <div className="block p-6 bg-white border border-gray-200 shadow dark:bg-gray-800 dark:border-gray-700">
            <h5 className="mb-2 p-2 text-2xl font-bold border-b tracking-tight text-gray-900 dark:text-white">
                Lihat Berkas Pendaftaran
            </h5>
            <div className="mt-5 flex justify-center items-center lg:grid lg:grid-cols-3 gap-4">

                <a href="#" className="flex flex-col items-center bg-white border border-gray-200 rounded-lg shadow md:flex-row md:max-w-xl hover:bg-gray-100 dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-700">
                    <img className="object-cover w-full rounded-t-lg md:h-auto md:w-32 md:rounded-none md:rounded-s-lg" src="https://lh3.googleusercontent.com/v8KQRGdGEcvkOvBGMCcTQP4PUImspmfvX6z9k2Aft_WjAhYGYU8wDbFyIbyGoGvzhtGNvdruzL-xTqligg=w544-h544-l90-rj" alt="" />
                    <div className="flex flex-col justify-between p-4 leading-normal">
                        <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">Kartu Keluarga</h5>
                    </div>
                </a>

            </div>
        </div>


    );
}

export default ShowFilePendaftar;