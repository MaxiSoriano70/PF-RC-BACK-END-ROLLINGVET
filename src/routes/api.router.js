import { Router } from "express";
import routerUser from "./api/user.router.js";

const apiRouter = Router();

apiRouter.use("/users", routerUser);

export default apiRouter;