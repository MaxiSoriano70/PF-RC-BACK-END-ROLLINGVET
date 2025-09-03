import { Schema, model } from "mongoose";
import { ESPECIES } from "../../../emuns/especies.enum.js";
import { SEXO } from "../../../emuns/sexo.enum.js";

const collection = "mascotas";

const mascotaSchema = new Schema({
    id: {
        type: String,
        required: true,
        unique: true,
        index: true
    },
    urlImagen: {
        type: String,
        default: "https://i.ibb.co/2kR9YQk/default-profile.png",
        validate: {
            validator: function (v) {
                // Debe terminar en .jpg, .jpeg, .png, .gif, .webp
                return /^https?:\/\/.*\.(jpg|jpeg|png|gif|webp)$/i.test(v);
            },
            message: props => `La URL de la imagen no es válida.`
        }
    },
    nombre: {
        type: String,
        required: true,
        minlength: 3,
        validate: {
            validator: function (v) {
                return /^[A-Za-zÁÉÍÓÚáéíóúÑñ\sIVXivx0-9.]{3,}$/.test(v);
            },
            message: props => `El nombre debe tener al menos 3 caracteres y solo puede contener letras, espacios, números romanos y números decimales.`
        }
    },
    fechaNacimiento: {
        type: Date,
        required: true,
        validate: {
            validator: function (v) {
                return v <= new Date();
            },
            message: props => `La fecha de nacimiento no puede ser mayor a la fecha actual.`
        }
    },
    especie: {
        type: String,
        enum: Object.values(ESPECIES),
        required: true
    },
    sexo: {
        type: String,
        enum: Object.values(SEXO),
        required: true
    },
    raza: {
        type: String,
        required: true,
        minlength: 3,
        validate: {
            validator: function (v) {
                return /^[A-Za-zÁÉÍÓÚáéíóúÑñ\s]{3,}$/.test(v);
            },
            message: props => `La raza debe tener al menos 3 letras y solo puede contener letras y espacios.`
        }
    },
    colorPelo: {
        type: String,
        required: true,
        minlength: 3,
        validate: {
            validator: function (v) {
                return /^[A-Za-zÁÉÍÓÚáéíóúÑñ\s]{3,}$/.test(v);
            },
            message: props => `El color de pelo debe tener al menos 3 letras y solo puede contener letras y espacios.`
        }
    },
    peso: {
        type: Number,
        required: true,
        min: [0.01, "El peso debe ser mayor a 0."]
    },
    esterilizado: {
        type: Boolean,
        required: true
    },
    domicilio: {
        type: String,
        required: true,
        minlength: 3,
        validate: {
            validator: function (v) {
                return /^[A-Za-zÁÉÍÓÚáéíóúÑñ\s]{3,}$/.test(v);
            },
            message: props => `El domicilio debe tener al menos 3 letras y solo puede contener letras y espacios.`
        }
    },
    observaciones: {
        type: String,
        minlength: 3,
        validate: {
            validator: function (v) {
                return !v || /^[A-Za-zÁÉÍÓÚáéíóúÑñ0-9\s.,]{3,}$/.test(v);
            },
            message: props => `Las observaciones deben tener al menos 3 caracteres y solo pueden contener letras, espacios, números, puntos y comas.`
        }
    },
    usuario: {
        type: String,
        required: true,
        ref: "users"
    }
});

const Mascota = model(collection, mascotaSchema);

export default Mascota;