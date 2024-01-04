import { useEffect, useState } from "react";
import axios from "axios";
import letSwall from "../../Components/Sweetalert";
import { Outlet, useNavigate } from "react-router-dom";
import ENDPOINT_PPDB from "../../constants";
import NavbarPanel from "./Navbar";
import SidebarPanel from "./Sidebar";
import { delTokenPanel, getTokenPanel } from "../../Components/Reusable";
import { useSwipeable } from 'react-swipeable';
export default function DashboardPanel() {
    const token = getTokenPanel()
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
                            delTokenPanel()
                            navigasi('/panel')
                        })
                        // navigasi('/panel')
                    } else {
                        console.log('Login Success')
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
                console.log(res)
                if (res.isConfirmed) {
                    axios.defaults.headers.common['Authorization'] = `Bearer ${token}`
                    await axios.post(ENDPOINT_PPDB + "logout").then(
                        () => {
                            letSwall.fire({
                                title: "Log Out Berhasil!",
                                icon: "success",
                                timer: 1000,
                                timerProgressBar: true,
                            });
                            delTokenPanel();
                            navigasi('/panel')
                        }
                    ).catch((e) => console.log(e))

                }
            });
    };
    // drawer sidebar
    const [isDrawerOpen, setDrawerOpen] = useState(false);
    const handleToggleDrawer = () => {
        setDrawerOpen(!isDrawerOpen);
    };
    const handleSwipe = useSwipeable({
        onSwipedLeft: (eventData) => {
            if (eventData.dir === 'Left') {
                setDrawerOpen(false)
            }
        }
    })
    return (<>
        <NavbarPanel toggleDrawer={handleToggleDrawer} />
        <SidebarPanel isDrawerOpen={isDrawerOpen} handleSwipe={handleSwipe} logoutHandler={logoutHandler} />
        <div className="antialiased max-h-full">
            <main className="p-4 md:ml-64 pt-20 ">
                <Outlet />
            </main>
        </div>
    </>);
}
