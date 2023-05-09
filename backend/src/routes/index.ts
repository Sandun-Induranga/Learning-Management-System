import { Router } from "express";
import BatchRoutes from "./BatchRoutes";
import StudentRoutes from "./StudentRoutes";
import AnnoucementRoutes from "./AnnouncementRoutes";
import UserRoutes from "./UserRoutes";
import TeacherRoutes from "./TeacherRoutes";

const router: Router = Router();

const url_prefix = "/api/v1/";

router.use(`${url_prefix}batch`, new BatchRoutes().getRouter());
router.use(`${url_prefix}student`, new StudentRoutes().getRouter());
router.use(`${url_prefix}announcement`, new AnnoucementRoutes().getRouter());
router.use(`${url_prefix}user`, new UserRoutes().getRouter());
router.use(`${url_prefix}teacher`, new TeacherRoutes().getRouter());

export default router;
