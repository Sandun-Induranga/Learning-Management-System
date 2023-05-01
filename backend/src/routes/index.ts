import { Router } from "express";
import CourseRoutes from "./CourseRoutes";

const router: Router = Router();

const url_prefix = "/api/v1/";

router.use(`${url_prefix}course`, new CourseRoutes().getRouter());

export default router;
