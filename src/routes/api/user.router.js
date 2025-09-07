import { Router } from "express";
import usersManager from "../../data/mongo/managers/users.manager.js";

const routerUser = Router();

const createOne = async (req, res, next) => {
    try {
        const data = req.body;
        const response = await usersManager.create(data);
        res.status(201).json({
            data: response,
            method: req.method,
            url: req.url
        });
    } catch (error) {
        next(error);
    }
};
const getAll = (req, res, next) => {
    try {
        
    } catch (error) {
        next(error);
    }
};
const getOneById = (req, res, next) => {
    try {
        
    } catch (error) {
        next(error);
    }
};
const updateOneById = (req, res, next) => {
    try {
        
    } catch (error) {
        next(error);
    }
};
const deleteOneById = (req, res, next) => {
    try {
        
    } catch (error) {
        next(error);
    }
};

routerUser.post("/", createOne);
routerUser.get("/", getAll);
routerUser.get("/:id", getOneById);
routerUser.put("/:id", updateOneById);
routerUser.delete("/:id", deleteOneById);

export default routerUser;