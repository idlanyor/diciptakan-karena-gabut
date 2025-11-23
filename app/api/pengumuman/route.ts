import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function GET(req: NextRequest) {
  try {
    const posts = await prisma.post.findMany({
      include: {
        user: {
          select: {
            nama: true,
            jabatan: true
          }
        }
      },
      orderBy: {
        tgl: 'desc'
      }
    })

    return NextResponse.json({
      data: posts
    })

  } catch (error) {
    console.error('Get pengumuman error:', error)
    return NextResponse.json(
      { message: 'Terjadi kesalahan saat mengambil data' },
      { status: 500 }
    )
  }
}
