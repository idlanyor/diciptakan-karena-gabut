import { FaBullhorn } from "react-icons/fa";
import { FaGrip, FaNoteSticky, FaUpload} from "react-icons/fa6";
export const menuPendaftar = [
    {
        judul: 'Dashboard',
        link: '/dashboard',
        icon: FaGrip
    },
    {
        judul: 'Lengkapi Biodata',
        link: '/dashboard/biodata',
        icon: FaNoteSticky
    },
    {
        judul: 'Upload Berkas',
        link: '/dashboard/file-pendaftar',
        icon: FaUpload
    },
    {
        judul: 'Pengumuman',
        link: '/dashboard/pengumuman',
        icon: FaBullhorn
    }
]