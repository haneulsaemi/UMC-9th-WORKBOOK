import { pool } from "../db.config.js";

  /**
   * 스토어 존재 여부 확인
   */
export async function checkStoreExists(storeId) {
  const conn = await pool.getConnection();

  const sql = "SELECT id FROM store WHERE id = ? LIMIT 1";
  const [rows] = await (conn ?? pool).query(sql, [storeId]);
  return rows.length > 0;
}
