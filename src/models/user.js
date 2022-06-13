require("dotenv").config();
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const saltRounds = Number(process.env.SALT_KEY);

const UserSchema = new mongoose.Schema({
    // 유저 이메일 - 필수값, Pk설정
    useremail: {
        type: String,
        requirde: true,
        unique: true,
    },
    // 유저 닉네임 - 필수값, PK설정
    nickname: {
        type: String,
        requirde: true,
        unique: true,
    },
    // 패스워드 - 필수값
    password: {
        type: String,
        requirde: true,
    },
},
    {
        timestamps: true // 생성, 업데이트 시간 설정
    });

UserSchema.set("toJSON", {
    virtuals: true,
});

//비밀번호 암호화
UserSchema.pre("save", function (next) {
    const user = this;

    if (user.isModified("password")) {
        bcrypt.genSalt(saltRounds, function (err, salt) {
            if (err) return next(err);
            bcrypt.hash(user.password, salt, function (err, hashPassword) {
                if (err) return next(err);
                user.password = hashPassword;
                next();
            });
        });
    } else {
        next();
    }
});
const Users = mongoose.model("User", UserSchema);

module.exports = { Users, UserSchema };
