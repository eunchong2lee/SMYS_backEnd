const express = require("express");
const authMiddleware = require("../middlewares/authMiddleware");
const relationRouter = express.Router({ mergeParams: true });
const { Comments, Users, Boards, likeCounts, Relations } = require('../models/');


relationRouter.put('/like/:target/:Id', authMiddleware,async (req,res)=>{
    // #swagger.tags = ["Like"]
    // #swagger.summary = "좋아요 누르기 (게시글, 댓글)"
    // #swagger.description = "좋아요 누르기 (게시글, 댓글)"
  try{
    const { target, Id} = req.params;
    const { nickname } = res.locals.user;

    if(!target || !Id) return res.status(400).json({success:false, errMessage: "required target or Id"});
    if(!nickname) return res.status(404).json({success:false, errMessage: "missing nickname"});
    
    const findUser = await Relations.findOne({targetId : Id,relation_target: target, nickname});
    const findCount = await likeCounts.findOne({targetId : Id,relation_target: target});

    if(!findCount) return res.status(400).json({success: false, errMessage: "게시글이 없습니다."});

    if(findUser){
      if(nickname!== findUser.nickname){
        return res.status(400).json({success:false, errMessage: "please check your auth"});
      }

      if(findUser.relation === false){
        const updaterelation = await Relations.findOneAndUpdate({targetId : Id,relation_target: target,nickname},{relation: true},{new: true});
        const likecount = await likeCounts.findOneAndUpdate({targetId : Id,relation_target: target},{relationcount : findCount.relationcount+1},{new: true});
        return res.status(200).json ({success: true, Message: "좋아요를 눌렀습니다.", updaterelation, likecount});
      }else{
        return res.status(400).json({success: false, errorMessage: "이미 누르셨습니다."});
      }
    }

    const userlike = await Relations.create({relation_target: target, targetId : Id, nickname, relation: true});
    const usercount = await likeCounts.findOneAndUpdate({targetId : Id,relation_target: target},{relationcount : findCount.relationcount +1},{new: true});

    return res.status(200).json({success:true, Message: "좋아요를 눌렀습니다.", userlike,usercount});
  }catch(err){
    return res.status(400).json({success: false,  err: err.message});
  }

}) 


// board 좋아요 취소
relationRouter.put('/cancellike/:target/:Id', authMiddleware,async (req,res)=>{
    // #swagger.tags = ["Like"]
    // #swagger.summary = "좋아요 취소 (게시글, 댓글)"
    // #swagger.description = "좋아요 취소 (게시글, 댓글)"
  try{
    const { target, Id} = req.params;
    const { nickname } = res.locals.user;

    if(!target || !Id) return res.status(400).json({success:false, errMessage: "required target or Id"});
    if(!nickname) return res.status(404).json({success:false, errMessage: "missing nickname"});

    const findUser = await Relations.findOne({targetId : Id,relation_target: target,nickname});
    const findCount = await likeCounts.findOne({targetId : Id,relation_target: target});

    if(!findCount) return res.status(400).json({success: false, errMessage: "게시글이 없습니다."});

    if(!findUser){
      return res.status(400).json({success:false, errMessage: "좋아요를 누르지 않았습니다."});
    }
    if(findUser.relation === false){
      return res.status(400).json({success:false, errMessage: "좋아요를 누르지 않았습니다."});
    }

    const usercancellike = await Relations.findOneAndUpdate({targetId : Id,relation_target: target},{relation : false},{new : true});
    const usercancelcount = await likeCounts.findOneAndUpdate({targetId : Id,relation_target: target},{relationcount : findCount.relationcount -1},{new: true});
  
    return res.status(200).json({success:true, Message: "좋아요를 취소했습니다.", usercancellike, usercancelcount});
  }catch(err){
    return res.status(400).json({success: false, err: err.message});
  }

  
})








module.exports = {relationRouter};