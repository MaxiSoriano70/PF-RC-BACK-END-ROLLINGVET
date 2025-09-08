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

const getAll = async (req, res, next) => {
    try {
        const filter = req.query;
        const response = await usersManager.readAll(filter);
        if (response.length === 0) {
            const error = new Error("No users found");
            error.status = 404;
            throw error;
        };
        res.status(200).json({
            data: response,
            method: req.method,
            url: req.url
        });
    } catch (error) {
        next(error);
    }
};

const getOneById = async (req, res, next) => {
    try {
        const { uid } = req.params;
        const response = await usersManager.readById(uid);
        if (!response) {
            const error = new Error("User not found");
            error.status = 404;
            throw error;
        };
        res.status(200).json({
            data: response,
            method: req.method,
            url: req.url
        });
    } catch (error) {
        next(error);
    }
};

const updateOneById = async (req, res, next) => {
    try {
        const { uid } = req.params;
        const data = req.body;
        const response = await usersManager.updateById(uid, data);
        if (!response) {
            const error = new Error("User not found");
            error.status = 404;
            throw error;
        };
        res.status(200).json({
            data: response,
            method: req.method,
            url: req.url
        });
    } catch (error) {
        next(error);
    }
};

const deleteOneById = async (req, res, next) => {
    try {
        const { uid } = req.params;
        const response = await usersManager.destroyById(uid);
        if (!response) {
            const error = new Error("User not found");
            error.status = 404;
            throw error;
        };
        res.status(200).json({
            data: response,
            method: req.method,
            url: req.url
        });
    } catch (error) {
        next(error);
    }
};

routerUser.post("/", createOne);
routerUser.get("/", getAll);
routerUser.get("/:uid", getOneById);
routerUser.put("/:uid", updateOneById);
routerUser.delete("/:uid", deleteOneById);

export default routerUser;