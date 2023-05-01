import express, { Router } from "express";
import StudentController from "../controllers/StudentController";

export default class StudentRoutes {
  private router: Router = express.Router();
  private studentController: StudentController = new StudentController();

  constructor() {
    this.configRoutes();
  }

  private configRoutes = (): void => {
    this.router.post("/", this.studentController.saveStudent);
  };

  public getRouter = (): Router => {
    return this.router;
  };
}
