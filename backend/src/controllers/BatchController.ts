import { Request, RequestHandler, Response } from "express";
import { Batch } from "../models/Batch";

export default class BatchController {
  saveBatch: RequestHandler = async (
    req: Request,
    res: Response
  ): Promise<Response> => {
    try {
      let { batchName } = req.body;
      let course = new Batch({ batchName: batchName });
      let savedCourse = await course.save();

      return res
        .status(200)
        .json({ message: "Successfully Added..!", responseData: savedCourse });
    } catch (error: unknown) {
      if (error instanceof Error)
        return res.status(500).json({ message: error.message });

      return res.status(500).json({ message: "Unknown Error Occured..!" });
    }
  };
  getAllBatches: RequestHandler = async (
    req: Request,
    res: Response
  ): Promise<Response> => {
    try {
      let batches = await Batch.find();

      return res
        .status(200)
        .json({ message: "Successfully Loaded..!", responseData: batches });
    } catch (error: unknown) {
      if (error instanceof Error)
        return res.status(500).json({ message: error.message });

      return res.status(500).json({ message: "Unknown Error Occured..!" });
    }
  };
}
