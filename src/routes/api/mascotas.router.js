import { Router } from 'express';

const routerMascotas = Router();

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

routerMascotas.post("/", createOne);
routerMascotas.get("/", getAll);
routerMascotas.get("/:id", getOneById);
routerMascotas.put("/:id", updateOneById);
routerMascotas.delete("/:id", deleteOneById);


export default routerMascotas;