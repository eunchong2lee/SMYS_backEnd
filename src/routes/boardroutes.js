const dotenv = require('dotenv');
dotenv.config();
const express = require("express");
const boardRouter = express.Router({ mergeParams: true });
const {Boards,Users} = require("../models/");
const authMiddleware = require('../middlewares/authMiddleware')


// 데이터 넣기 (CRUD 중 C(create))
// 게시판에 글을 개시할 수 있다. 
boardRouter.post("/board", authMiddleware, async (req, res) => {
    console.log("req.body");
    const {boardId,category,title,content,image1} = req.body; 
    const { nickname } = res.locals.user;
    console.log(nickname);
    const createdBoards = await Boards.create({boardId,category,title,content,image1,nickname })
  
    res.json({ boards: createdBoards });
  });
  

// 데이터 목록 보기 (CRUD 중 R(read))
// 데이터 전체를 볼 수 있다. 
boardRouter.get("/board", async (req, res) => {
    const boards = await Boards.find({}, {boardId:1,nickname:1,category:1,title:1,content:1,image1:1,goodcnt:1 }).sort({createAt:-1});
    res.json({ boards });
});

// 데이터 목록 중 1개 보기 (CRUD 중 R(read))  
// boardsId 번호를 조회해 같은 게시글을 찾아내는 기능 
boardRouter.get("/board/:boardId", async (req, res) => {
    const { boardId } = req.params;
    const boardfind = await Boards.findOne({ boardId });
    res.json({ boardfind });
  });
  
// 데이터 목록 중 1개 보기 (CRUD 중 R(read))  
// boardsId 번호를 조회해 같은 게시글을 찾아내는 기능 
boardRouter.get("/boardcate/:category", async (req, res) => {
    const { category } = req.params;
    const boardfind = await Boards.findOne({ category });
    res.json({ boardfind });
  });

// 업데이트 
//  UPDATE users SET a=1 WHERE b='q' 참고한 sql 구문 
//db.users.updateOne(("zip":"12534"),{"$set":{"pop":17630,"다른 고칠것":17630}})
boardRouter.put("/board/:boardId/update/",authMiddleware, async (req, res) => {
    const { boardId } = req.params;
    const { category,title,content,image1} = req.body;
    const user = res.locals.user;
    //console.log(password);
                                  
    const boardOne = await Boards.find({boardId:Number(boardId),nickname:user.nickname})
    console.log(boardOne.length);
    if (boardOne.length > 0) {
      await Boards.updateOne({boardId:Number(boardId)}                            // 조건문 수정하고자 하는 번호가 같을 때 
                             ,{"$set":{category:category,title:title
                                ,content:content,image1:image1}});  // 밑에 조건들을 충족 하는 것을 수정함                                    
    }
   
    res.json({success:true});
  });  
  
  //삭제 
  boardRouter.delete("/board/:boardId/delete/",authMiddleware, async (req, res) => {   
    const { boardId } = req.params;
    const user = res.locals.user;
   
  
    const boardOne = await Boards.find({boardId:Number(boardId),nickname:user.nickname})
    //console.log(boardOne.length);
    if (boardOne.length > 0) { 
       await Boards.remove({boardId:Number(boardId)});
    } 
    res.json({success:true});
  });

module.exports = {boardRouter};