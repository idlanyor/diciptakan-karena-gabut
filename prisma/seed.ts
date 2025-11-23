import { PrismaClient } from '@prisma/client'
import bcrypt from 'bcryptjs'

const prisma = new PrismaClient()

async function main() {
  console.log('🌱 Starting database seeding...')

  // Seed Category: Pekerjaan Ayah
  console.log('📝 Seeding Pekerjaan Ayah...')
  const pekerjaanAyah = await prisma.catPekerjaanAyah.createMany({
    data: [
      { nama: 'Tidak Bekerja' },
      { nama: 'PNS' },
      { nama: 'TNI/Polri' },
      { nama: 'Karyawan Swasta' },
      { nama: 'Wiraswasta' },
      { nama: 'Petani' },
      { nama: 'Pedagang' },
      { nama: 'Buruh' },
      { nama: 'Pensiunan' },
      { nama: 'Lainnya' },
    ],
    skipDuplicates: true,
  })
  console.log(`✅ Created ${pekerjaanAyah.count} Pekerjaan Ayah`)

  // Seed Category: Pekerjaan Ibu
  console.log('📝 Seeding Pekerjaan Ibu...')
  const pekerjaanIbu = await prisma.catPekerjaanIbu.createMany({
    data: [
      { nama: 'Tidak Bekerja/IRT' },
      { nama: 'PNS' },
      { nama: 'TNI/Polri' },
      { nama: 'Karyawan Swasta' },
      { nama: 'Wiraswasta' },
      { nama: 'Petani' },
      { nama: 'Pedagang' },
      { nama: 'Buruh' },
      { nama: 'Pensiunan' },
      { nama: 'Lainnya' },
    ],
    skipDuplicates: true,
  })
  console.log(`✅ Created ${pekerjaanIbu.count} Pekerjaan Ibu`)

  // Seed Category: Penghasilan
  console.log('📝 Seeding Penghasilan...')
  const penghasilan = await prisma.catPenghasilan.createMany({
    data: [
      { nama: 'Tidak Berpenghasilan' },
      { nama: '< Rp 1.000.000' },
      { nama: 'Rp 1.000.000 - Rp 2.000.000' },
      { nama: 'Rp 2.000.000 - Rp 3.000.000' },
      { nama: 'Rp 3.000.000 - Rp 5.000.000' },
      { nama: 'Rp 5.000.000 - Rp 10.000.000' },
      { nama: '> Rp 10.000.000' },
    ],
    skipDuplicates: true,
  })
  console.log(`✅ Created ${penghasilan.count} Penghasilan`)

  // Seed Category: Pendidikan Terakhir
  console.log('📝 Seeding Pendidikan Terakhir...')
  const pendidikan = await prisma.catPendTerakhir.createMany({
    data: [
      { nama: 'Tidak Sekolah' },
      { nama: 'SD/Sederajat' },
      { nama: 'SMP/Sederajat' },
      { nama: 'SMA/Sederajat' },
      { nama: 'D1' },
      { nama: 'D2' },
      { nama: 'D3' },
      { nama: 'D4/S1' },
      { nama: 'S2' },
      { nama: 'S3' },
    ],
    skipDuplicates: true,
  })
  console.log(`✅ Created ${pendidikan.count} Pendidikan Terakhir`)

  // Seed Category: Agama
  console.log('📝 Seeding Agama...')
  const agama = await prisma.catAgama.createMany({
    data: [
      { nama: 'Islam' },
      { nama: 'Kristen Protestan' },
      { nama: 'Kristen Katolik' },
      { nama: 'Hindu' },
      { nama: 'Buddha' },
      { nama: 'Konghucu' },
    ],
    skipDuplicates: true,
  })
  console.log(`✅ Created ${agama.count} Agama`)

  // Seed Tahun Akademik
  console.log('📝 Seeding Tahun Akademik...')
  const tahunAkademik = await prisma.tahunAkademik.upsert({
    where: { id: 1 },
    update: {},
    create: {
      tahun: '2024/2025',
      isAktif: 1,
    },
  })
  console.log(`✅ Created/Updated Tahun Akademik: ${tahunAkademik.tahun}`)

  // Seed Jalur Pendaftaran
  console.log('📝 Seeding Jalur Pendaftaran...')
  const jalurPendaftaran = await prisma.jalurPendaftaran.createMany({
    data: [
      { namaJalur: 'Reguler', kuota: '100' },
      { namaJalur: 'Prestasi', kuota: '50' },
      { namaJalur: 'Afirmasi', kuota: '30' },
    ],
    skipDuplicates: true,
  })
  console.log(`✅ Created ${jalurPendaftaran.count} Jalur Pendaftaran`)

  // Seed Gelombang Pendaftaran
  console.log('📝 Seeding Gelombang Pendaftaran...')
  const gelombang = await prisma.gelombangPendaftaran.upsert({
    where: { id: 1 },
    update: {},
    create: {
      gelombangKe: '1',
      isAktif: 1,
      tahunPelajaran: '2024/2025',
      periodeMulai: '2024-01-01',
      periodeAkhir: '2024-03-31',
    },
  })
  console.log(`✅ Created/Updated Gelombang Pendaftaran: Gelombang ${gelombang.gelombangKe}`)

  // Seed Tahapan Proses
  console.log('📝 Seeding Tahapan Proses...')
  const tahapanProses = await prisma.tahapanProses.createMany({
    data: [
      { proses: 'Pendaftaran' },
      { proses: 'Verifikasi Berkas' },
      { proses: 'Tes Seleksi' },
      { proses: 'Pengumuman' },
      { proses: 'Daftar Ulang' },
    ],
    skipDuplicates: true,
  })
  console.log(`✅ Created ${tahapanProses.count} Tahapan Proses`)

  // Seed Admin User
  console.log('📝 Seeding Admin User...')
  const hashedPassword = await bcrypt.hash('admin123', 10)
  const adminUser = await prisma.user.upsert({
    where: { username: 'admin' },
    update: {},
    create: {
      nama: 'Administrator',
      username: 'admin',
      jabatan: 'Administrator',
      role: 'admin',
      password: hashedPassword,
      fotoProfil: null,
    },
  })
  console.log(`✅ Created/Updated Admin User: ${adminUser.username}`)

  // Seed Sample Post (Pengumuman)
  console.log('📝 Seeding Sample Post...')
  const samplePost = await prisma.post.upsert({
    where: { id: 1 },
    update: {},
    create: {
      tgl: new Date('2024-01-01'),
      judul: 'Pembukaan Pendaftaran PPDB 2024/2025',
      isi: `Dengan hormat,

Kami informasikan bahwa Penerimaan Peserta Didik Baru (PPDB) tahun pelajaran 2024/2025 telah dibuka.

Periode pendaftaran:
- Gelombang 1: 1 Januari - 31 Maret 2024

Jalur pendaftaran yang tersedia:
1. Jalur Reguler
2. Jalur Prestasi
3. Jalur Afirmasi

Untuk informasi lebih lanjut, silakan hubungi panitia PPDB.

Terima kasih.`,
      lampiran: '',
      author: adminUser.id,
    },
  })
  console.log(`✅ Created/Updated Sample Post: ${samplePost.judul}`)

  // Seed Sample Student User (for testing)
  console.log('📝 Seeding Sample Student User...')
  const studentPassword = await bcrypt.hash('student123', 10)
  const sampleStudent = await prisma.studentUser.upsert({
    where: { email: 'student@example.com' },
    update: {},
    create: {
      namaLengkap: 'Siswa Contoh',
      email: 'student@example.com',
      tglLahir: '2010-01-01',
      password: studentPassword,
      status: 0,
      tglDaftar: new Date(),
      gelombang: '1',
      jalurPendaftaran: 'Reguler',
    },
  })
  console.log(`✅ Created/Updated Sample Student: ${sampleStudent.email}`)

  console.log('✨ Database seeding completed successfully!')
  console.log('')
  console.log('📌 Default Accounts:')
  console.log('   Admin:')
  console.log('   - Username: admin')
  console.log('   - Password: admin123')
  console.log('')
  console.log('   Student:')
  console.log('   - Email: student@example.com')
  console.log('   - Password: student123')
}

main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error('❌ Error during seeding:', e)
    await prisma.$disconnect()
    process.exit(1)
  })
