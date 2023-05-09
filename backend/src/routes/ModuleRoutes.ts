import express, { Router } from "express";
import ModuleController from "../controllers/ModuleController";

export default class ModuleRoutes {
  private router: Router = express.Router();
  private moduleController: ModuleController = new ModuleController();

  constructor() {
    this.configRoutes();
  }

  private configRoutes = (): void => {
    this.router.post("/", this.moduleController.saveModule);
    this.router.get("/", this.moduleController.getAllModules);
    this.router.put("/:id", this.moduleController.updateModule);
    this.router.delete("/:id", this.moduleController.deleteModule);
  };

  public getRouter = (): Router => {
    return this.router;
  };
}
