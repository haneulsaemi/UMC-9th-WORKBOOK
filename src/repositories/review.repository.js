import { pool } from "../db.config.js";


/**
 * 리뷰 추가
 */
export async function addReview({ userId, storeId, body = null, score = null }) {
    const conn = await pool.getConnection();

    const sql = `
        INSERT INTO review
        (user_id\, store_id, body, score, created_at, updated_at)
        VALUES (?, ?, ?, ?, NOW(6), NOW(6))
    `;
    const params = [userId, storeId, body, score];
    const [res] = await (conn ?? pool).execute(sql, params);

    const insertedId = res.insertId;
    return getReviewById(insertedId, conn);
}

/**
 * 리뷰 단건 조회
 */
export async function getReviewById(id) {
    const conn = await pool.getConnection();

    const sql = `
        SELECT id, user_id, store_id, body, score, created_at, updated_at
        FROM review
        WHERE id = ?
        LIMIT 1
    `;
    const [rows] = await (conn ?? pool).query(sql, [id]);
    return rows.length ? rows[0] : null;
}