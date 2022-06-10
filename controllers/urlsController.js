import connection from "./../db.js";
import { nanoid } from "nanoid";

export async function postarUrl(req, res) {
    const { url } = req.body;
    const { user } = res.locals;

    let shortUrl = nanoid(8);

    await connection.query(`INSERT INTO urls (url,"shortUrl","userId") VALUES ($1,$2,$3)`, [url, shortUrl, user]);

    res.status(201).send(shortUrl);
}

export async function buscarUrl(req, res) {
    const id = req.params.id;

    const urls = await connection.query(`SELECT urls.id,urls."shortUrl", urls.url FROM urls WHERE id = $1`, [id])
    if (!urls.rows[0]) return res.sendStatus(404)

    res.send(urls.rows)
}

export async function redirecionar(req, res) {
    const { shortUrl } = req.params;

    const url = await connection.query(`SELECT * FROM urls WHERE "shortUrl" = $1`, [shortUrl])

    if (!url.rows[0]) return res.sendStatus(404)

    await connection.query(`UPDATE urls SET "visitCount" = $1 WHERE id = $2`, [url.rows[0].visitCount + 1, url.rows[0].id])
    res.redirect(url.rows[0].url)
}

export async function deletarUrl(req, res) {
    const { id } = req.params;
    const { user } = res.locals;

    const checarUrl = await connection.query(`SELECT * FROM urls WHERE id = $1`, [id])
    if (!checarUrl.rows[0]) return res.sendStatus(404)
    if (checarUrl.rows[0].userId !== user) return res.sendStatus(401)


    await connection.query(`DELETE FROM urls WHERE id = $1`, [id])
    res.sendStatus(204)
}
