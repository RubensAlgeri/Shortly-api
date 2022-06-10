import userSchema from "../schemas/authSchema.js";

export function validaUsuario(req, res, next) {
const validation = userSchema.validate(req.body);
if (validation.error) {
    return res.status(422).send(validation.error.details.map(details=>details.message));
}
next()
}