import { Request, RequestHandler, Response } from "express";
import { Course } from "../models/Course";

export default class CourseController {
  saveCourse: RequestHandler = async (
    req: Request,
    res: Response
  ): Promise<Response> => {
    try {
      let { courseName } = req.body;
      let course = new Course({ courseName: courseName });
      let savedCourse = course.save();

      return res.status(200).json({ message: "come" });
    } catch (error: unknown) {}
  };
}
