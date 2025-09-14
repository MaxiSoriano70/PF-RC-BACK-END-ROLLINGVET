import { Schema, Types, model } from "mongoose";
import { ESTADO_TURNO } from "../../../emuns/estadosTurnos.enum.js";

const collection = "turnos";

const turnoSchema = new Schema({
    veterinario: {
        type: Types.ObjectId,
        ref: "users",
        required: true
    },
    mascota: {
        type: Types.ObjectId,
        ref: "mascotas",
        required: function () {
            return this.estado === ESTADO_TURNO.RESERVADO;
        }
    },
    fecha: {
        type: Date,
        required: true
    },
    hora: {
        type: String,
        required: true,
        validate: {
            validator: v => /^([01]\d|2[0-3]):(00|30)$/.test(v),
            message: props => `La hora debe estar en formato HH:mm y en intervalos de 30 minutos.`
        }
    },
    detalle: {
        type: String,
        minlength: 3,
        validate: {
            validator: v => !v || /^[A-Za-zÁÉÍÓÚáéíóúÑñ0-9\s.,]{3,}$/.test(v),
            message: props => `El detalle solo puede contener letras, espacios, números, puntos y comas.`
        }
    },
    estado: {
        type: String,
        enum: Object.values(ESTADO_TURNO),
        default: ESTADO_TURNO.DISPONIBLE
    }
});

const Turno = model(collection, turnoSchema);
export default Turno;