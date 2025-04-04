

export default defineEventHandler(async(event)=> {
    const body = await readBody(event)
    const deleteId = body.id

    const { PrismaClient } = await import('@prisma/client') // 💥
     const prisma = new PrismaClient()

    const del = await prisma.customers.delete({
        where: {
            id: deleteId
        }
    })
    console.log(del)

})