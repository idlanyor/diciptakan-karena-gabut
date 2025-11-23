# PPDB - Sistem Penerimaan Peserta Didik Baru

Sistem Penerimaan Peserta Didik Baru menggunakan Next.js 14 dan MySQL.

## Tech Stack

- **Framework**: Next.js 14 (App Router)
- **Database**: MySQL
- **ORM**: Prisma
- **Authentication**: NextAuth.js
- **Styling**: Tailwind CSS
- **UI Components**: Flowbite React

## Prerequisites

- Node.js 18+
- MySQL 8.0+
- npm atau yarn

## Installation

1. Clone repository
```bash
git clone <repository-url>
cd diciptakan-karena-gabut
```

2. Install dependencies
```bash
npm install
```

3. Setup environment variables
```bash
cp .env.example .env
```

Edit `.env` dan sesuaikan dengan konfigurasi database Anda:
```env
DATABASE_URL="mysql://user:password@localhost:3306/ppdb_db"
NEXTAUTH_URL="http://localhost:3000"
NEXTAUTH_SECRET="your-secret-key-here"
```

4. Setup database
```bash
# Create database
mysql -u root -p -e "CREATE DATABASE ppdb_db"

# Run migrations
npx prisma db push

# (Optional) Seed database
npx prisma db seed
```

5. Generate Prisma Client
```bash
npx prisma generate
```

6. Run development server
```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) dengan browser Anda.

## Database Schema

Database schema didefinisikan di `prisma/schema.prisma` berdasarkan struktur dari Laravel backend asli.

### Main Tables:
- `users` - Admin/Staff panel
- `pd_users` (StudentUser) - Pendaftar/siswa
- `pd_biodata_umum` - Biodata umum siswa
- `pd_biodata_lain` - Biodata tambahan siswa
- `file_pendaftar` - File upload siswa
- `gelombang_pendaftaran` - Gelombang pendaftaran
- `jalur_pendaftaran` - Jalur pendaftaran
- `posts` - Pengumuman
- Category tables (cat_*)

## API Endpoints

### Public Endpoints
- `GET /api/pengumuman` - Get all posts
- `POST /api/registrasi` - Register new student

### Panel Endpoints (Admin)
- `POST /api/panel/registrasi` - Register new admin/staff

### Protected Endpoints (Pendaftar)
- `GET /api/biodata-umum` - Get student biodata
- `POST /api/biodata-umum` - Create student biodata
- `PATCH /api/biodata-umum` - Update student biodata

## Authentication

Aplikasi ini menggunakan NextAuth.js dengan dua provider:
1. **Pendaftar** - Login menggunakan email
2. **Panel** - Login menggunakan username

## Project Structure

```
├── app/                    # Next.js App Router
│   ├── api/               # API routes
│   ├── dashboard/         # Dashboard pendaftar
│   ├── panel/             # Panel admin
│   ├── login/             # Login page
│   ├── registrasi/        # Registration page
│   └── layout.tsx         # Root layout
├── components/            # React components
├── lib/                   # Utility libraries
│   ├── prisma.ts         # Prisma client
│   └── auth.ts           # NextAuth configuration
├── prisma/               # Prisma schema
│   └── schema.prisma     # Database schema
└── public/               # Static files
```

## Migration dari Laravel

Project ini di-migrate dari Laravel backend. Referensi: https://github.com/idlanyor/backend-2

### Perubahan Major:
- Laravel → Next.js 14 (App Router)
- Eloquent ORM → Prisma
- Laravel Auth → NextAuth.js
- Blade Templates → React Components

## Development

```bash
# Run development server
npm run dev

# Build for production
npm run build

# Start production server
npm start

# Run Prisma Studio (Database GUI)
npx prisma studio
```

## Database Management

```bash
# Apply schema changes to database
npx prisma db push

# Create migration
npx prisma migrate dev --name migration_name

# Reset database
npx prisma migrate reset

# Open Prisma Studio
npx prisma studio
```

## License

MIT
