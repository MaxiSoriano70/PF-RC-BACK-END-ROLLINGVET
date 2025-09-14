import Turno from "../../models/turnos.model.js";
import Manager from "../manager.mongo.js";

class TurnosManager extends Manager{
    constructor(){
        super(Turno);
    }

    createMany = async (dataArray) => await this.model.insertMany(dataArray);
}

const turnosManager = new TurnosManager();
export default turnosManager;