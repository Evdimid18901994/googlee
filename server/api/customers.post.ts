

export default defineEventHandler(async(event)=> {

    let customer = null
    const body = await readBody(event)

    const { PrismaClient } = await import('@prisma/client') // 💥
    const prisma = new PrismaClient()
    
    if (body.name) {
        customer = await prisma.customers.create({
            data: {
                name: body.name,
                email: body.email,
                phone: body.phone,
                age:body.age
            }
        })
    }

    return {
        user: customer
    }

})