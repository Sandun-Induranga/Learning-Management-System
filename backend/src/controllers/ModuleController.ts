import { Request, RequestHandler, Response } from "express";
import { Module } from "../models/Module";

export default class BatchController {
  saveModule: RequestHandler = async (
    req: Request,
    res: Response
  ): Promise<Response> => {
    try {
      let module = new Module(req.body);
      let savedModule = await module.save();

      return res
        .status(200)
        .json({ message: "Successfully Added..!", responseData: savedModule });
    } catch (error: unknown) {
      if (error instanceof Error)
        return res.status(500).json({ message: error.message });

      return res.status(500).json({ message: "Unknown Error Occured..!" });
    }
  };

  getAllModules: RequestHandler = async (
    req: Request,
    res: Response
  ): Promise<Response> => {
    try {
      let modules = await Module.find();

      return res
        .status(200)
        .json({ message: "Successfully Loaded..!", responseData: modules });
    } catch (error: unknown) {
      if (error instanceof Error)
        return res.status(500).json({ message: error.message });

      return res.status(500).json({ message: "Unknown Error Occured..!" });
    }
  };

  updateModule: RequestHandler = async (
    req: Request,
    res: Response
  ): Promise<Response> => {
    try {
      let { id } = req.params;

      let updateModule = await Module.findByIdAndUpdate(id, req.body, {
        new: true,
      });

      return res.status(200).json({
        message: "Successfully Updated..!",
        responseData: updateModule,
      });
    } catch (error: unknown) {
      if (error instanceof Error)
        return res.status(500).json({ message: error.message });

      return res.status(500).json({ message: "Unknown Error Occured..!" });
    }
  };

  deleteModule: RequestHandler = async (
    req: Request,
    res: Response
  ): Promise<Response> => {
    try {
      let { id } = req.params;

      let deleteModule = await Module.findByIdAndDelete(id);

      if (!deleteModule) throw new Error("Failed to Delete Batch");

      return res.status(200).json({
        message: "Successfully Deleted..!",
        responseData: deleteModule,
      });
    } catch (error: unknown) {
      if (error instanceof Error)
        return res.status(500).json({ message: error.message });

      return res.status(500).json({ message: "Unknown Error Occured..!" });
    }
  };
}
