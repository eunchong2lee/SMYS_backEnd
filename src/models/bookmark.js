const mongoose = require("mongoose");
const bookmarkschema = new mongoose.Schema({
    boardId: {
        type: Number,
        required: true,
    },
    nickname: {
        type: String,
        required: true,
    },
    bookmark: {
        type: Boolean,
        required: true,
    },
},
    {
        timestamps: true
        // 즐겨찾기 누른 시간.
});

//주석처리
const Bookmarks = mongoose.model("Bookmark", bookmarkschema);
module.exports = { Bookmarks, bookmarkschema }