import Mascota from "../models/mascotas.model.js";

class MascotasManager {
    create = async (data) => await Mascota.create(data);
    readAll = async () => await Mascota.find(filter).lean();
    readById = async (id) => await Mascota.findById(id).lean();
    updateById = async (id, data) => await Mascota.findByIdAndUpdate(id, data, { new: true });
    destroyById = async (id) => await Mascota.findByIdAndDelete(id);
}

const mascotasManager = new MascotasManager();
export default mascotasManager;