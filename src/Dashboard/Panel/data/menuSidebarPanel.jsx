import { FaCogs, FaUsers } from "react-icons/fa";
import { FaGrip, FaUsersBetweenLines } from "react-icons/fa6";
export const MenuSidebarPanel = [
    {
        judul: 'Dashboard',
        link: '/panel/dashboard',
        icon: FaGrip
    },
    {
        judul: 'Manajemen Pengguna',
        link: '/panel/user',
        icon: FaUsers
    },
    {
        judul: 'Kelola Pendaftaran',
        link: '/panel/pendaftaran',
        icon: FaUsersBetweenLines
    },
    {
        judul: 'Pengaturan',
        link: '/panel/settings',
        icon: FaCogs
    },
]