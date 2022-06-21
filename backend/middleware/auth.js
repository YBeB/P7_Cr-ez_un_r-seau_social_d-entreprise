const jwt = require('jsonwebtoken')
//Permet d'attribué un Token
module.exports = (req, res, next) => {
    try {
        const token = req.headers.authorization.split(' ')[1]
        const decodedToken = jwt.verify(token, `${process.env.RND_TKN}`)
        const userId = decodedToken.userId;
        const admin=decodedToken.isAdmin;
        req.auth={id:userId,admin:admin};
        if (req.body.userId && req.body.userId !== userId) {
            throw 'User ID non valable !'
        } else {
            next()
        }
    } catch (error) {
        res.status(401).json({ error: error | 'Requête non-authentifiée !' })
    }
}