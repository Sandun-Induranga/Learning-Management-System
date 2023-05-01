import { Router } from "express";
import BatchRoutes from "./BatchRoutes";
import StudentRoutes from "./StudentRoutes";

const router: Router = Router();

const url_prefix = "/api/v1/";

router.use(`${url_prefix}batch`, new BatchRoutes().getRouter());
router.use(`${url_prefix}student`, new StudentRoutes().getRouter());

export default router;
