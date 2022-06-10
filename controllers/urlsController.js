import connection from "./../db.js";
import { nanoid } from "nanoid";

export async function postarUrl(req,res){
    const {url} = req.body;
    const {user} = res.locals;

    let shortUrl = nanoid(8);
    
    await connection.query(`INSERT INTO urls (url,"shortUrl","userId") VALUES ($1,$2,$3)`,[url, shortUrl ,user]);

    res.status(201).send(shortUrl);
}