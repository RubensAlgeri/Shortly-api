import connection from "./../db.js";

export async function validaToken(req, res, next) {
    const { authorization } = req.headers;
    const token = authorization?.replace("Bearer", "").trim();
    
    if (!token) return res.status(401).send("No token."); // unauthorized

    try {
        const session = await connection.query(`SELECT * FROM sessions WHERE token = $1`,[token]);
        if (!session.rows[0]) return res.status(401).send("No session."); // unauthorized

        res.locals.user = session.rows[0].userId;

        next();
    } catch (error) {
        console.log("token", error);
        res.status(500).send("Error checking token.");
    }
}