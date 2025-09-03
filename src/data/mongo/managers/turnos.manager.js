import Turno from "../models/turnos.model.js";

class TurnosManager {
    create = async (data) => await Turno.create(data);
    readAll = async () => await Turno.find(filter).lean();
    readById = async (id) => await Turno.findById(id).lean();
    updateById = async (id, data) => await Turno.findByIdAndUpdate(id, data, { new: true });
    destroyById = async (id) => await Turno.findByIdAndDelete(id);
}

const turnosManager = new TurnosManager();
export default turnosManager;