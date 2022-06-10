const dotenv = require('dotenv');
dotenv.config()
const express = require("express");
// const authMiddleware = require("../middlewares/authMiddleware");
const commentRouter = express.Router({ mergeParams: true });
const { Comments, Users } = require('../models/');

// postid에 해당되는 comment 받아오기
commentRouter.get("/", async (req, res) => {

    try {
        const { id } = req.params
        const comments = await Comments.find({ id })
        if (!comments.length) {
            return res.status(400).json({ success: false, errorMessage: "댓글이 없습니다." })
        }
        res.status(200).json({ success: true, Message: "불러왔습니다.", comments })
    } catch (err) {
        return res.status(500).json({ err: err.message })
    }
});


// postid에 해당되는 comment 만들기
commentRouter.post("/",  async (req, res) => {
    try {
        const { id } = req.params;
        const { comment } = req.body;
        const { userId, userName } = res.locals.user;
        const findpost = await Posts.findOne({ id })
        console.log(findpost)

        //error 코드
        if (!findpost) {
            return res.status(400).json({ success: false, errorMessage: "해당 게시글이 없습니다." })
        }
        if (!comment) {
            return res.status(400).json({ success: false, errorMessage: "댓글을 입력하세요" })
        }

        const createComment = await Comments.create({ id, userId, userName, comment })

        res.status(200).json({ success: true, Message: "댓글을 작성했습니다.", createComment })

    } catch (err) {
        return res.status(500).json({ err: err.message })
    }

});

// postid에 해당되는 댓글 수정하기
commentRouter.put("/:commentid",  async (req, res) => {
    try {
        const { id, commentid } = req.params
        const { comment } = req.body
        const { userId, userName } = res.locals.user;

        const commentfind = await Comments.findOne().and([{ id }, { commentid }, { userId }])

        if (!commentfind) {
            return res.status(400).json({ success: false, errorMessage: "해당 댓글이 없습니다." })
        }
        if (userId !== commentfind.userId) {
            return res.status(400).json({ success: false, errorMessage: "자신의 댓글이 아닙니다." })
        }
        if (!comment) {
            return res.status(400).json({ success: false, errorMessage: "댓글을 입력하세요" })
        }

        const newComment = await Comments.findOneAndUpdate({ commentid }, { $set: { comment } }, { new: true })

        res.status(200).json({ success: true, Message: "변경 성공했습니다.", newComment })

    } catch (err) {
        return res.status(500).send({ err: err.message })
    }


})

// postid에 해당되는 comment 삭제하기
commentRouter.delete("/:commentid", async (req, res) => {
    try {
        const { id, commentid } = req.params;
        const { userId, userName } = res.locals.user;

        const commentfind = await Comments.findOne().and([{ id }, { commentid }, { userId }])

        if (!commentfind) {
            return res.status(400).json({ success: false, errorMessage: "해당 댓글이 없습니다." })
        }
        if (userId !== commentfind.userId) {
            return res.status(400).json({ success: false, errorMessage: "자신의 댓글이 아닙니다." })
        }

        await Comments.deleteOne({ commentid: commentid })

        res.status(200).json({ success: true, Message: "삭제 되었습니다." })

    } catch (err) {
        return res.status(500).json({ err: err.message })
    }

})

module.exports = {commentRouter};