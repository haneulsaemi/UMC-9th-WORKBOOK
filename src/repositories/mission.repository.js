import { pool } from "../db.config.js";

/** 미션 단건 조회 (store 일치 확인용) */
export async function getMissionById(missionId) {
  const conn = await pool.getConnection();

  const sql = "SELECT id, store_id, reward, deadline, mission_spec FROM mission WHERE id=? LIMIT 1";
  const [rows] = await (conn ?? pool).query(sql, [missionId]);
  return rows[0] ?? null;
}

/** 미션 생성 (1-3이 없을 때 수동 기입) */
export async function addMission({ storeId, title, description = null }) {
    const conn = await pool.getConnection();

    const sql = `
    INSERT INTO mission (store_id, reward, deadline, mission_spec, created_at, updated_at)
    VALUES (?, ?, ?, ?, NOW(6), NOW(6))
  `;
    const [res] = await (conn ?? pool).execute(sql, [storeId, title, description]);
    const id = res.insertId;
    return getMissionById(id);
}