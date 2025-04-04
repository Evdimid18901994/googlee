


export default defineEventHandler(async (event)=> {
    const query = getQuery(event)
    const final = query.name as string | undefined
    const age = parseInt(query.age) as number

    const { PrismaClient } = await import('@prisma/client') // 💥
    const prisma = new PrismaClient()
    
    const getus = final != undefined ? await prisma.customers.findMany({
        where: {
            name: {
                contains: final,
            },
            age: {
                gt: age,
            }
        }
    })
        : await prisma.customers.findMany()
    

    console.log('Found customers:', getus, final)
    return {
        getus
    }
})