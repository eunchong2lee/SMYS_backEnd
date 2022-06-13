const mongoose = require("mongoose");
const likecountschema = new mongoose.Schema({
    relation_target: {
        type: String,
        required: true,
    },
    targetId: {
        type: Number,
        required: true,
    },
    relationcount: {
        type: Number,
        required: true,
    },
},
    {
        timestamps: true
        // 좋아요 누른 시간.
});

//title, user_id, password, content
const likeCounts = mongoose.model("likecount", likecountschema);
module.exports = { likeCounts, likecountschema }