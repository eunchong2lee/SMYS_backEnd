const mongoose = require("mongoose");
const bookmarkcntschema = new mongoose.Schema({
    bookmark_target: {
        type: String,
        required: true,
    },
    bookmarkId: {
        type: Number,
        required: true,
    },
    bookmarkcount: {
        type: Number,
        required: true,
    },
},
    {
        timestamps: true
        // 즐겨찾기 누른 시간.
});

const BookmarkCnt = mongoose.model("bookmarkcnt", bookmarkcountschema);
module.exports = { BookmarkCnt, bookmarkcntschema }