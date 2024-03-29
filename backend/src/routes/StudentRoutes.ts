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
          "/media/sandu/0559F5C021740317/GDSE/Project_Zone/VS_Projects/Learning-Management-System/frontend/public/uploads/student_images"
        );
      },

      filename: function (req, file, callback) {
        callback(null, file.originalname);
      },
    });
    const upload = multer({ storage: storage });

    this.router.post("/", this.studentController.saveStudent);
    this.router.get("/", this.studentController.getAllStudents);
    this.router.put("/:id", this.studentController.updateStudent);
    this.router.delete("/:id", this.studentController.deleteStudent);
    this.router.put(
      "/image/:id",
      upload.single("files"),
      this.studentController.saveStudentImage
    );
    this.router.get(
      "/current/:username",
      this.studentController.getStudentByUsername
    );
    this.router.get("/:batch", this.studentController.getStudentsByBatch);
  };

  public getRouter = (): Router => {
    return this.router;
  };
}
