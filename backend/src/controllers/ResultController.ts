import { Request, RequestHandler, Response } from "express";
import { Result } from "../models/Result";

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

      return res.status(200).json({
        message: "Successfully Loaded..!",
        responseData: results,
      });
    } catch (error: unknown) {
      if (error instanceof Error)
        return res.status(500).json({ message: error.message });

      return res.status(500).json({ message: "Unknown Error Occured..!" });
    }
  };
}
