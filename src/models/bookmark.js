const mongoose = require("mongoose");
const autoIncrement = require("mongoose-sequence")(mongoose);
const bookmarkschema = new mongoose.Schema({
    bookmark_target: {
        type: String,
        required: true,
    },

    boardId: {
        type: Number,
        required: true,
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

relationschema.plugin(autoIncrement, {
    inc_field: "boardId",
  });

const Bookmarks = mongoose.model("Bookmark", bookmarkschema);
module.exports = { Bookmarks, bookmarkschema }