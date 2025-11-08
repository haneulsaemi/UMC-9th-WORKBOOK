import { getUserIdByEmail } from "../repositories/user.repository.js";
import { checkStoreExists } from "../repositories/store.repository.js";
import {
  addReview,
  getReviewById,
} from "../repositories/review.repository.js";
import { responseFromReview } from "../dtos/review.dto.js";

export const  createReview = async ({ email, storeId, body, score }) => {
  if (score != null && (score < 0 || score > 5)) {
    const err = new Error("Score must be between 0 and 5");
    err.status = 400;
    throw err;
  }
    const userId = await getUserIdByEmail(email);
    if (!userId) {
        const error = new Error("User not found by email");
        error.status = 404;
        throw error;
    }
    const storeExists = await checkStoreExists(storeId);
    if (!storeExists) {
        const error = new Error("Store not found");
        error.status = 404;
        throw error;
    }
    const created = await addReview({ userId, storeId, body, score });
    return responseFromReview(created);
}