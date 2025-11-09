import { getUserIdByEmail } from "../repositories/user.repository.js";
import { checkStoreExists } from "../repositories/store.repository.js";
import { addReview, getReviewByUserId } from "../repositories/review.repository.js";
import { responseFromReview, responseFromReviews } from "../dtos/review.dto.js";
import { InvalidScoreError, StoreNotFoundError, UserNotFoundError } from "../errors.js";

export const  createReview = async ({ email, storeId, body, score }) => {
  if (score != null && (score < 0 || score > 5)) {
    throw new InvalidScoreError("Score must be between 0 and 5");
  }
    let userId = await getUserIdByEmail(email);
    console.log(userId)
    if (!userId) {
        throw new UserNotFoundError("User not found by email");
    }
    const storeExists = await checkStoreExists(storeId);
    if (!storeExists) {
        throw new StoreNotFoundError("Store not found");
    }
    
    const created = await addReview(userId.id, storeId, body, score);
    return responseFromReview(created);
}

export const listMyReviews = async (userId, cursor) => {
    const reviews = await getReviewByUserId(userId, cursor);
    return responseFromReviews(reviews);
}