require("dotenv").config();
const express = require("express");
const authRouter = express.Router();
const Joi = require("joi");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

const {Users, Board} = require("../models/");
const authMiddleware = require("../middlewares/authMiddleware");


const userSchema = Joi.object({
    useremail: Joi.string().email().required(), // email 타입
    nickname: Joi.string().alphanum().min(3).max(30).required(), // 닉네임은 영문숫자 조합으로 최소 3자에서 30자까지
    password: Joi.string().pattern(new RegExp('^[a-zA-Z0-9]{4,30}$')).required(), // 비밀번호는 대소문자숫자를 4~30자로 구성
    checkpassword: Joi.string().pattern(new RegExp('^[a-zA-Z0-9]{4,30}$')).required(),
});


// 회원가입
authRouter.post("/user/signup", async (req, res) => {
    try {
        const { useremail, nickname, password, checkpassword } = await userSchema.validateAsync(req.body);

        if (password !== checkpassword) {
            res.status(400).send({
                errorMessage: "패스워드가 일치 하지 않습니다.",
            });
            return;
        }

        const exisUsers = await Users.find({ nickname, useremail });
        if (exisUsers.length) {
            res.status(400).send({
                errorMessage: " 이미 가입된 이메일 또는 닉네임  입니다.",
            });
            return
        }

        if (nickname === password){
            res.status(400).send({
                errorMessage: " 닉네임과 비밀번호는 같을 수 없습니다.",
            });
            return
        };

        const user = new Users({ useremail, nickname, password });
        await user.save();

        res.status(201).send({});
    } catch (err) {
        console.log(err);
        res.status(400).send({
            errorMessage: "요청한 데이터 형식이 올바르지 않습니다.",
        });
    }
});


// 로그인
const authSchema = Joi.object({
    useremail: Joi.string().email().required(),
    password: Joi.string().pattern(new RegExp('^[a-zA-Z0-9]{4,30}$')).required(),
});
authRouter.post("/user/signin", async (req, res) => {
    try {
        const { useremail, password } = await authSchema.validateAsync(req.body);
        
        const user = await Users.findOne({ useremail }).exec();
        const isSamePassword = await bcrypt.compare(password, user.password);

        if (!isSamePassword) {
                res.status(400).send({
                    errorMessage: " 이메일 또는 비밀번호가 잘못됐습니다."
                });
                return;
        }

        const token = jwt.sign({ useremail: user.useremail }, process.env.NODE_JWT);
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
// authRouter.get("/user/nickname", async (req, res) => {

//     try {
//         const { nickname } = req.params;
//         const board = await Board.find({ id });

//     } catch(err) {
//         return res.status(400).json({ err: err.message });
//     }
// });

authRouter.get("/signin/me", authMiddleware, async (req, res) => {
    const { user } = res.locals;
    res.send({
        user: {
            useremail: user.useremail
        },
    });
});

module.exports = {authRouter};