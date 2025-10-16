import bcrypt from 'bcryptjs'
import { User } from '~/server/model/User'
import { RegisterRequest, RegisterResponse } from '~/types/AuthType'
import {prisma} from '~/server/config/db'

export default defineEventHandler(async (event) => {
  try {
    const data: RegisterRequest = await readBody(event)

    if (!data.username || !data.email || !data.password) {
      setResponseStatus(event, 400)
      return {
        code: 400,
        message:
          'Harap berikan semua kolom yang diperlukan (nama lengkap, email, kata sandi).',
      }
    }

    // 🔍 Cek apakah user sudah terdaftar
    const existingUser = await prisma.user.findUnique({
      where: { email: data.email },
    })

    if (existingUser) {
      setResponseStatus(event, 409)
      return { code: 409, message: 'Pengguna dengan email ini sudah terdaftar.' }
    }

    // 🔐 Hash password
    const hashedPassword = await bcrypt.hash(data.password, 10)

    // 🧱 Simpan user baru
    const user = await User.registerUser({
      username: data.username,
      email: data.email,
      password: hashedPassword,
    })

    // 📨 Kirim email verifikasi/selamat datang
    await SendEmailRegister(user.email, user.username)

    setResponseStatus(event, 201)
    return <RegisterResponse>{
      code: 201,
      message: 'Pengguna berhasil terdaftar!',
      data: {
        user: {
          id: user.id,
          email: user.email,
          role: user.role,
        },
      },
    }
  } catch (error: any) {
    console.error('Register error:', error)
    return sendError(
      event,
      createError({
        statusCode: 500,
        statusMessage: error.message || 'Internal Server Error',
      }),
    )
  }
})
