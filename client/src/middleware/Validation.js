const jwt = require('jsonwebtoken');

module.exports.generateAccessToken = (username) => {
    return jwt.sign({ username }, process.env.TOKEN_SECRET, { expiresIn: "1800s", })
}

module.exports.validateToken = (req, res, next) => {
    const authHeader = req.headers["authorization"];
    const token = authHeader && authHeader.split(" ")[1];

    if (token == null) return res.status(401).json("No Header found");

    jwt.verify(token, process.env.TOKEN_SECRET, (err, decoded) => {
        if (err) return res.sendStatus(403);
        req.tokenData = decoded;
        next();
    });

}