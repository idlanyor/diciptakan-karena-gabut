import Link from 'next/link'

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-24">
      <div className="z-10 max-w-5xl w-full items-center justify-between font-mono text-sm">
        <h1 className="text-4xl font-bold mb-8 text-center">
          Sistem Penerimaan Peserta Didik Baru
        </h1>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12">
          <Link
            href="/jadwal-pendaftaran"
            className="p-6 border border-gray-300 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition"
          >
            <h2 className="text-2xl font-semibold mb-2">Jadwal Pendaftaran</h2>
            <p className="text-gray-600 dark:text-gray-400">
              Lihat jadwal pendaftaran yang tersedia
            </p>
          </Link>

          <Link
            href="/rincian-biaya"
            className="p-6 border border-gray-300 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition"
          >
            <h2 className="text-2xl font-semibold mb-2">Rincian Biaya</h2>
            <p className="text-gray-600 dark:text-gray-400">
              Informasi biaya pendaftaran
            </p>
          </Link>

          <Link
            href="/pengumuman"
            className="p-6 border border-gray-300 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition"
          >
            <h2 className="text-2xl font-semibold mb-2">Pengumuman</h2>
            <p className="text-gray-600 dark:text-gray-400">
              Pengumuman terbaru PPDB
            </p>
          </Link>
        </div>

        <div className="flex gap-4 mt-12 justify-center">
          <Link
            href="/registrasi"
            className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
          >
            Daftar Sebagai Pendaftar
          </Link>

          <Link
            href="/login"
            className="px-6 py-3 border border-blue-600 text-blue-600 rounded-lg hover:bg-blue-50 dark:hover:bg-gray-800 transition"
          >
            Login Pendaftar
          </Link>

          <Link
            href="/panel"
            className="px-6 py-3 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition"
          >
            Login Panel
          </Link>
        </div>
      </div>
    </main>
  )
}
