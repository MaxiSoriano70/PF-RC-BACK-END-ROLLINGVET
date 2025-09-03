import User from "../models/mascotas.model.js";

class MascotasManager {
    create = async (data) => await User.create(data);
    readAll = async () => await User.find(filter).lean();
    readById = async (id) => await User.findById(id).lean();
    updateById = async (id, data) => await User.findByIdAndUpdate(id, data, { new: true });
    destroyById = async (id) => await User.findByIdAndDelete(id);
}

const mascotasManager = new MascotasManager();
export default mascotasManager;