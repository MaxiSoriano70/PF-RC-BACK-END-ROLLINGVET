import User from "../models/users.model.js";
import Mascota from "../models/mascotas.model.js";
import Turno from "../models/turnos.model.js";

class Manager{
    constructor(model){
        this.model = model;
    }
    create = async (data) => await this.model.create(data);
    readAll = async (filter = {}) => await this.model.find(filter).lean();
    readBy = async (data) => await this.model.findOne(data).lean();
    readById = async (id) => await this.model.findById(id).lean();
    updateById = async (id, data) => await this.model.findByIdAndUpdate(id, data, { new: true });
    destroyById = async (id) => await this.model.findByIdAndDelete(id);
}

export default Manager;

const usersManager = new Manager(User);
const mascotasManager = new Manager(Mascota);
const turnosManager = new Manager(Turno);

export { usersManager, mascotasManager, turnosManager};