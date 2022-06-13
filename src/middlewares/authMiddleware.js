require("dotenv").config();
const jwt = require("jsonwebtoken");
const { Users } = require("../models/");

module.exports = (req, res, next) => {
    const { authorization } = req.headers;
    
    if (authorization === null) {
        res.status(401).send({
            errorMessage: "로그인 후 이용해주세요"
        });
        return;
    };
    
    const [tokenType, tokenValue] = authorization.split(' ');
    
    if (tokenType !== 'Bearer') {
        res.status(401).send({
            errorMessage: "로그인 후 이용해주세요"
        });
        return;
    };
    
    try {
        const myToken = verifyToken(tokenValue);
        if (myToken == "jwt expired") {
            const userInfo = jwt.decode(tokenValue, process.env.NODE_JWT);
            console.log(userInfo);
            const nickname = userInfo.nickname;
            let refreshToken;
            Users.findOne({ where: nickname }).then((u) => {
                refreshToken = u.refreshToken;
                const myRefreshToken = verifyToken(refreshToken);
                if (myRefreshToken == "jwt expired") {
                    res.send({
                        errorMessage: "로그인 후 이용해주세요."
                    });
                } else {
                    const myNewToken = jwt.sign({ nickname: u.nickname }, process.env.NODE_JWT, { expiresIn: "1m" });
                    res.send({
                        massage: "new token", myNewToken
                    });
                }
            });
        } else {
            const { nickname } = jwt.verify(tokenValue, process.env.NODE_JWT);
            Users.findOne({ nickname }).exec().then((user) => {
                res.locals.user = user;
                next();
            });
        }
    } catch (error) {
        res.status(401).send({
            errorMessage: error
        });
        return;
    }
};
function verifyToken(token) {
    try {
        return jwt.verify(token, process.env.NODE_JWT);

    } catch (error) {
        return error.message;
    };
};