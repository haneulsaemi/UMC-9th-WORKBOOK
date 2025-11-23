import { StatusCodes } from "http-status-codes";
import { listStoreReviews, listStoreMissions } from "../services/store.service.js";
import { bodyToReview } from "../dtos/review.dto.js"; 
import { createReview } from "../services/review.service.js";

export const handleAddStoreReview = async (req, res, next) => {
    /*
    #swagger.summary = '상점 리뷰 목록 조회 API';
    #swagger.responses[200] = {
      description: "상점 리뷰 목록 조회 성공 응답",
      content: {
        "application/json": {
          schema: {
            type: "object",
            properties: {
              resultType: { type: "string", example: "SUCCESS" },
              error: { type: "object", nullable: true, example: null },
              success: {
                type: "object",
                properties: {
                  data: {
                    type: "array",
                    items: {
                      type: "object",
                      properties: {
                        id: { type: "number" },
                        store: { type: "object", properties: { id: { type: "number" }, name: { type: "string" } } },
                        user: { type: "object", properties: { id: { type: "number" }, email: { type: "string" }, name: { type: "string" } } },
                        content: { type: "string" }
                      }
                    }
                  },
                  pagination: { type: "object", properties: { cursor: { type: "number", nullable: true } }}
                }
              }
            }
          }
        }
      }
    };
  */
      console.log("리뷰작성을 요청했습니다!");
      console.log("body:", req.body); // 값이 잘 들어오나 확인하기 위한 테스트용
    
      const review = await createReview(bodyToReview(req.body));
      res.status(StatusCodes.OK).success(review);
}

export const handleListStoreReviews = async(req, res, next) => {
    const reviews = await listStoreReviews(
        parseInt(req.params.storeId),
        typeof req.query.cursor === "string" ? parseInt(req.query.cursor) : 0
    );
    res.status(StatusCodes.OK).success(reviews);
}

export const handleListStoreMissions = async (req, res, next) => {
    console.log("스토어 미션 목록을 요청했습니다!")
    
    const missions = await listStoreMissions(
        parseInt(req.params.storeId),
        typeof req.query.cursor === "string" ? parseInt(req.query.cursor) : 0
    );

    res.status(StatusCodes.OK).success(missions);
}