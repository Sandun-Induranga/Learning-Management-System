import express, { Router } from "express";
import AnswerController from "../controllers/AnswerController";
import multer from "multer";

export default class AnswerRoutes {
  private router: Router = express.Router();
  private answerController: AnswerController = new AnswerController();

  constructor() {
    this.configRoutes();
  }

  private configRoutes = (): void => {
    const storage = multer.diskStorage({
      destination: function (req, file, callback) {
        callback(
          null,
          "/media/sandu/0559F5C021740317/GDSE/Project_Zone/VS_Projects/Learning-Management-System/frontend/public/uploads/answers"
        );
      },

      filename: function (req, file, callback) {
        callback(null, file.originalname);
      },
    });
    const upload = multer({ storage: storage });

    this.router.post("/", this.answerController.saveAnswer);
    this.router.put(
      "/image/:id",
      upload.single("files"),
      this.answerController.saveAnswerFile
    );
  };

  public getRouter = (): Router => {
    return this.router;
  };
}
