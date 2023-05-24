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
    this.router.get("/", this.resultController.getAllResults);
    this.router.get(
      "/:studentId",
      this.resultController.getAllResultsByStudentId
    );
    this.router.get("/nic/:nic", this.resultController.getAllResultsByNic);
  };

  public getRouter = (): Router => {
    return this.router;
  };
}
