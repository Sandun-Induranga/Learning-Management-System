import express, { Router } from "express";
import BatchController from "../controllers/BatchController";

export default class BatchRoutes {
  private router: Router = express.Router();
  private batchController: BatchController = new BatchController();

  constructor() {
    this.configRoutes();
  }

  private configRoutes = (): void => {
    this.router.post("/", this.batchController.saveBatch);
    this.router.get("/", this.batchController.getAllBatches);
    this.router.get("/:id", this.batchController.findBatchById);
    this.router.put("/:id", this.batchController.updateBatch);
    this.router.delete("/:id", this.batchController.deleteBatch);
  };

  public getRouter = (): Router => {
    return this.router;
  };
}
