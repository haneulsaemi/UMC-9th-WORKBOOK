export const bodyToReview = (data) => {
  return {
    email: data.email,  
    storeId: data.storeId ?? data.store_id, 
    body: data.body, 
    score: data.score, 
  };
};

export const responseFromReview = (review) => {
  return {
    id: review.id,
    userId: review.user_id ?? review.userId,
    storeId: review.store_id ?? review.storeId,
    body: review.body,
    score: review.score
  };
};
