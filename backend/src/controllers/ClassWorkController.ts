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

  getAllAnnouncements: RequestHandler = async (
    req: Request,
    res: Response
  ): Promise<Response> => {
    try {
      let announcements = await Announcement.find();

      return res.status(200).json({
        message: "Successfully Loaded..!",
        responseData: announcements,
      });
    } catch (error: unknown) {
      if (error instanceof Error)
        return res.status(500).json({ message: error.message });

      return res.status(500).json({ message: "Unknown Error Occured..!" });
    }
  };

  getAnnouncementByBatch: RequestHandler = async (
    req: Request,
    res: Response
  ): Promise<Response> => {
    try {
      let { batch } = req.params;
      let announcements = await Announcement.find({ batch: batch });

      return res.status(200).json({
        message: "Successfully Loaded..!",
        responseData: announcements,
      });
    } catch (error: unknown) {
      if (error instanceof Error)
        return res.status(500).json({ message: error.message });

      return res.status(500).json({ message: "Unknown Error Occured..!" });
    }
  };

  updateAnnouncement: RequestHandler = async (
    req: Request,
    res: Response
  ): Promise<Response> => {
    try {
      let { description } = req.params;

      let updatedBatch = await Announcement.findOneAndUpdate(
        { description: description },
        req.body,
        {
          new: true,
        }
      );

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
}
