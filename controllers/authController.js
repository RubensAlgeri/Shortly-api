import bcrypt from 'bcrypt';
import { v4 as uuid } from 'uuid';
import connection from "../db.js";
import { stripHtml } from "string-strip-html"
import dotenv from "dotenv"
dotenv.config()

export async function signUp(req, res) {
    const { password, confirmPassword } = req.body;
    const name = stripHtml(req.body.name).result.trim();
    const email = stripHtml(req.body.email).result.trim();
    const passwordHash = bcrypt.hashSync(password, parseInt(process.env.HASH));

    try {

        await connection.query(`
        INSERT INTO users (name,email,password)
        VALUES ($1,$2,$3)`, [name, email, passwordHash])

        res.sendStatus(201);
    } catch (err) {
        res.status(409).send("já existe uma conta com este email!")
    }

}

export async function signIn(req, res) {
    const email = stripHtml(req.body.email).result.trim();
    const { password } = req.body;

    const user = await connection.query(`
    SELECT * FROM users WHERE email = $1`, [email]);

    if (user && bcrypt.compareSync(password, user.rows[0].password)) {

        const token = uuid();
        await connection.query(`
        INSERT INTO sessions (token,"userId") VALUES ($1,$2)`, [token, user.rows[0].id]);
        res.status(201).send(token);

    } else {
        res.sendStatus(401);
    }
}