import { useState } from "react";
import JalurSettings from "./Settings/Jalur";
import GelombangSettings from "./Settings/Gelombang";
export default function Settings() {
    const [activeTab, setActiveTab] = useState('gelombangSettings');
    const changeTab = (tabId) => {
        setActiveTab(tabId);
    };
    return (<>
        <div className="bg-white dark:bg-gray-800 mb-0 border-b border-gray-200 dark:border-gray-700">
            <ul className="flex flex-wrap -mb-px text-sm font-medium text-center dark:text-white" id="default-tab" role="tablist">
                <li className="me-2" role="presentation">
                    <button className={`inline-block p-4 border-b-2 rounded-t-lg ${activeTab === 'gelombangSettings' ? 'border-blue-500' : ''}`} onClick={() => changeTab('gelombangSettings')} type="button" role="tab" aria-controls="gelombangSettings" aria-selected={activeTab === 'gelombangSettings'}>
                        Gelombang
                    </button>
                </li>
                <li className="me-2" role="presentation">
                    <button className={`inline-block p-4 border-b-2 rounded-t-lg hover:text-gray-600 hover:border-gray-300 dark:hover:text-gray-300 ${activeTab === 'jalurSettings' ? 'border-blue-500' : ''}`} onClick={() => changeTab('jalurSettings')} type="button" role="tab" aria-controls="jalurSettings" aria-selected={activeTab === 'jalurSettings'}>
                        Jalur Pendaftaran
                    </button>
                </li>
                <li className="me-2" role="presentation">
                    <button className={`inline-block p-4 border-b-2 rounded-t-lg hover:text-gray-600 hover:border-gray-300 dark:hover:text-gray-300 ${activeTab === 'jadwalSettings' ? 'border-blue-500' : ''}`} onClick={() => changeTab('jadwalSettings')} type="button" role="tab" aria-controls="jalurSettings" aria-selected={activeTab === 'jadwalSettings'}>
                        Jadwal Jalur Pendaftaran
                    </button>
                </li>
            </ul>
        </div>
        <div id="biodata">
            <div className={activeTab === 'gelombangSettings' ? '' : 'hidden'} id="gelombangSettings" role="tabpanel" aria-labelledby="gelombangSettings-tab">
                <GelombangSettings />
            </div>
            <div className={activeTab === 'jalurSettings' ? '' : 'hidden'} id="jalurSettings" role="tabpanel" aria-labelledby="jalurSettings-tab">
                <JalurSettings />
            </div>
            <div className={activeTab === 'jadwalSettings' ? '' : 'hidden'} id="jadwalSettings" role="tabpanel" aria-labelledby="jalurSettings-tab">
                <JalurSettings />
            </div>
        </div>
    </>);
}
