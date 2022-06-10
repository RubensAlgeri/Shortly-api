import connection from "../db.js";

export async function buscarUsuario(req,res){
    const {user} = res.locals;
    const {id} = req.params;

    const buscar = await connection.query(`
    SELECT users.id,users.name, count(urls."visitCount") as "visitCount" 
    FROM users
    LEFT JOIN urls ON urls."userId" = users.id
    WHERE users.id = $1
    GROUP BY users.id`,[id])

    if(!buscar.rows[0]) return res.sendStatus(404)

    const urlsDoUsuario = await connection.query(`
    SELECT urls.id,urls."shortUrl",url 
    FROM urls
    WHERE "userId" = $1`,[id])

    const usuario = {...buscar.rows[0], shortenedUrls:urlsDoUsuario.rows}

    res.send(usuario)
}