import { Request, RequestHandler, Response } from "express";

export default class AnnouncementController {
  saveAnnouncement: RequestHandler = async (
    req: Request,
    res: Response
  ): Promise<Response> => {
    return res;
  };
}
