const dotenv = require('dotenv');
dotenv.config()
const express = require("express");
const authMiddleware = require('../middlewares/authMiddleware');
const bookmarksLimRouter = express.Router({ mergeParams: true });
const { Users, Boards, Bookmarks } = require('../models');


// 북마크 추가
bookmarksLimRouter.put('/board/:boardId/bookmark', authMiddleware,async (req,res)=>{
    // #swagger.tags = ["BookMark"]
    // #swagger.summary = "북마크 추가"
    // #swagger.description = "북마크 추가"
  try{
    const { boardId } = req.params;
    const { nickname } = res.locals.user;

    if(!boardId) return res.status(400).json({success:false, errMessage: "required boardId"});
    if(!nickname) return res.status(404).json({success:false, errMessage: "missing nickname"});
    
    const findUser = await Bookmarks.findOne({ boardId, nickname });

    if(findUser){
      if(nickname !== findUser.nickname){
        return res.status(400).json({success:false, errMessage: "please check your auth"});
      }

      if(findUser.bookmark === false){
        const updatebookmark = await Bookmarks.findOneAndUpdate({ boardId, nickname }, { bookmark: true }, { new: true });
        return res.status(200).json ({
            success: true, 
            Message: "북마크에 추가했습니다.", updatebookmark
        });
      }else{
        return res.status(400).json({success: false, errorMessage: "이미 누르셨습니다."});
      }
    }

    const userBookmark = await Bookmarks.create({boardId, nickname, bookmark: true});

    return res.status(200).json({success:true, Message: "북마크를 추가했습니다.", userBookmark});
  }catch(err){
    return res.status(400).json({success: false,  err: err.message});
  }

}) 


// 북마크 취소
bookmarksLimRouter.put('/board/:boardId/unbookmark', authMiddleware,async (req,res)=>{
    // #swagger.tags = ["BookMark"]
    // #swagger.summary = "북마크 취소"
    // #swagger.description = "북마크 취소"
  try{
    const { boardId } = req.params;
    const { nickname } = res.locals.user;

    if(!boardId) return res.status(400).json({success:false, errMessage: "boardId"});
    if(!nickname) return res.status(404).json({success:false, errMessage: "missing nickname"});

    const findUser = await Bookmarks.findOne({ boardId, nickname });

    if(findUser.bookmark === false){
      return res.status(400).json({success:false, errMessage: "북마크를 추가하지 않았습니다."});
    }

    const unBookmark = await Bookmarks.findOneAndUpdate({ boardId: Id, nickname },{bookmark : false},{new : true});
  
    return res.status(200).json({
        success:true, 
        Message: "북마크를 취소했습니다.",
        unBookmark
    });
  }catch(err){
    return res.status(400).json({
        success: false, 
        err: err.message
    });
  }

  
});


module.exports = {bookmarksLimRouter};