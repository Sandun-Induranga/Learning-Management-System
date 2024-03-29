import { Request, RequestHandler, Response } from "express";
import { Result } from "../models/Result";
import { ClassWork } from "../models/ClassWork";
import { Student } from "../models/Student";

type ResultDetail = {
  studentId: string;
  classWorkId: string;
  mark: number;
  grade: string;
  classWorkName: string;
  moduleName: string;
};

export default class ResultController {
  saveResult: RequestHandler = async (
    req: Request,
    res: Response
  ): Promise<Response> => {
    try {
      let result = new Result(req.body);
      let savedResult = await result.save();

      return res
        .status(200)
        .json({ message: "Successfully Added..!", responseData: savedResult });
    } catch (error: unknown) {
      if (error instanceof Error)
        return res.status(500).json({ message: error.message });

      return res.status(500).json({ message: "Unknown Error Occured..!" });
    }
  };

  getAllResults: RequestHandler = async (
    req: Request,
    res: Response
  ): Promise<Response> => {
    try {
      let results = await Result.find();

      let assignments: ResultDetail[] = [];
      let courseworks: ResultDetail[] = [];
      let projects: ResultDetail[] = [];

      for (let i = 0; i < results.length; i++) {
        const result = results[i];

        let classWork = await ClassWork.findById(result.classWorkId);

        if (classWork) {
          let newResult = {
            studentId: result.studentId,
            classWorkId: result.classWorkId,
            mark: result.mark,
            grade: result.grade,
            classWorkName: classWork.name,
            moduleName: classWork.moduleName,
          };

          switch (classWork?.type) {
            case "Assignment":
              assignments.push(newResult);
              break;
            case "Project":
              projects.push(newResult);
              break;
            case "coursework":
              courseworks.push(newResult);
              break;
            default:
              break;
          }
        }
      }

      return res.status(200).json({
        message: "Successfully Loaded..!",
        responseData: {
          assignments: assignments,
          courseworks: courseworks,
          projects: projects,
        },
      });
    } catch (error: unknown) {
      if (error instanceof Error)
        return res.status(500).json({ message: error.message });

      return res.status(500).json({ message: "Unknown Error Occured..!" });
    }
  };

  getAllResultsByStudentId: RequestHandler = async (
    req: Request,
    res: Response
  ): Promise<Response> => {
    try {
      let { studentId } = req.params;
      let results = await Result.find({ studentId: studentId });

      let assignments: ResultDetail[] = [];
      let courseworks: ResultDetail[] = [];
      let projects: ResultDetail[] = [];

      for (let i = 0; i < results.length; i++) {
        const result = results[i];

        let classWork = await ClassWork.findById(result.classWorkId);

        if (classWork) {
          let newResult = {
            studentId: result.studentId,
            classWorkId: result.classWorkId,
            mark: result.mark,
            grade: result.grade,
            classWorkName: classWork.name,
            moduleName: classWork.moduleName,
          };

          switch (classWork?.type) {
            case "Assignment":
              assignments.push(newResult);
              break;
            case "Project":
              projects.push(newResult);
              break;
            case "Quize":
              courseworks.push(newResult);
              break;
            default:
              break;
          }
        }
      }

      return res.status(200).json({
        message: "Successfully Loaded..!",
        responseData: {
          assignments: assignments,
          courseworks: courseworks,
          projects: projects,
        },
      });
    } catch (error: unknown) {
      if (error instanceof Error)
        return res.status(500).json({ message: error.message });

      return res.status(500).json({ message: "Unknown Error Occured..!" });
    }
  };

  getAllResultsByNic: RequestHandler = async (
    req: Request,
    res: Response
  ): Promise<Response> => {
    try {
      let { nic } = req.params;
      let student = await Student.findOne({ nic: nic });
      let results = await Result.find({ studentId: student?._id });

      let assignments: ResultDetail[] = [];
      let courseworks: ResultDetail[] = [];
      let projects: ResultDetail[] = [];

      for (let i = 0; i < results.length; i++) {
        const result = results[i];

        let classWork = await ClassWork.findById(result.classWorkId);

        if (classWork) {
          let newResult = {
            studentId: result.studentId,
            classWorkId: result.classWorkId,
            mark: result.mark,
            grade: result.grade,
            classWorkName: classWork.name,
            moduleName: classWork.moduleName,
          };

          switch (classWork?.type) {
            case "Assignment":
              assignments.push(newResult);
              break;
            case "Project":
              projects.push(newResult);
              break;
            case "Quize":
              courseworks.push(newResult);
              break;
            default:
              break;
          }
        }
      }

      return res.status(200).json({
        message: "Successfully Loaded..!",
        responseData: {
          assignments: assignments,
          courseworks: courseworks,
          projects: projects,
        },
      });
    } catch (error: unknown) {
      if (error instanceof Error)
        return res.status(500).json({ message: error.message });

      return res.status(500).json({ message: "Unknown Error Occured..!" });
    }
  };
}
