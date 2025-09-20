import { Router } from "express";
import routerUser from "./api/user.router.js";
import routerMascotas from "./api/mascotas.router.js";
import routerTurnos from "./api/turnos.router.js";
import routerCookies from "./api/cookies.router.js";
import routerSession from "./api/session.router.js";

const apiRouter = Router();

apiRouter.use("/sessions", routerSession)
apiRouter.use("/cookies", routerCookies)
apiRouter.use("/users", routerUser);
apiRouter.use("/mascotas", routerMascotas);
apiRouter.use("/turnos", routerTurnos);

export default apiRouter;