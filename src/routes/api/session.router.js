import { Router } from "express";

const routerSession = Router();

const setSession = (req, res, next) =>{
    try {
        req.session.email = "adm@example.com";
        req.session.role = "ADMIN";
        const message = "Session guardada";
        res.status(200).json({ message });
    } catch (error) {
        next(error)
    }
}

const readSession = (req, res, next) => {
    try {
        const data = req.session;
        const message = "Session leida";
        res.status(200).json({ message, data});
    } catch (error) {
        next(error);
    }
}

const clearSession = (req, res, data) =>{
    try {
        req.session.destroy();
        const message = "Session eliminada";
        res.status(200).json({ message });
    } catch (error) {
        next(error);
    }
}

routerSession.get("/set", setSession);
routerSession.get("/read", readSession);
routerSession.get("/clear" , clearSession);

export default routerSession;