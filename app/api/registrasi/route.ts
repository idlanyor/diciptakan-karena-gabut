import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import bcrypt from 'bcryptjs'

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const { nama_lengkap, email, tgl_lahir, password, gelombang, jalur_pendaftaran } = body

    // Check if email already exists
    const existingUser = await prisma.studentUser.findFirst({
      where: { email }
    })

    if (existingUser) {
      return NextResponse.json(
        { message: 'Email sudah terdaftar' },
        { status: 400 }
      )
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10)

    // Create student user
    const user = await prisma.studentUser.create({
      data: {
        namaLengkap: nama_lengkap,
        email,
        tglLahir: tgl_lahir,
        password: hashedPassword,
        status: 0,
        tglDaftar: new Date(),
        gelombang,
        jalurPendaftaran: jalur_pendaftaran
      }
    })

    return NextResponse.json({
      message: 'Registrasi berhasil',
      data: {
        id: user.id,
        nama_lengkap: user.namaLengkap,
        email: user.email
      }
    }, { status: 201 })

  } catch (error) {
    console.error('Registration error:', error)
    return NextResponse.json(
      { message: 'Terjadi kesalahan saat registrasi' },
      { status: 500 }
    )
  }
}
