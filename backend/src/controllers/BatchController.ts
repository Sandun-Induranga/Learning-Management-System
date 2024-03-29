import { Request, RequestHandler, Response } from "express";
import { Batch } from "../models/Batch";

export default class BatchController {
  saveBatch: RequestHandler = async (
    req: Request,
    res: Response
  ): Promise<Response> => {
    try {
      let { batchName } = req.body;
      let batch = new Batch({ batchName: batchName });
      let savedBatch = await batch.save();

      return res
        .status(200)
        .json({ message: "Successfully Added..!", responseData: savedBatch });
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

  updateBatch: RequestHandler = async (
    req: Request,
    res: Response
  ): Promise<Response> => {
    try {
      let { id } = req.params;

      let updatedBatch = await Batch.findByIdAndUpdate(id, req.body, {
        new: true,
      });

      return res.status(200).json({
        message: "Successfully Updated..!",
        responseData: updatedBatch,
      });
    } catch (error: unknown) {
      if (error instanceof Error)
        return res.status(500).json({ message: error.message });

      return res.status(500).json({ message: "Unknown Error Occured..!" });
    }
  };

  deleteBatch: RequestHandler = async (
    req: Request,
    res: Response
  ): Promise<Response> => {
    try {
      let { id } = req.params;

      let deletedBatch = await Batch.findByIdAndDelete(id);

      if (!deletedBatch) throw new Error("Failed to Delete Batch");

      return res.status(200).json({
        message: "Successfully Deleted..!",
        responseData: deletedBatch,
      });
    } catch (error: unknown) {
      if (error instanceof Error)
        return res.status(500).json({ message: error.message });

      return res.status(500).json({ message: "Unknown Error Occured..!" });
    }
  };

  findBatchById: RequestHandler = async (
    req: Request,
    res: Response
  ): Promise<Response> => {
    try {
      let { id } = req.params;
      let batch = await Batch.findById(id);

      return res
        .status(200)
        .json({ message: "Successfully Loaded..!", responseData: batch });
    } catch (error: unknown) {
      if (error instanceof Error)
        return res.status(500).json({ message: error.message });

      return res.status(500).json({ message: "Unknown Error Occured..!" });
    }
  };
}
