import { Router } from 'express';
import mascotasManager from '../../data/mongo/managers/mascotas.manager.js';

const routerMascotas = Router();

const createOne = async (req, res, next) => {
    try {
        const data = req.body;
        const response = await mascotasManager.create(data);
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
        const response = await mascotasManager.readAll(filter);
        if (response.length === 0) {
            const error = new Error("No mascotas found");
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
        const response = await mascotasManager.readById(uid);
        if (!response) {
            const error = new Error("Mascota not found");
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
        const response = await mascotasManager.updateById(uid, data);
        if (!response) {
            const error = new Error("Mascota not found");
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
        const response = await mascotasManager.destroyById(uid);
        if (!response) {
            const error = new Error("Mascota not found");
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

routerMascotas.post("/", createOne);
routerMascotas.get("/", getAll);
routerMascotas.get("/:uid", getOneById);
routerMascotas.put("/:uid", updateOneById);
routerMascotas.delete("/:uid", deleteOneById);


export default routerMascotas;