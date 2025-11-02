import { prisma } from "../db.config.js";

export const getAllStoreReviews = async (storeId, cursor) =>{
    const reviews = await prisma.review.findMany({
        select: {
            id: true,
            body: true,
            storeId: true,
            userId: true,
        },
        where: { storeId: storeId, id: { gt: cursor } },
        orderBy: { id: "asc" },
        take: 5,
    });

    return reviews;
}

export const checkStoreExists = async (storeId) => {
    const store = await prisma.store.findFirst({
        select:{id:true},
        where:{id:storeId},
    })
    return store !== null;
}