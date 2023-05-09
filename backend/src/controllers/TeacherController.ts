import { Request, RequestHandler, Response } from "express";
import { Teacher } from "../models/Teacher";
import { User } from "../models/User";

export default class TeacherController {
  saveTeacher: RequestHandler = async (
    req: Request,
    res: Response
  ): Promise<Response> => {
    try {
      let {
        nic,
        teacherName,
        address,
        email,
        contact,
        profilePhoto,
        username,
        password,
      } = req.body;

      let teacher = new Teacher({
        nic: nic,
        teacherName: teacherName,
        address: address,
        email: email,
        contact: contact,
        profilePhoto: profilePhoto,
        username: username,
      });

      let user = new User({
        username: username,
        password: password,
        role: "Teacher",
      });

      let savedTeacger = await teacher.save();
      await user.save();

      return res
        .status(200)
        .json({ message: "Successfully Saved..!", responseData: savedTeacger });
    } catch (error: unknown) {
      if (error instanceof Error)
        return res.status(500).json({ message: error.message });

      return res.status(500).json({ message: "Unknown Error Occured..!" });
    }
  };

  saveTeacherImage: RequestHandler = async (
    req: Request,
    res: Response
  ): Promise<Response> => {
    try {
      let { id } = req.params;

      let teacher = new Teacher(await Teacher.findById(id));
      teacher.profilePhoto =
        "../../../public/uploads/teacher_images/" +
        req.file?.originalname.toString();

      let updatedTeacher = await Teacher.findByIdAndUpdate(id, teacher, {
        new: true,
      });

      return res
        .status(200)
        .json({ message: "Uploaded", responseData: updatedTeacher });
    } catch (error: unknown) {
      if (error instanceof Error)
        return res.status(500).json({ message: error.message });

      return res.status(500).json({ message: "Unknown Error Occured..!" });
    }
  };

  getAllTeachers: RequestHandler = async (
    req: Request,
    res: Response
  ): Promise<Response> => {
    try {
      let teachers = await Teacher.find();

      return res
        .status(200)
        .json({ message: "Successfully Loaded..!", responseData: teachers });
    } catch (error: unknown) {
      if (error instanceof Error)
        return res.status(500).json({ message: error.message });

      return res.status(500).json({ message: "Unknown Error Occured..!" });
    }
  };

  updateTeacher: RequestHandler = async (
    req: Request,
    res: Response
  ): Promise<Response> => {
    try {
      let { id } = req.params;

      let { nic, teacherName, address, email, contact, username, password } =
        req.body;

      let teacher = {
        nic: nic,
        teacherName: teacherName,
        address: address,
        email: email,
        contact: contact,
        username: username,
      };

      let updatedStudent = await Teacher.findByIdAndUpdate(id, teacher, {
        new: true,
      });

      let user = {
        username: username,
        password: password,
        role: "Student",
      };

      User.findOneAndUpdate({ username: username }, user);

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

  deleteTeacher: RequestHandler = async (
    req: Request,
    res: Response
  ): Promise<Response> => {
    try {
      let { id, username } = req.params;

      let deletedTeacher = await Teacher.findByIdAndDelete(id);
      await User.findOneAndDelete({ username: username });

      if (!deletedTeacher) throw new Error("Failed to Delete Student");

      return res.status(200).json({
        message: "Successfully Deleted..!",
        responseData: deletedTeacher,
      });
    } catch (error: unknown) {
      if (error instanceof Error)
        return res.status(500).json({ message: error.message });

      return res.status(500).json({ message: "Unknown Error Occured..!" });
    }
  };

  getTeacherByUsername: RequestHandler = async (
    req: Request,
    res: Response
  ): Promise<Response> => {
    try {
      let { username } = req.params;
      let teacher = await Teacher.findOne({ username: username });

      return res
        .status(200)
        .json({ message: "Successfully Loaded..!", responseData: teacher });
    } catch (error: unknown) {
      if (error instanceof Error)
        return res.status(500).json({ message: error.message });

      return res.status(500).json({ message: "Unknown Error Occured..!" });
    }
  };
}
