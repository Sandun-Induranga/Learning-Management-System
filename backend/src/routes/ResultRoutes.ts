import express, { Router } from "express";
import ResultController from "../controllers/ResultController";

export default class ResultRoutes {
  private router: Router = express.Router();
  private resultController: ResultController = new ResultController();

  constructor() {
    this.configRoutes();
  }

  private configRoutes = (): void => {
    this.router.post("/", this.resultController.saveResult);
    this.router.get(
      "/:studentId/:type",
      this.resultController.getResultsByStudentIdAndType
    );
  };

  public getRouter = (): Router => {
    return this.router;
  };
}
