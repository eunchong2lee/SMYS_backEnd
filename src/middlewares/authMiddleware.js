require("dotenv").config();
const jwt = require("jsonwebtoken");
const {Users} = require("../models/");

module.exports = (req, res, next) => {
    try {
        const { authorization } = req.headers;
        const [tokenType, tokenValue] = authorization.split(' ');

        if (tokenType !== 'Bearer') {
            res.status(401).send({
                errorMessage: "로그인 후 이용해주세요"

            });
            return;
        }
        console.log(process.env.NODE_JWT);
        const { nickname } = jwt.verify(tokenValue, process.env.NODE_JWT)
        console.log({nickname});
        
        if(!nickname){
            res.status(401).send({
                errorMessage: "로그인 후 이용해주세요"

            });
            return;
        }
        console.log(1)
        Users.findOne({ nickname }).exec().then((user) => {
            res.locals.user = user;
            next();
        });


    } catch (error) {
        res.status(401).send({
            errorMessage: error.message

        });
        return;
    }


};