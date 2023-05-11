import express, { Router } from "express";
import ClassWorkController from "../controllers/ClassWorkController";
import multer from "multer";

export default class ClassWorkRoutes {
  private router: Router = express.Router();
  private classWorkController: ClassWorkController = new ClassWorkController();

  constructor() {
    this.configRoutes();
  }

  private configRoutes = (): void => {
    const storage = multer.diskStorage({
      destination: function (req, file, callback) {
        callback(
          null,
          "/media/sandu/0559F5C021740317/GDSE/Project_Zone/VS_Projects/Learning-Management-System/frontend/public/uploads/classWorks"
        );
      },

      filename: function (req, file, callback) {
        callback(null, file.originalname);
      },
    });
    const upload = multer({ storage: storage });

    this.router.post("/", this.classWorkController.saveClassWork);
    this.router.get("/", this.classWorkController.getAllClassworks);
    this.router.get("/:batch", this.classWorkController.getClassWorksByBatch);
    this.router.put("/:id", this.classWorkController.updateClassWork);
    this.router.put(
      "/image/:id",
      upload.single("files"),
      this.classWorkController.saveClassWorkImage
    );
  };

  public getRouter = (): Router => {
    return this.router;
  };
}
