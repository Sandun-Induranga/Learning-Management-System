import { Request, RequestHandler, Response } from "express";
import { Announcement } from "../models/Announcement";

export default class AnnouncementController {
  saveAnnouncement: RequestHandler = async (
    req: Request,
    res: Response
  ): Promise<Response> => {
    try {
      let announcement = new Announcement(req.body);
      let savedAnnouncement = await announcement.save();
      return res.status(200).json({
        message: "Successfully Saved..!",
        responseData: savedAnnouncement,
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
