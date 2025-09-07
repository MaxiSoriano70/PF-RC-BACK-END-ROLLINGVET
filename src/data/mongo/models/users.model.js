import { Schema, model } from "mongoose";
import { USER_ROLES } from "../../../emuns/userRoles.emun.js";

const collection = "users";

const userSchema = new Schema({
    email: {
        type: String,
        required: true,
        unique: true,
        match: [
            /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/,
            "El email no tiene un formato válido."
        ]
    },
    password: {
        type: String,
        required: true,
        minlength: 6,
        validate: {
            validator: function (v) {
                return /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{6,}$/.test(v);
            },
            message: props => `La contraseña no cumple con los requisitos de seguridad.`
        }
    },
    role: {
        type: String,
        enum: Object.values(USER_ROLES),
        default: USER_ROLES.USER
    },
    telefono: {
        type: String,
        required: true,
        minlength: 8,
        maxlength: 15,
        validate: {
            validator: function (v) {
                return /^\+?[0-9]{8,15}$/.test(v);
            },
            message: props => `El teléfono ${props.value} no es válido.`
        }
    },
    fotoPerfil: {
        type: String,
        default: "https://i.ibb.co/2kR9YQk/default-profile.png",
        validate: {
            validator: function (v) {
                return /^https?:\/\/.*\.(jpg|jpeg|png|gif|webp)$/i.test(v);
            },
            message: props => `La URL de la imagen no es válida.`
        }
    }
});

const User = model(collection, userSchema);

export default User;