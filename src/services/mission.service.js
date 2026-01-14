 import { getUserIdByEmail } from "../repositories/user.repository.js";
import { checkStoreExists } from "../repositories/store.repository.js";
import { getMissionById, addMission } from "../repositories/mission.repository.js";
import { isMissionInProgress, startUserMission } from "../repositories/userMission.repository.js";

export const  challengeMission = async (data) => {
    console.log(data)
    const userId = await getUserIdByEmail(data.email);
    if (!userId) {
        const error = new Error("User not found by email");
        error.status = 404;
        throw error;
    }

    const missionRow = await getMissionById(data.missionId);
    if (!missionRow) { const e = new Error("Mission not found"); e.status = 404; throw e; }
    if (missionRow.store_id !== data.storeId) {
        const e = new Error("Mission does not belong to the store");
        e.status = 400; throw e;
    }

    // 2) 이미 도전 중인지 확인
    const inProgress = await isMissionInProgress({ userId, missionId: missionRow.id });
    if (inProgress) {
      const e = new Error("Mission already in progress");
      e.status = 409; // Conflict
      throw e;
    }
    // 3) 도전 시작
    const started = await startUserMission({ userId, missionId: missionRow.id });

    return {
      mission: {
        id: missionRow.id,
        storeId: missionRow.store_id,
        title: missionRow.title,
        description: missionRow.description ?? null,
      },
      userMission: {
        id: started.id,
        userId: started.user_id,
        missionId: started.mission_id,
        status: started.status,
        startedAt: started.started_at,
        createdAt: started.created_at,
        updatedAt: started.updated_at,
      },
    };
}