import connection from "./../db.js";
import { nanoid } from "nanoid";

export async function postarUrl(req,res){
    const {url} = req.body;
    const {user} = res.locals;

    let shortUrl = nanoid(8);
    
    await connection.query(`INSERT INTO urls (url,"shortUrl","userId") VALUES ($1,$2,$3)`,[url, shortUrl ,user]);

    res.status(201).send(shortUrl);
}

export async function buscarUrl(req,res){
    const id = req.params.id;

    const urls = await connection.query(`SELECT urls.id,urls."shortUrl", urls.url FROM urls WHERE id = $1`,[id])
    if(!urls.rows[0]) return res.sendStatus(404)

    res.send(urls.rows)
}