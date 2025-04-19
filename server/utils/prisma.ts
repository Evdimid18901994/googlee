import { PrismaClient } from '@prisma/client'

// Создаем singleton экземпляр Prisma
const prismaClientSingleton = () => {
  return new PrismaClient()
}

type PrismaClientSingleton = ReturnType<typeof prismaClientSingleton>

// Глобальная переменная только для серверной части
const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClientSingleton | undefined
}

const prisma = globalForPrisma.prisma ?? prismaClientSingleton()

export default prisma

// В development сохраняем экземпляр в глобальной переменной
if (process.env.NODE_ENV !== 'production') {
  globalForPrisma.prisma = prisma
}

// Добавляем типы для Nuxt
declare module 'h3' {
  interface H3EventContext {
    prisma: typeof prisma
  }
}

// Хелпер для добавления Prisma в контекст
export const usePrisma = (event: any) => {
  event.context.prisma = prisma
  return prisma
}
