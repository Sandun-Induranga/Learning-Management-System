import { Router } from "express";
import BatchRoutes from "./BatchRoutes";

const router: Router = Router();

const url_prefix = "/api/v1/";

router.use(`${url_prefix}batch`, new BatchRoutes().getRouter());

export default router;
