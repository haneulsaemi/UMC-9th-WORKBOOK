import { pool } from "../db.config.js";

/** 이미 도전 중인지 확인 */
export async function isMissionInProgress({ userId, missionId }) {
    const conn = await pool.getConnection();
    const sql = `
        SELECT 1 FROM user_mission
        WHERE user_id=? AND mission_id=? AND status='in_progress'
        LIMIT 1
    `;
    const [rows] = await (conn ?? pool).query(sql, [userId, missionId]);
    console.log(rows)
    return rows.length > 0;
}

/** 도전 시작(in_progress 추가) - UNIQUE(user_id, mission_id) 보호 */
export async function startUserMission({ userId, missionId }) {
    const conn = await pool.getConnection();

    const sql = `
        INSERT INTO user_mission
        (user_id, mission_id, status, created_at, updated_at)
        VALUES (?, ?, 'in_progress', NOW(6), NOW(6))
    `;
    await (conn ?? pool).execute(sql, [userId, missionId]);
    // 조회 반환(필요 시)
    const q = `
        SELECT id, user_id, mission_id, status, created_at, updated_at
        FROM user_mission WHERE user_id=? AND mission_id=? LIMIT 1
    `;
    const [rows] = await (conn ?? pool).query(q, [userId, missionId]);
    return rows[0] ?? null;
}