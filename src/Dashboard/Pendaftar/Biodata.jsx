import { useState } from "react";
import BiodataUmum from "./Biodata/BiodataUmum";
import BiodataLain from "./Biodata/BiodataLain";
export default function Biodata() {
    const [activeTab, setActiveTab] = useState('biodataUmum');
    // const changeTab = (tabId) => {
    //     setActiveTab(tabId);
    // };
    return (<>
            {/* <div className="mb-4 border-b border-gray-200 dark:border-gray-700">
                <ul className="flex flex-wrap -mb-px text-sm font-medium text-center dark:text-white" id="default-tab" role="tablist">
                    <li className="me-2" role="presentation">
                        <button className={`inline-block p-4 border-b-2 rounded-t-lg ${activeTab === 'biodataUmum' ? 'border-blue-500' : ''}`} onClick={() => changeTab('biodataUmum')} type="button" role="tab" aria-controls="biodataUmum" aria-selected={activeTab === 'biodataUmum'}>
                            Biodata Umum
                        </button>
                    </li>
                    <li className="me-2" role="presentation">
                        <button className={`inline-block p-4 border-b-2 rounded-t-lg hover:text-gray-600 hover:border-gray-300 dark:hover:text-gray-300 ${activeTab === 'biodataLain' ? 'border-blue-500' : ''}`} onClick={() => changeTab('biodataLain')} type="button" role="tab" aria-controls="biodataLain" aria-selected={activeTab === 'biodataLain'}>
                            Biodata Lain
                        </button>
                    </li>
                </ul>
            </div> */}
            <div id="biodata">
                <div className={activeTab === 'biodataUmum' ? '' : 'hidden'} id="biodataUmum" role="tabpanel" aria-labelledby="biodataUmum-tab">
                    <BiodataUmum />
                </div>
                <div className={activeTab === 'biodataLain' ? '' : 'hidden'} id="biodataLain" role="tabpanel" aria-labelledby="biodataLain-tab">
                    <BiodataLain />
                </div>
            </div>
        </>);
}
