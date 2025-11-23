import { getUserIdByEmail } from "../repositories/user.repository.js";
import { checkStoreExists } from "../repositories/store.repository.js";
import { getMissionById, addMission } from "../repositories/mission.repository.js";
import { isMissionInProgress, startUserMission, getMissionsByUserId } from "../repositories/userMission.repository.js";
import { responseFromUserMissions } from "../dtos/userMission.dto.js"; 
import { MissionAlreadyInProgressError, MissionNotFoundError, MissionStoreMismatchError } from "../errors.js";

export const  challengeMission = async (data) => {
    console.log(data)
    const userId = await getUserIdByEmail(data.email);
    if (!userId) {
        throw new UserNotFoundError("User not found by email");
    }

    const missionRow = await getMissionById(data.missionId);
    if (!missionRow) { throw MissionNotFoundError("Mission not found");}
    if (missionRow.store_id !== data.storeId) {
        throw new MissionStoreMismatchError("Mission does not belong to the store");
    }

    // 2) 이미 도전 중인지 확인
    const inProgress = await isMissionInProgress({ userId, missionId: missionRow.id });
    if (inProgress) {
      throw new MissionAlreadyInProgressError("Mission already in progress");
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

export const listMyMissions = async (userId, cursor) => {
  const missions = await getMissionsByUserId(userId, cursor);
  return responseFromUserMissions(missions)
}