const mongoose = require("mongoose");
const autoIncrement = require("mongoose-sequence")(mongoose);
const relationschema = new mongoose.Schema({
    relation_target: {
        type: String,
        required: true,
    },

    relationId: {
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

    relation: {
        type: Boolean,
        required: true,
    },

},
    {
        timestamps: true
        // 좋아요 누른 시간.
});
relationschema.plugin(autoIncrement, {
  inc_field: "relationId",
});

//title, user_id, password, content
const Relations = mongoose.model("relation", relationschema);
module.exports = { Relations, relationschema }