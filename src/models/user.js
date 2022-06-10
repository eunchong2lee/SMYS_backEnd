const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const saltRounds = Number(process.env.SALT_KEY);

const UserSchema = new mongoose.Schema({
    useremail: {
        type: String,
        requirde: true,
        unique: true,
    },
    nickname: {
        type: String,
        requirde: true,
        unique: true,
    },
    password: {
        type: String,
        requirde: true,
    },
},
    {
        timestamps: true

    });

UserSchema.set("toJSON", {
    virtuals: true,
});
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
