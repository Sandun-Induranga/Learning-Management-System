import express, { Router } from "express";
import TeacherController from "../controllers/TeacherController";

export default class TeacherRoutes {
  private router: Router = express.Router();
  private teacherController: TeacherController = new TeacherController();

  constructor() {
    this.configRoutes();
  }

  private configRoutes = (): void => {
    this.router.post("/", this.teacherController.saveTeacher);
    this.router.get(
      "/current/:username",
      this.teacherController.getTeacherByUsername
    );
  };

  public getRouter = (): Router => {
    return this.router;
  };
}
