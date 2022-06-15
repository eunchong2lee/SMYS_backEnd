const mongoose = require("mongoose");

const bookmarkcntschema = new mongoose.Schema({
    targetId: {
        type: Number,
        required: true,
    },
    bookmarkCnt: {
        type: Number,
        required: true,
    },
},
    {
        timestamps: true
        // 즐겨찾기 누른 시간.
});

const BookmarkCnt = mongoose.model("bookmarkcnt", bookmarkcntschema);
module.exports = { BookmarkCnt, bookmarkcntschema }