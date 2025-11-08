export const bodyToMission = (data) => {
  return {
    storeId: data.storeId,
    reward: data.reward,
    deadline: data.deadline, // string → DATETIME(6) (서비스 레벨에서 검증)
    missionSpec: data.missionSpec,
  };
};

/**
 * (미션 조회, 도전 응답 등)
 */
export const responseFromMission = (mission) => {
  return {
    id: mission.id,
    storeId: mission.store_id ?? mission.storeId,
    reward: mission.reward,
    deadline: mission.deadline,
    missionSpec: mission.mission_spec ?? mission.missionSpec,
    createdAt: mission.created_at ?? mission.createdAt,
    updatedAt: mission.updated_at ?? mission.updatedAt,
  };
};