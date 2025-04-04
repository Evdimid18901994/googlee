import {PrismaClient} from "@prisma/client"

const prisma = new PrismaClient()

export default defineEventHandler(async(event)=> {
    const body = await readBody(event)
    const deleteId = body.id

    const del = await prisma.customers.delete({
        where: {
            id: deleteId
        }
    })
    console.log(del)

})