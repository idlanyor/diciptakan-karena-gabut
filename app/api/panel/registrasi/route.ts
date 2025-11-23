import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import bcrypt from 'bcryptjs'

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const { nama, username, jabatan, role, password } = body

    // Check if username already exists
    const existingUser = await prisma.user.findUnique({
      where: { username }
    })

    if (existingUser) {
      return NextResponse.json(
        { message: 'Username sudah terdaftar' },
        { status: 400 }
      )
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10)

    // Create panel user
    const user = await prisma.user.create({
      data: {
        nama,
        username,
        jabatan,
        role,
        password: hashedPassword
      }
    })

    return NextResponse.json({
      message: 'Registrasi panel berhasil',
      data: {
        id: user.id,
        nama: user.nama,
        username: user.username,
        role: user.role
      }
    }, { status: 201 })

  } catch (error) {
    console.error('Panel registration error:', error)
    return NextResponse.json(
      { message: 'Terjadi kesalahan saat registrasi' },
      { status: 500 }
    )
  }
}
