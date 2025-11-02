import { getAllStoreReviews } from "../repositories/store.repository.js";
import { responseFromReviews } from "../dtos/store.dto.js";

export const listStoreReviews = async (storeId) => {
    const reviews = await getAllStoreReviews(storeId);
    return responseFromReviews(reviews)
}