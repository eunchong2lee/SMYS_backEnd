const express = require("express");
const authMiddleware = require('../middlewares/authMiddleware');
const bookmarksRouter = express.Router({ mergeParams: true });
const { Bookmark, BookmarkCnt } = require('../models');


// 북마크 추가
bookmarksRouter.put('/board/:Id/bookmark', authMiddleware,async (req,res)=>{
    // #swagger.tags = ["BookMark"]
    // #swagger.summary = "북마크 추가"
    // #swagger.description = "북마크 추가"
  try{
    const { Id } = req.params;
    const { nickname } = res.locals.user;

    if(!Id) return res.status(400).json({success:false, errMessage: "required Id"});
    if(!nickname) return res.status(404).json({success:false, errMessage: "missing nickname"});
    
    const findUser = await Bookmark.findOne({ targetId: Id, nickname });
    const findCnt = await BookmarkCnt.findOne({ targetId: Id });
    console.log(1);
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
        const updatebookmark = await Bookmark.findOneAndUpdate({ targetId: Id, nickname }, { bookmark: true }, { new: true });
        const bookmarkcnt = await BookmarkCnt.findOneAndUpdate({ targetId: Id }, { bookmarkCnt : findCnt.bookmarkCnt + 1 }, {new: true});
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

    console.log(3);
    const userBookmark = await Bookmark.create({ targetId: Id, nickname, bookmark: true });
    const userCnt =  await BookmarkCnt.findOneAndUpdate({ targetId: Id }, { bookmarkcount : findCnt.bookmarkcount +1 },{ new: true });
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
bookmarksRouter.put('/board/:Id/unbookmark', authMiddleware,async (req,res)=>{
    // #swagger.tags = ["BookMark"]
    // #swagger.summary = "북마크 취소"
    // #swagger.description = "북마크 취소"
  try{
    const { Id } = req.params;
    const { nickname } = res.locals.user;

    console.log("ID:", Id);

    if(!Id) return res.status(400).json({success:false, errMessage: "required Id"});
    if(!nickname) return res.status(404).json({success:false, errMessage: "missing nickname"});

    const findUser = await Bookmark.findOne({ targetId: Id, nickname });
    const findCnt = await BookmarkCnt.findOne({ targetId: Id })

    if(!findCnt) return res.status(400).json({success: false, errorMessage: "게시글이 없습니다."});

    if(findUser.bookmark === false){
      return res.status(400).json({success:false, errMessage: "북마크를 추가하지 않았습니다."});
    }

    const unBookmark = await Bookmark.findOneAndUpdate({targetId: Id, nickname }, {bookmark : false},{new : true});
    const unBookmarktCnt = await BookmarkCnt.findOneAndUpdate({ targetId: Id }, {bookmarkcount: findCnt.bookmarkcount -1}, { new: true });
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