import connection from "../db.js";

export async function ranquearUsuarios(req,res){
    
    const ranking = await connection.query(`
    SELECT users.id, users.name, COUNT(urls) AS "linksCount", COUNT(urls."visitCount") AS "visitCount" FROM users
    LEFT JOIN urls ON urls."userId" = users.id
    GROUP BY users.id
    ORDER BY "visitCount" DESC
    LIMIT 10`)

    res.send(ranking.rows)
}