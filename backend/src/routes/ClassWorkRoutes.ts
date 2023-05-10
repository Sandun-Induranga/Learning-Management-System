import express, { Router } from "express";
import ClassWorkController from "../controllers/ClassWorkController";

export default class ClassWorkRoutes {
  private router: Router = express.Router();
  private classWorkController: ClassWorkController = new ClassWorkController();

  constructor() {
    this.configRoutes();
  }

  private configRoutes = (): void => {
    this.router.post("/", this.classWorkController.saveClassWork);
    this.router.get("/", this.classWorkController.getAllClassworks);
    this.router.get("/:batch", this.classWorkController.getClassWorksByBatch);
    this.router.put("/:id", this.classWorkController.updateClassWork);
  };

  public getRouter = (): Router => {
    return this.router;
  };
}
