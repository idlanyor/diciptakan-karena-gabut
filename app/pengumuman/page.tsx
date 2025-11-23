'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'

interface Post {
  id: number
  tgl: string
  judul: string
  isi: string
  lampiran: string
  user: {
    nama: string
    jabatan: string
  }
}

export default function PengumumanPage() {
  const [posts, setPosts] = useState<Post[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetch('/api/pengumuman')
      .then(res => res.json())
      .then(data => {
        setPosts(data.data || [])
        setLoading(false)
      })
      .catch(err => {
        console.error(err)
        setLoading(false)
      })
  }, [])

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <nav className="bg-white dark:bg-gray-800 shadow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center">
              <Link href="/" className="text-xl font-bold text-gray-900 dark:text-white">
                PPDB
              </Link>
            </div>
            <div className="flex items-center space-x-4">
              <Link href="/" className="text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white">
                Beranda
              </Link>
            </div>
          </div>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <div className="px-4 py-6 sm:px-0">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-8">
            Pengumuman
          </h1>

          {loading ? (
            <div className="text-center py-12">
              <p className="text-gray-600 dark:text-gray-400">Memuat pengumuman...</p>
            </div>
          ) : posts.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-gray-600 dark:text-gray-400">Belum ada pengumuman</p>
            </div>
          ) : (
            <div className="space-y-6">
              {posts.map(post => (
                <div key={post.id} className="bg-white dark:bg-gray-800 shadow rounded-lg p-6">
                  <div className="flex justify-between items-start mb-4">
                    <h2 className="text-2xl font-semibold text-gray-900 dark:text-white">
                      {post.judul}
                    </h2>
                    <span className="text-sm text-gray-500 dark:text-gray-400">
                      {new Date(post.tgl).toLocaleDateString('id-ID')}
                    </span>
                  </div>
                  <div className="prose dark:prose-invert max-w-none mb-4">
                    <p className="text-gray-700 dark:text-gray-300 whitespace-pre-wrap">
                      {post.isi}
                    </p>
                  </div>
                  <div className="flex justify-between items-center text-sm text-gray-600 dark:text-gray-400">
                    <span>Oleh: {post.user.nama} ({post.user.jabatan})</span>
                    {post.lampiran && (
                      <a
                        href={post.lampiran}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-600 hover:text-blue-500"
                      >
                        Lihat Lampiran
                      </a>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </main>
    </div>
  )
}
