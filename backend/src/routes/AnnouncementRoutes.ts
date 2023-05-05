import express, { Router } from "express";
import AnnoucementController from "../controllers/AnnouncementController";

export default class CourseRoutes {
  private router: Router = express.Router();
  private announcementController: AnnoucementController =
    new AnnoucementController();

  constructor() {
    this.configRoutes();
  }

  private configRoutes = (): void => {
    this.router.post("/", this.announcementController.saveAnnouncement);
  };

  public getRouter = (): Router => {
    return this.router;
  };
}
