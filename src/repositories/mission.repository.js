import { prisma } from "../db.config.js";

/** 미션 단건 조회 (store 일치 확인용) */
export const getMissionById = async (missionId) => {
    const mission = await prisma.mission.findFirst({
        select:{
            id: true,
            storeId: true,
            reward: true,
            deadline: true,
            missionSpec: true,
        },
        where: {id:missionId}
    })

    return mission ?? null;
}

export const addMission = async (storeId, title, description = null) =>{
    const created = await prisma.mission.create({
        data:{
            storeId: storeId,
            title: title,
            description: description,
        }
    })
    return getMissionById(mission);
}

