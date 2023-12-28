import NotFoundSVG from '../assets/notfound.svg'
import { Link } from "react-router-dom";
export default function NotFound() {
    return (<section className="bg-purple-300 dark:bg-gray-900 h-screen flex items-center">
            <div className="py-8 px-4 mx-auto max-w-screen-xl lg:py-16 lg:px-6">
                <div className="mx-auto max-w-screen-sm flex flex-col items-center">
                    <img src={NotFoundSVG} alt="NotFound" className='w-1/2'/>
                    <p className="mt-5 mb-4 text-3xl tracking-tight font-bold text-gray-900 md:text-4xl dark:text-white">Ada yang hilang.</p>
                    <p className="mb-4 text-lg text-center text-gray-500 dark:text-gray-400">Maaf, kami tidak dapat menemukan halaman itu. Anda akan menemukan banyak hal untuk dijelajahi di halaman utama. </p>
                    <Link to="/" className="inline-flex text-white bg-purple-600 hover:bg-purple-800 focus:ring-4 focus:outline-none focus:ring-purple-300 font-medium  text-sm px-5 py-2.5 text-center dark:focus:ring-purple-900 my-4">Kembali ke Beranda</Link>
                </div>
            </div>
        </section>);
}
