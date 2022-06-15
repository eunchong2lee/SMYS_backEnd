const mongoose = require("mongoose");
const autoIncrement = require("mongoose-sequence")(mongoose);

const bookmarkschema = new mongoose.Schema({
    bookmarkId: {
        type: Number,
    },

    targetId: {
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

bookmarkschema.plugin(autoIncrement, {
    inc_field: "bookmarkId",
});

const Bookmark = mongoose.model("Bookmark", bookmarkschema);
module.exports = { Bookmark, bookmarkschema }