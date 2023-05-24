import { Request, RequestHandler, Response } from "express";
import { Answer } from "../models/Answer";

export default class AnswerController {
  saveAnswer: RequestHandler = async (
    req: Request,
    res: Response
  ): Promise<Response> => {
    try {
      let answer = new Answer(req.body);
      let savedAnswer = await answer.save();
      return res.status(200).json({
        message: "Successfully Saved..!",
        responseData: savedAnswer,
      });
    } catch (error: unknown) {
      if (error instanceof Error)
        return res.status(500).json({ message: error.message });

      return res.status(500).json({ message: "Unknown Error Occured..!" });
    }
  };

  saveAnswerFile: RequestHandler = async (
    req: Request,
    res: Response
  ): Promise<Response> => {
    try {
      let { id } = req.params;

      let answer = new Answer(await Answer.findById(id));
      answer.file =
        "../../../public/uploads/answers/" + req.file?.originalname.toString();

      let updateAnswer = await Answer.findByIdAndUpdate(id, answer, {
        new: true,
      });

      return res
        .status(200)
        .json({ message: "Uploaded", responseData: updateAnswer });
    } catch (error: unknown) {
      if (error instanceof Error)
        return res.status(500).json({ message: error.message });

      return res.status(500).json({ message: "Unknown Error Occured..!" });
    }
  };

  getAllAnswersByClasswork: RequestHandler = async (
    req: Request,
    res: Response
  ): Promise<Response> => {
    try {
      let { classWorkId } = req.params;

      let answers = await Answer.find({ classWorkId: classWorkId });

      return res
        .status(200)
        .json({ message: "Successfully Loaded..!", responseData: answers });
    } catch (error: unknown) {
      if (error instanceof Error)
        return res.status(500).json({ message: error.message });

      return res.status(500).json({ message: "Unknown Error Occured..!" });
    }
  };

  getAnswersByUsernameAndClassWork: RequestHandler = async (
    req: Request,
    res: Response
  ): Promise<Response> => {
    try {
      let { username, classWorkId } = req.params;
      let answers = await Answer.find({
        studentUsername: username,
        classWorkId: classWorkId,
      });

      return res
        .status(200)
        .json({ message: "Successfully Loaded..!", responseData: answers });
    } catch (error: unknown) {
      if (error instanceof Error)
        return res.status(500).json({ message: error.message });

      return res.status(500).json({ message: "Unknown Error Occured..!" });
    }
  };
}
