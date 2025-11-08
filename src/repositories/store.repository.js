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

export const getAllStoreMissions = async (storeId, cursor) => {
    const missions = await prisma.mission.findMany({
        select:{
            id: true,
            storeId: true,
            reward: true,
            deadline: true,
            missionSpec: true,
        },
        where: {storeId:storeId, id: { gt: cursor }},
        orderBy: { id: "asc" },
        take: 5,
    })
    return missions;
}

export const checkStoreExists = async (storeId) => {
    const store = await prisma.store.findFirst({
        select:{id:true},
        where:{id:storeId},
    })
    return store !== null;
}