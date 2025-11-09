import { StatusCodes } from "http-status-codes";
import { bodyToUser } from "../dtos/user.dto.js";
import { userSignUp } from "../services/user.service.js";
import { listMyReviews } from "../services/review.service.js";
import { listMyMissions } from "../services/mission.service.js"; 

export const handleUserSignUp = async (req, res, next) => {
  console.log("회원가입을 요청했습니다!");
  console.log("body:", req.body); // 값이 잘 들어오나 확인하기 위한 테스트용

  const user = await userSignUp(bodyToUser(req.body));
  res.status(StatusCodes.OK).success(user);
};

export const startUserMission = async (req, res, next) => {
  console.log("미션 시작을 요청했습니다!");
  console.log("body:", req.body);

  const userMission = await challengeMission(bodyToUserMission(req.body));
  res.status(StatusCodes.OK).success(userMission);
  
}

export const handleListMyReviews = async (req, res, next) => {
  console.log("내가 작성한 리뷰 목록을 요청했습니다.");
  const reviews = await listMyReviews(
      parseInt(req.params.userId),
      typeof req.query.cursor === "string" ? parseInt(req.query.cursor) : 0
  );

  res.status(StatusCodes.OK).success(reviews);
}

export const handleListMyMissions = async (req, res, next) => {
  console.log("내가 진행 중인 미션 목록을 요청했습니다. ");
  const missions = await listMyMissions(
    parseInt(req.params.userId),
      typeof req.query.cursor === "string" ? parseInt(req.query.cursor) : 0
  )
    res.status(StatusCodes.OK).success(missions);
}