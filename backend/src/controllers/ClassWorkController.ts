import { Request, RequestHandler, Response } from "express";
import { ClassWork } from "../models/ClassWork";

export default class ClassWorkController {
  saveClassWork: RequestHandler = async (
    req: Request,
    res: Response
  ): Promise<Response> => {
    try {
      let classWork = new ClassWork(req.body);
      let savedClassWork = await classWork.save();
      return res.status(200).json({
        message: "Successfully Saved..!",
        responseData: savedClassWork,
      });
    } catch (error: unknown) {
      if (error instanceof Error)
        return res.status(500).json({ message: error.message });

      return res.status(500).json({ message: "Unknown Error Occured..!" });
    }
  };

  getAllClassworks: RequestHandler = async (
    req: Request,
    res: Response
  ): Promise<Response> => {
    try {
      let classWorks = await ClassWork.find();

      return res.status(200).json({
        message: "Successfully Loaded..!",
        responseData: classWorks,
      });
    } catch (error: unknown) {
      if (error instanceof Error)
        return res.status(500).json({ message: error.message });

      return res.status(500).json({ message: "Unknown Error Occured..!" });
    }
  };

  getClassWorksByBatch: RequestHandler = async (
    req: Request,
    res: Response
  ): Promise<Response> => {
    try {
      let { batch } = req.params;
      let classWorks = await ClassWork.find({ batch: batch });

      return res.status(200).json({
        message: "Successfully Loaded..!",
        responseData: classWorks,
      });
    } catch (error: unknown) {
      if (error instanceof Error)
        return res.status(500).json({ message: error.message });

      return res.status(500).json({ message: "Unknown Error Occured..!" });
    }
  };

  updateClassWork: RequestHandler = async (
    req: Request,
    res: Response
  ): Promise<Response> => {
    try {
      let { id } = req.params;

      let updateClassWork = await ClassWork.findByIdAndUpdate(id, req.body, {
        new: true,
      });

      return res.status(200).json({
        message: "Successfully Updated..!",
        responseData: updateClassWork,
      });
    } catch (error: unknown) {
      if (error instanceof Error)
        return res.status(500).json({ message: error.message });

      return res.status(500).json({ message: "Unknown Error Occured..!" });
    }
  };

  saveClassWorkImage: RequestHandler = async (
    req: Request,
    res: Response
  ): Promise<Response> => {
    try {
      let { id } = req.params;

      let classWork = new ClassWork(await ClassWork.findById(id));
      classWork.file =
        "../../../public/uploads/classWorks/" +
        req.file?.originalname.toString();

      let updateClassWork = await ClassWork.findByIdAndUpdate(id, classWork, {
        new: true,
      });

      return res
        .status(200)
        .json({ message: "Uploaded", responseData: updateClassWork });
    } catch (error: unknown) {
      if (error instanceof Error)
        return res.status(500).json({ message: error.message });

      return res.status(500).json({ message: "Unknown Error Occured..!" });
    }
  };

  getClassWorksByBatchAndType: RequestHandler = async (
    req: Request,
    res: Response
  ): Promise<Response> => {
    try {
      let { batch, type, module } = req.params;
      let classWorks = await ClassWork.find({
        batch: batch,
        type: type,
        moduleName: module,
      });

      return res.status(200).json({
        message: "Successfully Loaded..!",
        responseData: classWorks,
      });
    } catch (error: unknown) {
      if (error instanceof Error)
        return res.status(500).json({ message: error.message });

      return res.status(500).json({ message: "Unknown Error Occured..!" });
    }
  };

  getClassWorkById: RequestHandler = async (
    req: Request,
    res: Response
  ): Promise<Response> => {
    try {
      let { id } = req.params;
      let classWork = await ClassWork.findById(id);

      return res.status(200).json({
        message: "Successfully Loaded..!",
        responseData: classWork,
      });
    } catch (error: unknown) {
      if (error instanceof Error)
        return res.status(500).json({ message: error.message });

      return res.status(500).json({ message: "Unknown Error Occured..!" });
    }
  };
}
