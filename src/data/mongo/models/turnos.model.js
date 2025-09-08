import { Schema, Types, model } from "mongoose";
import { ESTADO_TURNO } from "../../../emuns/estadosTurnos.enum";

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
        required: true
    },
    fecha: {
        type: Date,
        required: true
    },
    hora: {
        type: String,
        required: true
    },
    detalle: {
        type: String,
        required: true,
        minlength: 3,
        validate: {
            validator: function (v) {
                return /^[A-Za-zÁÉÍÓÚáéíóúÑñ0-9\s.,]{3,}$/.test(v);
            },
            message: props => `El detalle debe tener al menos 3 caracteres y solo puede contener letras, espacios, números, puntos y comas.`
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