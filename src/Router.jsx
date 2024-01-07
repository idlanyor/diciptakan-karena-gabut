import { Routes, Route } from 'react-router-dom';
import Registrasi from './Auth/Registrasi';
import Login from './Auth/Login';
import LoginPanel from './Auth/LoginPanel';
import DashboardPanel from './Dashboard/Panel/Parent';
import Depan from './Pages/Depan';
import NotFound from './Pages/NotFound';
import RegistrasiPanel from './Auth/RegistrasiPanel';
import Biodata from './Dashboard/Pendaftar/Biodata';
import DashboardPendaftar from './Dashboard/Pendaftar/Dashboard';
import AkunPendaftar from './Dashboard/Pendaftar/AkunPendaftar';
import InformasiUmumPendaftar from './Dashboard/Pendaftar/Dashboard/InformasiUmumPendaftar';
import FilePendaftar from './Dashboard/Pendaftar/FilePendaftar';
import ManajemenUser from './Dashboard/Panel/ManajemenUser';
import Overview from './Dashboard/Panel/Overview';
import Settings from './Dashboard/Panel/Settings';
import Overv from './Dashboard/Panel/Overv';
import Navbar from './Pages/Navbar';
import JadwalPendaftaran from './Pages/JadwalPendaftaran';
import Pengumuman from './Pages/Pengumuman';
import RincianBiaya from './Pages/RincianBiaya';
import PengumumanPendaftar from './Dashboard/Pendaftar/Pengumuman';
export default function Router() {
    return (<Routes>
      <Route path='*' Component={NotFound}/>
      <Route path='/' Component={Navbar}>
        <Route index Component={Depan}/>
        <Route path='jadwal-pendaftaran' Component={JadwalPendaftaran}/>
        <Route path='rincian-biaya' Component={RincianBiaya}/>
        <Route path='pengumuman' Component={Pengumuman}/>
        <Route path='registrasi' Component={Registrasi}/>
        <Route path='login' Component={Login}/>
        <Route path='panel' Component={LoginPanel}/>
        <Route path='panel/registrasi' Component={RegistrasiPanel}/>
      </Route>
      <Route path='panel' Component={DashboardPanel}>
        <Route path='user' Component={ManajemenUser}/>
        <Route path='dashboard' element={<Overview />}/>
        <Route path='pendaftaran' element={<Overv />}/>
        <Route path='posts' element={<Overview />}/>
        <Route path='settings' Component={Settings}/>
      </Route>
      <Route path='dashboard' element={<DashboardPendaftar />}>
        <Route index Component={InformasiUmumPendaftar}/>
        <Route path='biodata' Component={Biodata}/>
        <Route path='file-pendaftar' Component={FilePendaftar}/>
        <Route path='akun' Component={AkunPendaftar}/>
        <Route path='pengumuman' Component={PengumumanPendaftar}/>
        <Route path='cetak' Component={AkunPendaftar}/>
      </Route>
    </Routes>);
}
