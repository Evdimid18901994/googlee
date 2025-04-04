import {PrismaClient} from "@prisma/client"

const prisma = new PrismaClient()

export default defineEventHandler(async (event)=> {

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
