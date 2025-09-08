import User from "../models/users.model.js";

class UsersManager {
    create = async (data) => await User.create(data);
    readAll = async (filter = {}) => await User.find(filter).lean();
    readById = async (id) => await User.findById(id).lean();
    updateById = async (id, data) => await User.findByIdAndUpdate(id, data, { new: true });
    destroyById = async (id) => await User.findByIdAndDelete(id);
}

const usersManager = new UsersManager();
export default usersManager;