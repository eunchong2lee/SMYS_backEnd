const dotenv = require('dotenv');
dotenv.config()
const express = require("express");
const authMiddleware = require('../middlewares/authMiddleware');
const bookmarksRouter = express.Router({ mergeParams: true });
const { Bookmarks, BookmarkCnt } = require('../models');


// 북마크 추가
bookmarksRouter.put('/board/:boardId/bookmark', authMiddleware,async (req,res)=>{
    // #swagger.tags = ["BookMark"]
    // #swagger.summary = "북마크 추가"
    // #swagger.description = "북마크 추가"
  try{
    const { target, Id } = req.params;
    const { nickname } = res.locals.user;

    if(!target || !Id) return res.status(400).json({success:false, errMessage: "required boardId"});
    if(!nickname) return res.status(404).json({success:false, errMessage: "missing nickname"});
    
    const findUser = await Bookmarks.findOne({ targetId: Id, bookmark_target: target, nickname });
    const findCnt = await BookmarkCnt.findOne({ targetId: Id, bookmark_target: target })

    if(!findCnt) return res.status(400).json({
      success: false,
      errorMessage: "게시글이 없습니다."
    });

    if(findUser){
      if(nickname !== findUser.nickname){
        return res.status(400).json({ 
          success:false, 
          errMessage: "please check your auth"
        });
      }

      if(findUser.bookmark === false){
        const updatebookmark = await Bookmarks.findOneAndUpdate({ bookmark_target: target, targetId: Id, nickname }, { bookmark: true }, { new: true });
        const bookmarkcnt = await BookmarkCnt.findOneAndUpdate({ bookmark_target: target, targetId : Id }, { relationcount : findCnt.relationcount+1 }, {new: true});
        return res.status(200).json ({
            success: true, 
            Message: "북마크에 추가했습니다.",
            updatebookmark, bookmarkcnt
        });
      }else{
        return res.status(400).json({
          success: false,
          errorMessage: "이미 누르셨습니다."
        });
      }
    }

    const userBookmark = await Bookmarks.create({ bookmark_target: target, targetId: Id, nickname, bookmark: true });
    const userCnt =  await BookmarkCnt.findOneAndUpdate({ bookmark_target: target, targetId : Id }, { bookmarkcount : findCnt.bookmarkcount +1 },{ new: true });
    return res.status(200).json({
      success:true, 
      Message: "북마크를 추가했습니다.", 
      userBookmark, userCnt
    });
  }catch(err){
    return res.status(400).json({
      success: false,  
      err: err.message
    });
  }
});


// 북마크 취소
bookmarksRouter.put('/board/:boardId/unbookmark', authMiddleware,async (req,res)=>{
    // #swagger.tags = ["BookMark"]
    // #swagger.summary = "북마크 취소"
    // #swagger.description = "북마크 취소"
  try{
    const { target, Id } = req.params;
    const { nickname } = res.locals.user;

    if(!target || !Id) return res.status(400).json({success:false, errMessage: "required target or Id"});
    if(!nickname) return res.status(404).json({success:false, errMessage: "missing nickname"});

    const findUser = await Bookmarks.findOne({ bookmark_target: target, targetId: Id, nickname });
    const findCnt = await BookmarkCnt.findOne({ bookmark_target: target, targetId: Id})

    if(!findCnt) return res.status(400).json({success: false, errorMessage: "게시글이 없습니다."});

    if(findUser.bookmark === false){
      return res.status(400).json({success:false, errMessage: "북마크를 추가하지 않았습니다."});
    }

    const unBookmark = await Bookmarks.findOneAndUpdate({ bookmark_target: target, targetId: Id, nickname }, {bookmark : false},{new : true});
    const unBookmarktCnt = await BookmarkCnt.findOneAndUpdate({ bookmark_target: target, targetId: Id }, {bookmarkcount: findCnt.bookmarkcount -1}, { new: true });
    return res.status(200).json({
        success:true, 
        Message: "북마크를 취소했습니다.",
        unBookmark, unBookmarktCnt
    });
  }catch(err){
    return res.status(400).json({
        success: false, 
        err: err.message
    });
  }  
});


module.exports = {bookmarksRouter};