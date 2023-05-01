import express, { Router } from "express";
import CourseController from "../controllers/CourseController";

export default class CourseRoutes {
  private router: Router = express.Router();
  private courseController: CourseController = new CourseController();

  constructor() {
    this.configRoutes();
  }

  private configRoutes = (): void => {
    this.router.post("/", this.courseController.saveCourse);
  };

  public getRouter = (): Router => {
    return this.router;
  };
}
