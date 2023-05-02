import express, { Router } from "express";
import StudentController from "../controllers/StudentController";
import multer from "multer";

export default class StudentRoutes {
  private router: Router = express.Router();
  private studentController: StudentController = new StudentController();

  constructor() {
    this.configRoutes();
  }

  private configRoutes = (): void => {
    const storage = multer.diskStorage({
      destination: function (req, file, callback) {
        callback(null, __dirname);
      },
      // Sets file(s) to be saved in uploads folder in same directory
      filename: function (req, file, callback) {
        callback(null, file.originalname);
      },
      // Sets saved filename(s) to be original filename(s)
    });
    const upload = multer({ storage: storage });

    this.router.post(
      "/image",
      upload.array("files"),
      this.studentController.saveStudentImage
    );
  };

  public getRouter = (): Router => {
    return this.router;
  };
}
