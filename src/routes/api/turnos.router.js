import { Router } from 'express';
import { mascotasManager } from '../../data/mongo/managers/manager.mongo.js';
import turnosManager from '../../data/mongo/managers/turno/turno.manager.js';
import { ESTADO_TURNO } from '../../emuns/estadosTurnos.enum.js';

const routerTurnos = Router();

const createOne = async (req, res, next) => {
    try {
        const { veterinarioId, fechaInicio, fechaFin, horaInicio, horaFin, diasPermitidos } = req.body;

        if (!veterinarioId || !fechaInicio || !fechaFin || !horaInicio || !horaFin || !diasPermitidos) {
            const error = new Error("Datos incompletos para crear turnos");
            error.status = 400;
            throw error;
        }

        const generarHoras = (inicio, fin) => {
            const horas = [];
            let [h, m] = inicio.split(":").map(Number);
            let [hFin, mFin] = fin.split(":").map(Number);

            while (h < hFin || (h === hFin && m < mFin)) {
                horas.push(`${String(h).padStart(2, "0")}:${String(m).padStart(2, "0")}`);
                m += 30;
                if (m >= 60) {
                    h++;
                    m = 0;
                }
            }
            return horas;
        };

        const horas = generarHoras(horaInicio, horaFin);
        const turnos = [];

        const inicio = new Date(fechaInicio);
        const fin = new Date(fechaFin);

        for (let d = new Date(inicio); d <= fin; d.setDate(d.getDate() + 1)) {
            const diaSemana = d.getDay();
            if (!diasPermitidos.includes(diaSemana)) continue;

            horas.forEach(hora => {
                turnos.push({
                    veterinario: veterinarioId,
                    fecha: new Date(d),
                    hora,
                    estado: ESTADO_TURNO.DISPONIBLE
                });
            });
        }

        const response = await turnosManager.createMany(turnos);

        res.status(201).json({
            message: "Turnos creados correctamente",
            data: response
        });
    } catch (error) {
        next(error);
    }
};

const reservaTurno = async (req, res, next) => {
    try {
        const { uid } = req.params;
        const { mascotaId, detalle } = req.body;

        if (!mascotaId) {
            const error = new Error("Debe enviar el ID de la mascota");
            error.status = 400;
            throw error;
        }

        const mascota = await mascotasManager.readById(mascotaId);
        if (!mascota) {
            const error = new Error("La mascota indicada no existe");
            error.status = 404;
            throw error;
        }

        const turno = await turnosManager.readById(uid);
        if (!turno) {
            const error = new Error("Turno no encontrado");
            error.status = 404;
            throw error;
        }

        if (turno.estado !== ESTADO_TURNO.DISPONIBLE) {
            const error = new Error("El turno ya está reservado");
            error.status = 400;
            throw error;
        }

        const actualizado = await turnosManager.updateById(uid, {
            estado: ESTADO_TURNO.RESERVADO,
            mascota: mascotaId,
            detalle: detalle || ""
        });

        res.status(200).json({
            message: "Turno reservado correctamente",
            data: actualizado
        });
    } catch (error) {
        next(error);
    }
};

const cancelarTurno = async (req, res, next) => {
    try {
        const { uid } = req.params;

        const turno = await turnosManager.readById(uid);
        if (!turno) {
            const error = new Error("Turno no encontrado");
            error.status = 404;
            throw error;
        }

        if (turno.estado !== ESTADO_TURNO.RESERVADO) {
            const error = new Error("El turno no está reservado, no se puede cancelar");
            error.status = 400;
            throw error;
        }

        const actualizado = await turnosManager.updateById(uid, {
            estado: ESTADO_TURNO.DISPONIBLE,
            mascota: null,
            detalle: ""
        });

        res.status(200).json({
            message: "Turno cancelado correctamente",
            data: actualizado
        });
    } catch (error) {
        next(error);
    }
};


const getAll = async (req, res, next) => {
    try {
        const filter = req.query;
        const response =  await turnosManager.readAll(filter);
        if (response.length === 0) {
            const error = new Error("No turnos found");
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
        const response = await turnosManager.readById(uid);
        if (!response) {
            const error = new Error("Turno not found");
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
        const response = await turnosManager.updateById(uid, data);
        if (!response) {
            const error = new Error("Turno not found");
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
            const error = new Error("Turno not found");
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

routerTurnos.post("/", createOne);
routerTurnos.put("/reservar/:uid", reservaTurno);
routerTurnos.put("/cancelar/:uid", cancelarTurno);
routerTurnos.get("/", getAll);
routerTurnos.get("/:uid", getOneById);
routerTurnos.put("/:uid", updateOneById);
routerTurnos.delete("/:uid", deleteOneById);

export default routerTurnos;