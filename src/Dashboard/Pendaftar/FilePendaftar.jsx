import { useState } from "react";
import UploadFilePendaftar from "./Upload/UploadFile";
import ShowFilePendaftar from "./Upload/ShowFile";
export default function FilePendaftar() {
    const [activeTab, setActiveTab] = useState('uploadFile');
    const changeTab = (tabId) => {
        setActiveTab(tabId);
    };
    return (<>
        <div className="mb-4 border-b border-gray-200 dark:border-gray-700">
            <ul className="flex flex-wrap -mb-px text-sm font-medium text-center dark:text-white" id="default-tab" role="tablist">
                <li className="me-2" role="presentation">
                    <button className={`inline-block p-4 border-b-2 rounded-t-lg ${activeTab === 'uploadFile' ? 'border-blue-500' : ''}`} onClick={() => changeTab('uploadFile')} type="button" role="tab" aria-controls="uploadFile" aria-selected={activeTab === 'uploadFile'}>
                        Upload File
                    </button>
                </li>
                <li className="me-2" role="presentation">
                    <button className={`inline-block p-4 border-b-2 rounded-t-lg hover:text-gray-600 hover:border-gray-300 dark:hover:text-gray-300 ${activeTab === 'showFile' ? 'border-blue-500' : ''}`} onClick={() => changeTab('showFile')} type="button" role="tab" aria-controls="showFile" aria-selected={activeTab === 'showFile'}>
                        Lihat File
                    </button>
                </li>
            </ul>
        </div>
        <div id="biodata">
            <div className={activeTab === 'uploadFile' ? '' : 'hidden'} id="uploadFile" role="tabpanel" aria-labelledby="uploadFile-tab">
                <UploadFilePendaftar />
            </div>
            <div className={activeTab === 'showFile' ? '' : 'hidden'} id="showFile" role="tabpanel" aria-labelledby="showFile-tab">
                <ShowFilePendaftar />
            </div>
        </div>
    </>);
}
