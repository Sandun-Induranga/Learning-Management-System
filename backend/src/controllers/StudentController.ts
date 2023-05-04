import { Request, RequestHandler, Response } from "express";
import { Student } from "../models/Student";
import { User } from "../models/User";

export default class StudentController {
  saveStudent: RequestHandler = async (
    req: Request,
    res: Response
  ): Promise<Response> => {
    try {
      let {
        nic,
        studentName,
        address,
        email,
        contact,
        batchName,
        profilePhoto,
        username,
        password,
      } = req.body;

      let student = new Student({
        nic: nic,
        studentName: studentName,
        address: address,
        email: email,
        contact: contact,
        batch: batchName,
        profilePhoto: profilePhoto,
        username: username,
      });

      let user = new User({
        username: username,
        password: password,
        role: "Student",
      });

      await student.save();
      await user.save();

      return res.status(200).json({ message: "Successfully Saved..!" });
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
        "../../../public/uploads/student_images/" +
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

  getAllStudents: RequestHandler = async (
    req: Request,
    res: Response
  ): Promise<Response> => {
    try {
      let students = await Student.find();

      return res
        .status(200)
        .json({ message: "Successfully Loaded..!", responseData: students });
    } catch (error: unknown) {
      if (error instanceof Error)
        return res.status(500).json({ message: error.message });

      return res.status(500).json({ message: "Unknown Error Occured..!" });
    }
  };

  updateStudent: RequestHandler = async (
    req: Request,
    res: Response
  ): Promise<Response> => {
    try {
      let { id } = req.params;

      let {
        nic,
        studentName,
        address,
        email,
        contact,
        batchName,
        profilePhoto,
        username,
        password,
      } = req.body;

      let student = new Student({
        nic: nic,
        studentName: studentName,
        address: address,
        email: email,
        contact: contact,
        batch: batchName,
        profilePhoto: profilePhoto,
        username: username,
      });

      let user = User.findOne({ username: username });

      let updatedStudent = await Student.findByIdAndUpdate(id, student, {
        new: true,
      });

      if (user) {
        await User.findOneAndUpdate(user, {
          new: true,
        });
      }

      return res.status(200).json({
        message: "Successfully Updated..!",
        responseData: updatedStudent,
      });
    } catch (error: unknown) {
      if (error instanceof Error)
        return res.status(500).json({ message: error.message });

      return res.status(500).json({ message: "Unknown Error Occured..!" });
    }
  };

  deleteStudent: RequestHandler = async (
    req: Request,
    res: Response
  ): Promise<Response> => {
    try {
      let { id, username } = req.params;

      let deletedStudent = await Student.findByIdAndDelete(id);
      await User.findOneAndDelete({ username: username });

      if (!deletedStudent) throw new Error("Failed to Delete Student");

      return res.status(200).json({
        message: "Successfully Deleted..!",
        responseData: deletedStudent,
      });
    } catch (error: unknown) {
      if (error instanceof Error)
        return res.status(500).json({ message: error.message });

      return res.status(500).json({ message: "Unknown Error Occured..!" });
    }
  };
}
