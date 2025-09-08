import { Router } from "express";
import routerUser from "./api/user.router.js";
import routerMascotas from "./api/mascotas.router.js";

const apiRouter = Router();

apiRouter.use("/users", routerUser);
apiRouter.use("/mascotas", routerMascotas);

export default apiRouter;