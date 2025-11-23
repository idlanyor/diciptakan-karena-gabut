import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { prisma } from '@/lib/prisma'

export async function GET(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions)

    if (!session || (session.user as any).type !== 'pendaftar') {
      return NextResponse.json(
        { message: 'Unauthorized' },
        { status: 401 }
      )
    }

    const userId = parseInt((session.user as any).id)

    const biodata = await prisma.biodataUmum.findFirst({
      where: { idPendaftar: userId }
    })

    return NextResponse.json({
      data: biodata
    })

  } catch (error) {
    console.error('Get biodata error:', error)
    return NextResponse.json(
      { message: 'Terjadi kesalahan saat mengambil data' },
      { status: 500 }
    )
  }
}

export async function POST(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions)

    if (!session || (session.user as any).type !== 'pendaftar') {
      return NextResponse.json(
        { message: 'Unauthorized' },
        { status: 401 }
      )
    }

    const userId = parseInt((session.user as any).id)
    const body = await req.json()

    const biodata = await prisma.biodataUmum.create({
      data: {
        ...body,
        idPendaftar: userId,
        tglLahir: new Date(body.tglLahir)
      }
    })

    return NextResponse.json({
      message: 'Biodata berhasil disimpan',
      data: biodata
    }, { status: 201 })

  } catch (error) {
    console.error('Create biodata error:', error)
    return NextResponse.json(
      { message: 'Terjadi kesalahan saat menyimpan data' },
      { status: 500 }
    )
  }
}

export async function PATCH(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions)

    if (!session || (session.user as any).type !== 'pendaftar') {
      return NextResponse.json(
        { message: 'Unauthorized' },
        { status: 401 }
      )
    }

    const userId = parseInt((session.user as any).id)
    const body = await req.json()

    const biodata = await prisma.biodataUmum.updateMany({
      where: { idPendaftar: userId },
      data: {
        ...body,
        tglLahir: body.tglLahir ? new Date(body.tglLahir) : undefined
      }
    })

    return NextResponse.json({
      message: 'Biodata berhasil diupdate',
      data: biodata
    })

  } catch (error) {
    console.error('Update biodata error:', error)
    return NextResponse.json(
      { message: 'Terjadi kesalahan saat mengupdate data' },
      { status: 500 }
    )
  }
}
