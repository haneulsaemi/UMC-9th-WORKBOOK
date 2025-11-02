export const bodyToReview = (data) => {
  return {
    email: data.email,  
    storeId: data.storeId ?? data.store_id, 
    body: data.body, 
    score: data.score, 
  };
};

export const responseFromReview = (review) => {
  const r = review.created ?? review;
  console.log("responseFromReview", r);

  return {
    id: r.id,
    userId: r.user_id ?? r.userId,
    storeId: r.store_id ?? r.storeId,
    body: r.body,
    score: r.score,
  };

};