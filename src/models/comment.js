const mongoose = require("mongoose");
const autoIncrement = require("mongoose-sequence")(mongoose);
const commentschema = new mongoose.Schema({
    boardId: {
        type: Number,
        required: true,
    },
    nickname: {
        type: String,
        required: true,
    },
    comment: {
        type: String,
        required: true,
    },
    commentId: {
        type: Number,
    },
},
    {
        timestamps: true
    });
commentschema.plugin(autoIncrement, {
    inc_field: "commentId",
});

//title, user_id, password, content
const Comments = mongoose.model("comment", commentschema);
module.exports = { Comments, commentschema }