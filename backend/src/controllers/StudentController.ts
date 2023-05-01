import { Request, RequestHandler, Response } from "express";
import { Student } from "../models/Student";
import { Batch } from "../models/Batch";

export default class StudentController {
  saveStudent: RequestHandler = async (
    req: Request,
    res: Response
  ): Promise<Response> => {
    try {
      let { batchName } = req.body;
      let batch = await Batch.findOne({ batchName: batchName });
      let student = new Student(req.body);

      if (batch) {
        student.batchId = batch._id.toString();
        let savedStudent = await student.save();
        return res.status(200).json({
          message: "Successfully Added..!",
          responseData: savedStudent,
        });
      }

      return res;
    } catch (error: unknown) {
      if (error instanceof Error)
        return res.status(500).json({ message: error.message });

      return res.status(500).json({ message: "Unknown Error Occured..!" });
    }
  };
}
