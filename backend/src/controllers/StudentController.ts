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

  saveStudentImage: RequestHandler = async (
    req: Request,
    res: Response
  ): Promise<Response> => {
    try {
      let { id } = req.params;

      let student = new Student(await Student.findById(id));
      student.profilePhoto =
        req.file?.destination
          .replace(
            "/media/sandu/0559F5C021740317/GDSE/Project_Zone/VS_Projects/Learning-Management-System/frontend/src",
            "../.."
          )
          .toString() +
        "/" +
        req.file?.originalname.toString();

      let updatedStudent = await Student.findByIdAndUpdate(id, student, {
        new: true,
      });

      return res
        .status(200)
        .json({ message: "Uploaded", responseData: updatedStudent });
    } catch (error: unknown) {
      if (error instanceof Error)
        return res.status(500).json({ message: error.message });

      return res.status(500).json({ message: "Unknown Error Occured..!" });
    }
  };
}
