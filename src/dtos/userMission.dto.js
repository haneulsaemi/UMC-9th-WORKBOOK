export const bodyToUserMission = (data) => {
  return {
    email: data.email,
    missionId: data.missionId,
    storeId: data.storeId,
    status: data.status ?? "in_progress", // 기본값: 진행 중
  };
};

/**
 * DB 결과 → 응답용 UserMission DTO
 */
export const responseFromUserMission = (userMission) => {
  return {
    id: userMission.id,
    userId: userMission.user_id ?? userMission.userId,
    missionId: userMission.mission_id ?? userMission.missionId,
    status: userMission.status,
    startedAt: userMission.started_at ?? userMission.startedAt,
    completedAt: userMission.completed_at ?? userMission.completedAt,
    createdAt: userMission.created_at ?? userMission.createdAt,
    updatedAt: userMission.updated_at ?? userMission.updatedAt,
  };
};