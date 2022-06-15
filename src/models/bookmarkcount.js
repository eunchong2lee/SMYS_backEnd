const mongoose = require("mongoose");
const bookmarkcountschema = new mongoose.Schema({
    bookmartk_target: {
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

const BookmarkCounts = mongoose.model("bookmarkcount", bookmarkcountschema);
module.exports = { BookmarkCounts, bookmarkcountschema }