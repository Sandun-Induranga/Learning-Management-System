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
        callback(
          null,
          "/media/sandu/0559F5C021740317/GDSE/Project_Zone/VS_Projects/Learning-Management-System/frontend/src/assets/uploads/student_images"
        );
      },

      filename: function (req, file, callback) {
        callback(null, file.originalname);
      },
    });
    const upload = multer({ storage: storage });

    this.router.post("/", this.studentController.saveStudent);
    this.router.put(
      "/image/:id",
      upload.single("files"),
      this.studentController.saveStudentImage
    );
  };

  public getRouter = (): Router => {
    return this.router;
  };
}
