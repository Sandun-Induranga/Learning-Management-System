import { Request, RequestHandler, Response } from "express";

export default class CourseController {
  saveCourse: RequestHandler = async (
    req: Request,
    res: Response
  ): Promise<Response> => {
    return res.status(200).json({ message: "come" });
  };
}
