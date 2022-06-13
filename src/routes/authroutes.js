require("dotenv").config();
const express = require("express");
const authRouter = express.Router();
const Joi = require("joi");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

const { Users, Boards, Bookmarks } = require("../models/");
const authMiddleware = require("../middlewares/authMiddleware");


// const userSchema = Joi.object({
//     useremail: Joi.string().email().required(), // email 타입
//     nickname: Joi.string().alphanum().min(3).max(30).required(), // 닉네임은 영문숫자 조합으로 최소 3자에서 30자까지
//     password: Joi.string().pattern(new RegExp('^[a-zA-Z0-9]{4,30}$')).required(), // 비밀번호는 대소문자숫자를 4~30자로 구성
//     checkpassword: Joi.string().pattern(new RegExp('^[a-zA-Z0-9]{4,30}$')).required(),
// });


// 회원가입 joi
// authRouter.post("/user/signup", async (req, res) => {
//     try {
//         // const { useremail, nickname, password, checkpassword } = await userSchema.validateAsync(req.body);
//         console.log(req.body);
//         if (password !== checkpassword) {
//             res.status(400).send({
//                 errorMessage: "패스워드가 일치 하지 않습니다.",
//             });
//             return;
//         }

//         const exisUsers = await Users.find({ nickname, useremail });
//         if (exisUsers.length) {
//             res.status(400).send({
//                 errorMessage: " 이미 가입된 이메일 또는 닉네임  입니다.",
//             });
//             return
//         }

//         if (nickname === password){
//             res.status(400).send({
//                 errorMessage: " 닉네임과 비밀번호는 같을 수 없습니다.",
//             });
//             return
//         };

//         const user = new Users({ useremail, nickname, password });
//         await user.save();

//         res.status(201).send({});
//     } catch (err) {
//         console.log(err);
//         res.status(400).send({
//             errorMessage: "요청한 데이터 형식이 올바르지 않습니다.",
//         });
//     }
// });

// 회원가입 정규식
authRouter.post("/user/signup", async (req, res) => {
    // #swagger.tags = ["Auth"]
    // #swagger.summary = "회원가입 페이지"
    // #swagger.description = "회원가입 페이지"
    const { useremail, nickname, password, checkpassword } = req.body;
    const regExpUesereamil = /^([\w\.\_\-])*[a-zA-Z0-9]+([\w\.\_\-])*([a-zA-Z0-9])+([\w\.\_\-])+@([a-zA-Z0-9]+\.)+[a-zA-Z0-9]{2,8}$/;
    try {
        // 이메일 형식 확인
        if (!regExpUesereamil.test(useremail)) {
            res.status(400).send({
                errorMessage: "이메일의 형식을 확인해주세요.",
            });
            return;
        };

        // 닉네임 확인
        const regExp_nickname = /^(?=.*\d)(?=.*[a-zA-Z])[a-zA-Z0-9]{3,20}$/;
        if (!regExp_nickname.test(nickname)) {
            res.status(400).send({
                errorMessage: "닉네임의 형식을 확인해주세요.",
            });
            return;
        };

        const exisUsers = await Users.find({ nickname, useremail });
        if (exisUsers.length) {
            res.status(400).send({
                errorMessage: " 이미 가입된 이메일 또는 닉네임  입니다.",
            });
            return
        }

        // 비밀번호 형식 확인
        const regExpPassword = /^(?=.*\d)(?=.*[a-zA-Z])[0-9a-zA-Z!@#$%^&*]{4,20}$/;
        if (!regExpPassword.test(password)) {
            res.status(400).send({
                errorMessage: "비밀번호의 형식을 확인해주세요. 영문과 숫자 필수 포함, 특수문자(!@#$%^&*) 사용 가능 4-20자",
            });
            return;
        };

        // 비밀번호 일치 하는지 확인
        if (password !== checkpassword) {
            res.status(400).send({
                errorMessage: "패스워드가 일치 하지 않습니다.",
            });
            return;
        };

        // 닉네임이랑 비밀번호 같은지 확인
        if (password.match(nickname)) {
            res.status(400).send({
                errorMessage: "비밀번호에 닉네임을 포함할 수 없습니다.",
            });
            return;
        };

        const user = new Users({ useremail, nickname, password });
        await user.save();

        res.status(201).send({
            message: "회원가입을 축하합니다"
        });

    } catch {
        console.log(err);
        res.status(400).send({
            errorMessage: "요청한 데이터 형식이 올바르지 않습니다.",
        });
    }
});

// 로그인
// const authSchema = Joi.object({
//     useremail: Joi.string().email().required(),
//     password: Joi.string().pattern(new RegExp('^[a-zA-Z0-9]{4,30}$')).required(),
// });
authRouter.post("/user/signin", async (req, res) => {
    try {
        // #swagger.tags = ["Auth"]
        // #swagger.summary = "로그인 페이지"
        // #swagger.description = "로그인 페이지"
        // const { useremail, password } = await authSchema.validateAsync(req.body);
        const { useremail, password } = req.body;
        const user = await Users.findOne({ useremail }).exec();
        const isSamePassword = await bcrypt.compare(password, user.password);

        if (!isSamePassword) {
            res.status(400).send({
                errorMessage: " 이메일 또는 비밀번호가 잘못됐습니다."
            });
            return;
        }

        const token = jwt.sign({ nickname: user.nickname }, process.env.NODE_JWT, {
            expiresIn: "1h",
        });
        const refreshToken = jwt.sign({}, process.env.NODE_JWT, {
            expiresIn: "14d",
        });
        await user.update(
            { refreshToken },
            { where: { nickname: user.nickname } }
        );
        res.send({
            token,
        });
    } catch (err) {
        console.log(err);
        res.status(400).send({
            errorMessage: "요청한 데이터 형식이 올바르지 않습니다.",
        });
    }
});

//마이페이지
authRouter.get("/user/mypage", authMiddleware, async (req, res) => {
    // #swagger.tags = ["Auth"]
    // #swagger.summary = "마이페이지"
    // #swagger.description = "마이페이지"
    try {
        const user = res.locals.user;
        const myboard = await Boards.find({ nickname: user.nickname });
        const mybookmark = await Bookmarks.find({ nickname: user.nickname });
        res.json({ myboard, mybookmark });

    } catch(err) {
        return res.status(400).json({ err: err.message });
    }
});

authRouter.get("/user/signin/me", authMiddleware, async (req, res) => {
    // #swagger.tags = ["Auth"]
    // #swagger.summary = "유저 토큰 확인 페이지"
    // #swagger.description = "유저 토큰 확인 페이지"
    const { user } = res.locals;
    res.send({
        user: {
            nickname: user.nickname
        },
    });
});

module.exports = { authRouter };