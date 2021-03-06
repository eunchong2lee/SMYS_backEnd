const dotenv = require('dotenv');
dotenv.config()
const express = require("express");
const authMiddleware = require('../middlewares/authMiddleware');
const commentRouter = express.Router({ mergeParams: true });
const { Comments, Users, Boards,likeCounts } = require('../models/');

// boardid에 해당되는 comment 받아오기
commentRouter.get("/board/:boardId/comment/", async (req, res) => {
    // #swagger.tags = ["Comment"]
    // #swagger.summary = "댓글 조회 페이지"
    // #swagger.description = "댓글 조회 페이지"
    try {
        const { boardId } = req.params;
        const comments = await Comments.find({ boardId });

        res.status(200).json({ success: true, message: "complete",comments });
    } catch (err) {
        return res.status(500).json({ errorMessage: err.message });
    }
});


// boardid에 해당되는 comment 만들기
commentRouter.post("/board/:boardId/comment/",  authMiddleware, async (req, res) => {
    // #swagger.tags = ["Comment"]
    // #swagger.summary = "댓글 작성 페이지"
    // #swagger.description = "댓글 작성 페이지"
    try {
        const { boardId } = req.params;
        const { comment } = req.body;
        const { nickname } = res.locals.user;
        const findBoard = await Boards.findOne({ boardId});
        const checkUser = await Users.findOne({nickname});
        console.log(findBoard, checkUser);


        //error 코드
        if(!checkUser){
          return res.status(400).json({success: false, errorMessage: "로그인 후 사용하세요"});
        };
        // boardId를 입력하지 않았을 경우 또는 findBoard가 없을 경우
        if ((!boardId)||(!findBoard)){
          return res.status(400).json({success:false, errorMessage: "해당 게시글이 없습니다."});
        };
        // 코멘트 내용을 받아오지 않았을 때 사용
        if (!comment) {
            return res.status(400).json({ success: false, errorMessage: "댓글을 입력하세요" });
        }
        


        const createComment = await Comments.create({ boardId, nickname, comment });
        const makelike = await likeCounts.create({relation_target: 'comment', targetId : createComment.commentId, relationcount : 0})

        res.status(200).json({ success: true, message: "댓글을 작성했습니다.", createComment , makelike});

    } catch (err) {
        return res.status(500).json({ success:false, errorMessage: err.message });
    }

});

// boardId에 해당되는 댓글 수정하기
commentRouter.put("/board/:boardId/comment/:commentId", authMiddleware, async (req, res) => {
    // #swagger.tags = ["Comment"]
    // #swagger.summary = "댓글 수정 페이지"
    // #swagger.description = "댓글 수정 페이지"
    try {
        const { boardId, commentId } = req.params;
        const { comment } = req.body;
        const { nickname} = res.locals.user;

 
        const commentfind = await Comments.findOne({boardId, commentId, nickname});
        //.and([{ boardId }, { commentId }, { nickname }]);


        if (!(commentId&&boardId)){
          return res.status(400).json({success: false, errorMessage: "required commentId or blogId"});
        };
        if (!commentfind) {
            return res.status(400).json({ success: false, errorMessage: "can't required comment" });
        }
        if (nickname !== commentfind.nickname) {
            return res.status(400).json({ success: false, errorMessage: "this is not your comment" });
        }
        if (!comment) {
            return res.status(400).json({ success: false, errorMessage: "댓글을 입력하세요" });
        }

        const newComment = await Comments.findOneAndUpdate({ commentId }, { $set: { comment } }, { new: true })

        res.status(200).json({ success: true, message: "변경 성공했습니다.", newComment })

    } catch (err) {
        return res.status(500).send({ success: false, errorMessage: err.message })
    }


})

// postid에 해당되는 comment 삭제하기
commentRouter.delete("/board/:boardId/comment/:commentId",authMiddleware, async (req, res) => {
    // #swagger.tags = ["Comment"]
    // #swagger.summary = "댓글 삭제 페이지"
    // #swagger.description = "댓글 삭제 페이지"
    try {
        const { boardId, commentId } = req.params;
        const { nickname } = res.locals.user;

        const commentfind = await Comments.findOne().and([{ boardId }, { commentId }, { nickname }]);

        if (!(commentId&&boardId)){
          return res.status(400).json({success: false, errorMessage: "required commentId or blogId"});
        };
        if (!commentfind) {
            return res.status(400).json({ success: false, errorMessage: "해당 댓글이 없습니다." });
        }
        if (nickname !== commentfind.nickname) {
            return res.status(400).json({ success: false, errorMessage: "자신의 댓글이 아닙니다." });
        }

        await Comments.deleteOne({ commentId })

        res.status(200).json({ success: true, message: "삭제 되었습니다." });

    } catch (err) {
        return res.status(500).json({ errorMessage: err.message })
    }

})

module.exports = {commentRouter};