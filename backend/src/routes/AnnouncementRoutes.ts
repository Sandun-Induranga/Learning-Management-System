import express, { Router } from "express";
import AnnoucementController from "../controllers/AnnouncementController";

export default class AnnoucementRoutes {
  private router: Router = express.Router();
  private announcementController: AnnoucementController =
    new AnnoucementController();

  constructor() {
    this.configRoutes();
  }

  private configRoutes = (): void => {
    this.router.post("/", this.announcementController.saveAnnouncement);
    this.router.get("/", this.announcementController.getAllAnnouncements);
    this.router.get("/:batch", this.announcementController.getAllAnnouncements);
  };

  public getRouter = (): Router => {
    return this.router;
  };
}
