import { signedCookies } from "cookie-parser";
import { Router } from "express";
const routerCookies = Router();

const setCookie = (req, res, next) =>{
    try {
        const maxAge = 1000 * 60 * 60 * 24 * 7;
        const message = "Cookie seteada";
        res.status(200)
        .cookie("modo", "oscuro", { maxAge })
        .cookie("user_id", "1234", { maxAge , signed: true})
        .json({ message });
    } catch (error) {
        next(error);
    }
};

const readCookie = (req, res, next) => {
    try {
        const cookie = req.cookies.modo;
        const signedCookie = req.signedCookies.user_id;
        const message = "Cookie leidas";
        res.status(200).json({ cookie, signedCookie, message});
    } catch (error) {
        next(error)
    }
}

const clearCookie = (req, res, next) => {
    try {
        const message = "Cookie eliminadas";
        res.status(200).clearCookie("modo").clearCookie("user_id").json({ message })
    } catch (error) {
        next(error)
    }
}

routerCookies.get("/set", setCookie);
routerCookies.get("/read", readCookie);
routerCookies.get("/clear", clearCookie);

export default routerCookies;