

export default defineEventHandler(async (event)=> {

    const { PrismaClient } = await import('@prisma/client') // 💥
    const prisma = new PrismaClient()
    
    const body = await readBody(event)

    let customer = null

    if (body.id) {

        customer = await prisma.customers.update({
            where: {
                id: body.id
            },
            data: {
                name: body.name,
                age: body.age,
                email:body.email,
                phone:body.phone
            }

        })

    }

})
