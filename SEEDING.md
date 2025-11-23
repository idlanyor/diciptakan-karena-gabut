# Database Seeding Guide

File ini berisi panduan untuk melakukan seeding database dengan data awal.

## Apa yang Di-seed?

Seeder akan mengisi database dengan data berikut:

### 1. **Data Kategori**
- ✅ **Pekerjaan Ayah** (10 items): Tidak Bekerja, PNS, TNI/Polri, Karyawan Swasta, dll
- ✅ **Pekerjaan Ibu** (10 items): Tidak Bekerja/IRT, PNS, TNI/Polri, Karyawan Swasta, dll
- ✅ **Penghasilan** (7 items): Tidak Berpenghasilan, < Rp 1.000.000, dll
- ✅ **Pendidikan Terakhir** (10 items): Tidak Sekolah, SD, SMP, SMA, D1-D4/S1, S2, S3
- ✅ **Agama** (6 items): Islam, Kristen, Katolik, Hindu, Buddha, Konghucu

### 2. **Data Master**
- ✅ **Tahun Akademik**: 2024/2025 (Aktif)
- ✅ **Jalur Pendaftaran**: Reguler, Prestasi, Afirmasi
- ✅ **Gelombang Pendaftaran**: Gelombang 1 (1 Jan - 31 Mar 2024)
- ✅ **Tahapan Proses**: Pendaftaran, Verifikasi Berkas, Tes Seleksi, Pengumuman, Daftar Ulang

### 3. **Sample Users**
- ✅ **Admin User**
  - Username: `admin`
  - Password: `admin123`
  - Role: admin

- ✅ **Student User** (untuk testing)
  - Email: `student@example.com`
  - Password: `student123`

### 4. **Sample Content**
- ✅ **Post/Pengumuman**: Pembukaan Pendaftaran PPDB 2024/2025

## Cara Menjalankan Seeder

### 1. Pastikan Database Sudah Dibuat
```bash
mysql -u root -p -e "CREATE DATABASE ppdb_db"
```

### 2. Push Schema ke Database
```bash
npm run db:push
# atau
npx prisma db push
```

### 3. Jalankan Seeder
```bash
npm run db:seed
# atau
npx prisma db seed
```

### Output yang Diharapkan
```
🌱 Starting database seeding...
📝 Seeding Pekerjaan Ayah...
✅ Created 10 Pekerjaan Ayah
📝 Seeding Pekerjaan Ibu...
✅ Created 10 Pekerjaan Ibu
📝 Seeding Penghasilan...
✅ Created 7 Penghasilan
...
✨ Database seeding completed successfully!

📌 Default Accounts:
   Admin:
   - Username: admin
   - Password: admin123

   Student:
   - Email: student@example.com
   - Password: student123
```

## Reset & Re-seed Database

Jika ingin reset database dan seed ulang:

```bash
# Reset database (WARNING: Akan menghapus semua data)
npx prisma migrate reset

# Atau manual:
npx prisma db push --force-reset
npm run db:seed
```

## Melihat Data di Prisma Studio

Setelah seeding, Anda bisa melihat data dengan Prisma Studio:

```bash
npm run db:studio
# atau
npx prisma studio
```

Prisma Studio akan terbuka di browser di `http://localhost:5555`

## Troubleshooting

### Error: "Environment variable not found: DATABASE_URL"
Pastikan file `.env` sudah ada dan berisi DATABASE_URL yang valid:
```env
DATABASE_URL="mysql://user:password@localhost:3306/ppdb_db"
```

### Error: "Table does not exist"
Jalankan `npx prisma db push` terlebih dahulu untuk membuat tabel di database.

### Error: "Unique constraint failed"
Seeder menggunakan `upsert` dan `skipDuplicates`, jadi harusnya tidak ada error unique constraint. Jika tetap terjadi, hapus data yang conflict atau reset database.

## Custom Seeding

Jika ingin menambahkan data custom, edit file `prisma/seed.ts`:

```typescript
// Tambahkan setelah seeder yang sudah ada
const customData = await prisma.yourModel.create({
  data: {
    // your data here
  }
})
```

Lalu jalankan ulang seeder:
```bash
npm run db:seed
```

## Login ke Aplikasi

Setelah seeding, Anda bisa login menggunakan akun yang sudah di-seed:

### Panel Admin
1. Buka `http://localhost:3000/panel`
2. Username: `admin`
3. Password: `admin123`

### Pendaftar
1. Buka `http://localhost:3000/login`
2. Email: `student@example.com`
3. Password: `student123`

---

**Note**: Password default sebaiknya diganti setelah login pertama kali untuk keamanan.
