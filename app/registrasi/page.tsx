'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'

export default function RegistrasiPage() {
  const router = useRouter()
  const [formData, setFormData] = useState({
    nama_lengkap: '',
    email: '',
    tgl_lahir: '',
    password: '',
    password_confirmation: '',
    gelombang: '1',
    jalur_pendaftaran: 'Reguler'
  })
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')

    if (formData.password !== formData.password_confirmation) {
      setError('Password tidak cocok')
      return
    }

    setLoading(true)

    try {
      const response = await fetch('/api/registrasi', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      })

      const data = await response.json()

      if (response.ok) {
        alert('Registrasi berhasil! Silakan login.')
        router.push('/login')
      } else {
        setError(data.message || 'Terjadi kesalahan saat registrasi')
      }
    } catch (error) {
      setError('Terjadi kesalahan saat registrasi')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900 py-12">
      <div className="max-w-md w-full space-y-8 p-8 bg-white dark:bg-gray-800 rounded-lg shadow">
        <div>
          <h2 className="text-center text-3xl font-extrabold text-gray-900 dark:text-white">
            Registrasi Pendaftar
          </h2>
        </div>
        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          {error && (
            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
              {error}
            </div>
          )}

          <div className="space-y-4">
            <div>
              <label htmlFor="nama_lengkap" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                Nama Lengkap
              </label>
              <input
                id="nama_lengkap"
                name="nama_lengkap"
                type="text"
                required
                className="mt-1 appearance-none relative block w-full px-3 py-2 border border-gray-300 dark:border-gray-600 placeholder-gray-500 text-gray-900 dark:text-white rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700"
                value={formData.nama_lengkap}
                onChange={(e) => setFormData({ ...formData, nama_lengkap: e.target.value })}
              />
            </div>

            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                Email
              </label>
              <input
                id="email"
                name="email"
                type="email"
                required
                className="mt-1 appearance-none relative block w-full px-3 py-2 border border-gray-300 dark:border-gray-600 placeholder-gray-500 text-gray-900 dark:text-white rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              />
            </div>

            <div>
              <label htmlFor="tgl_lahir" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                Tanggal Lahir
              </label>
              <input
                id="tgl_lahir"
                name="tgl_lahir"
                type="date"
                required
                className="mt-1 appearance-none relative block w-full px-3 py-2 border border-gray-300 dark:border-gray-600 placeholder-gray-500 text-gray-900 dark:text-white rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700"
                value={formData.tgl_lahir}
                onChange={(e) => setFormData({ ...formData, tgl_lahir: e.target.value })}
              />
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                Password
              </label>
              <input
                id="password"
                name="password"
                type="password"
                required
                className="mt-1 appearance-none relative block w-full px-3 py-2 border border-gray-300 dark:border-gray-600 placeholder-gray-500 text-gray-900 dark:text-white rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700"
                value={formData.password}
                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
              />
            </div>

            <div>
              <label htmlFor="password_confirmation" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                Konfirmasi Password
              </label>
              <input
                id="password_confirmation"
                name="password_confirmation"
                type="password"
                required
                className="mt-1 appearance-none relative block w-full px-3 py-2 border border-gray-300 dark:border-gray-600 placeholder-gray-500 text-gray-900 dark:text-white rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700"
                value={formData.password_confirmation}
                onChange={(e) => setFormData({ ...formData, password_confirmation: e.target.value })}
              />
            </div>
          </div>

          <div>
            <button
              type="submit"
              disabled={loading}
              className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50"
            >
              {loading ? 'Loading...' : 'Daftar'}
            </button>
          </div>

          <div className="text-center">
            <Link href="/login" className="text-blue-600 hover:text-blue-500">
              Sudah punya akun? Login di sini
            </Link>
          </div>

          <div className="text-center">
            <Link href="/" className="text-gray-600 hover:text-gray-500">
              Kembali ke Beranda
            </Link>
          </div>
        </form>
      </div>
    </div>
  )
}
