import { Router } from "express";

const routerUser = Router();

const createOne = (req, res, next) => {
    try {
        
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