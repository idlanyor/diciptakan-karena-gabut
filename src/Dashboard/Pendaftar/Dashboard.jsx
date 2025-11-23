import Background from '../../assets/bg.svg'
import { useEffect, useState } from "react";
import axios from "axios";
import SidebarPendaftar from "./Sidebar";
import NavbarPendaftar from "./Navbar";
import letSwall from "../../Components/Sweetalert";
import { Outlet, useNavigate } from "react-router-dom";
import ENDPOINT_PPDB from "../../constants";
import { useSwipeable } from "react-swipeable";
import { delTokenPendaftar, getTokenPendaftar } from "../../Components/Reusable";
import { menuPendaftar } from './data/menuPendaftar';
export default function DashboardPendaftar() {
    const token = getTokenPendaftar()
    const navigasi = useNavigate();
    useEffect(() => {
        const ping = () => {
            axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
            axios.get(ENDPOINT_PPDB + 'ping')
                .then((res) => {
                    if (!res.data.logged_in) {
                        console.log(res.data.message)
                        letSwall.fire({
                            title: 'Ups..',
                            text: res.data.message,
                            timer: 1500,
                            timerProgressBar: true
                        }).then(() => {
                            delTokenPendaftar();
                            navigasi('/login')
                        })
                        // navigasi('/panel')
                    } else {
                        if (res.data.tipe === 'panel') {
                            console.log(res.data.user)
                        } else if (res.data.tipe === 'pendaftar') {
                            console.log('panel only')
                        }
                    }
                })
                .catch(e => console.log(e));
        }
        ping();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [token]);
    // logout handler
    const logoutHandler = (e) => {
        e.preventDefault();
        letSwall.fire({
            title: "Log out",
            text: "Apakah anda yakin untuk keluar?",
            icon: "warning",
            customClass: {
                container: 'bg-gray-50 dark:bg-gray-900',
                popup: 'bg-gray-50 dark:bg-gray-900 dark:text-white',
            },
            showCancelButton: true,
            confirmButtonColor: "#8b00d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Ya",
            cancelButtonText: "Tidak",
        })
            .then(async (res) => {
                if (res.isConfirmed) {
                    await axios.post(ENDPOINT_PPDB + "logout");
                    letSwall.fire({
                        title: "Log Out Berhasil!",
                        icon: "success",
                        timer: 1000,
                        timerProgressBar: true,
                    });
                    delTokenPendaftar();
                    navigasi('/login')
                }
            });
    };
    // drawer sidebar
    const [isDrawerOpen, setDrawerOpen] = useState(false);
    const handleToggleDrawer = () => {
        setDrawerOpen(!isDrawerOpen);
    };
    const handleSwipe = useSwipeable({
        onSwiping: (eventData) => {
            if (eventData.dir === 'Left') {
                setDrawerOpen(false)
            }
        }
    })
    const handleTouch = useSwipeable({
        onTouchStartOrOnMouseDown: () => {
            setDrawerOpen(false)
        }
    })
    return (<div className='relative min-h-screen'>
        {/* Background Pattern */}
        <div className="fixed inset-0 bg-gradient-to-br from-gray-50 via-purple-50/30 to-blue-50/30 dark:from-gray-900 dark:via-purple-900/10 dark:to-blue-900/10">
            <div className="absolute inset-0 bg-grid-pattern opacity-5 dark:opacity-10"></div>
        </div>

        <NavbarPendaftar toggleDrawer={handleToggleDrawer} menu={menuPendaftar} />
        <SidebarPendaftar menu={menuPendaftar} isDrawerOpen={isDrawerOpen} handleSwipe={handleSwipe} logoutHandler={logoutHandler} />
        <div {...handleSwipe} {...handleTouch} className="antialiased max-h-full relative z-0">
            <main className="px-4 md:ml-64 pt-20 pb-5">
                <Outlet />
            </main>
        </div>
    </div>);
}
