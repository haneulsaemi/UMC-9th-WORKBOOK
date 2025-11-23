import { prisma } from "../db.config.js";

// 리뷰 추가

export const addReview = async (userId, storeId, body=null, score=null)=>{
    const created = await prisma.review.create({
        data:{
            userId,
            storeId,
            body,
            score,
        }
    })
    console.log(created)
    return created;
}

//리뷰 조회

export const getReviewById = async (id) => {
    const review = prisma.review.findFirst({
        select:{
            id:true,
            userId: true,
            storeId: true,
            body: true,
            createdAt: true,
            updatedAt: true
        },
        where:{
            id: id
        }
    })
    
    return review ?? null;
}

export const getReviewByUserId = async (userId, cursor) => {
    const review = prisma.review.findMany({
        where:{
            userId, id: { gt: cursor } 
        },
        orderBy: { id: "asc" },
        take: 5,
    })
    console.log("repository: ", review)
    return review;
}