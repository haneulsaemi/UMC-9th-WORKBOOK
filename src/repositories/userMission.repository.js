import { prisma } from "../db.config.js";

export const isMissionInProgress = async (userId, missionId) => {
    const mission = await prisma.userMission.findFirst({
        select:{
            id: true
        },
        where:{
            userId: userId,
            missionId: missionId
        }
    })
    console.log(mission)
    return mission !== null;
}

export const startUserMission = async (userId, missionId) => {
    const created = await prisma.userMission.create({
        data:{
            userId: userId,
            missionId: missionId,
            status: 'in_progress',
            createdAt: new Date(),
            updatedAt: new Date()
        }
    })

    const result = prisma.userMission.findFirst({
        where:{
            userId: userId,
            missionId: missionId
        },
        orderBy:{
            createdAt: "desc"
        }
    })

    return result ?? null

}