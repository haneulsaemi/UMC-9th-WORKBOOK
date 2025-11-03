import { StatusCodes } from "http-status-codes";
import { listStoreReviews, listStoreMissions } from "../services/store.service.js";
import { bodyToReview } from "../dtos/review.dto.js"; 
import { createReview } from "../services/review.service.js";

export const handleAddStoreReview = async (req, res, next) => {
      console.log("리뷰작성을 요청했습니다!");
      console.log("body:", req.body); // 값이 잘 들어오나 확인하기 위한 테스트용
    
      const review = await createReview(bodyToReview(req.body));
      res.status(StatusCodes.OK).json({ result: review });
}

export const handleListStoreReviews = async(req, res, next) => {
    const reviews = await listStoreReviews(
        parseInt(req.params.storeId),
        typeof req.query.cursor === "string" ? parseInt(req.query.cursor) : 0
    );
    res.status(StatusCodes.OK).json({ result: reviews })
}

export const handleListStoreMissions = async (req, res, next) => {
    console.log("스토어 미션 목록을 요청했습니다!")
    
    const missions = await listStoreMissions(
        parseInt(req.params.storeId),
        typeof req.query.cursor === "string" ? parseInt(req.query.cursor) : 0
    );

    res.status(StatusCodes.OK).json({ result: missions })
}