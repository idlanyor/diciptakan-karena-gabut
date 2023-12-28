import { Link } from 'react-router-dom';
import { MenuDashboard } from './data/menuDashboard';

export const Overview = () => {
    return (
        <section className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4'>
            {MenuDashboard.map((d, index) => (
                <Link key={index} to={d.link} className="relative mt-5">
                    <div className="flex flex-col items-center bg-white border border-gray-200 shadow hover:bg-gray-100 dark:border-gray-700 dark:bg-gray-700 dark:hover:bg-gray-700 relative z-10">
                        <div className="p-4 leading-normal text-center">
                            <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
                                {d.data}
                            </p>
                        </div>
                    </div>
                    <h5 className="absolute -top-5 left-3 right-3 p-2 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-gray-900 dark:text-white z-20">
                        {d.title}
                    </h5>
                </Link>
            ))}
        </section>
    );
};

export default Overview;
