const dotenv = require('dotenv');
dotenv.config();
const express = require("express");
const multer = require('../lib/multer')
const boardRouter = express.Router({ mergeParams: true });

const {Boards,Users, likeCounts, BookmarkCnt} = require("../models/");
const authMiddleware = require('../middlewares/authMiddleware');



// 데이터 넣기 (CRUD 중 C(create))
// 게시판에 글을 개시할 수 있다. 
boardRouter.post("/board", authMiddleware , async (req, res) => {
    // #swagger.tags = ["Board"]
    // #swagger.summary = "게시글 작성 페이지"
    // #swagger.description = "게시글 작성 페이지"
  try{
    // const [image1, image2, image3, image4, image5] = req.files;
    // let image1transforms = null;
    // let image2transforms = null;
    // let image3transforms = null;
    // let image4transforms = null;
    // let image5transforms = null;
    // if(image1 !== undefined){
    //   image1transforms = image1.transforms[0].location;
    // }
    // if(image2 !== undefined){
    //   image2transforms = image2.transforms[0].location;

    // }
    // if(image3 !== undefined){
    //   image3transforms = image3.transforms[0].location;
    // }
    // if(image4 !== undefined){
    //   image4transforms = image4.transforms[0].location;
    // }
    // if(image5 !== undefined){
    //   image5transforms = image5.transforms[0].location;
    // }
    // const images = {
    //   image1 : image1transforms,
    //   image2 : image2transforms,
    //   image3 : image3transforms,
    //   image4 : image4transforms,
    //   image5 : image5transformsz
    // }

    const {category,title,content,image1,image2,image3,image4,iamge5} = req.body;
    const { nickname } = res.locals.user;
    console.log(nickname);
    console.log(image1);
    const createdBoards = await Boards.create({category,title,content,image1,image2,image3,image4,iamge5,nickname });
    //console.log(createBoards);
    const makecount = await likeCounts.create({relation_target: "board", targetId : createdBoards.boardId, relationcount : 0});
    const bookmarkCnt = await BookmarkCnt.create({ targetId: createdBoards.boardId, bookmarkCnt : 0});

    res.status(200).json({success:true, message: "게시글을 작성했습니다.", boards: createdBoards, makecount, bookmarkCnt });
  }catch(err){
    res.status(400).send({success:false, errorMessage: err.message});
  }

  });


// 데이터 목록 보기 (CRUD 중 R(read))
// 데이터 전체를 볼 수 있다. 
boardRouter.get("/board", async (req, res) => {
  // #swagger.tags = ["Board"]
  // #swagger.summary = "게시글 전체 조회 페이지"
  // #swagger.description = "게시글 전체 조회 페이지"
  const boards = await Boards.find({}, { boardId: 1, nickname: 1, category: 1, title: 1, content: 1, image1: 1,iamge2:1,image3:1,iamge4:1,image5:1, goodcnt: 1 }).sort({ createAt: -1 });
  res.status(200).json({ success:true, message: "게시글들을 불러왔습니다.",boards });
});

// 데이터 목록 중 1개 보기 (CRUD 중 R(read))  
// boardsId 번호를 조회해 같은 게시글을 찾아내는 기능 
boardRouter.get("/board/:boardId", async (req, res) => {
  // #swagger.tags = ["Board"]
    // #swagger.summary = "게시글 상세 조회 페이지"
    // #swagger.description = "게시글 상세 조회 페이지"
  const { boardId } = req.params;
  const boardfind = await Boards.findOne({ boardId });
  res.status(200).json({success: true, message: "게시글을 불러왔습니다.", boardfind });
});

// 데이터 목록 중 1개 보기 (CRUD 중 R(read))  
// boardsId 번호를 조회해 같은 게시글을 찾아내는 기능 
boardRouter.get("/boardcate/:category", async (req, res) => {
  // #swagger.tags = ["Board"]
    // #swagger.summary = "카테고리별 게시글 조회 페이지"
    // #swagger.description = "카테고리별 게시글 조회 페이지"
  const { category } = req.params;
  const boardfind = await Boards.findOne({ category });
  res.status(200).json({ success:true, message: "불러왔습니다.",boardfind });
});

// 업데이트 
//  UPDATE users SET a=1 WHERE b='q' 참고한 sql 구문 
//db.users.updateOne(("zip":"12534"),{"$set":{"pop":17630,"다른 고칠것":17630}})
boardRouter.put("/board/:boardId/update/", authMiddleware, async (req, res) => {
  // #swagger.tags = ["Board"]
    // #swagger.summary = "게시글 수정 페이지"
    // #swagger.description = "게시글 수정 페이지"
  const { boardId } = req.params;
  const { category, title, content,image1,image2,image3,image4,iamge5 } = req.body;
  const user = res.locals.user;
  //console.log(password);

  const boardOne = await Boards.find({ boardId: Number(boardId), nickname: user.nickname })
  console.log(boardOne.length);
  if (boardOne.length > 0) {
    await Boards.updateOne({ boardId: Number(boardId) }                            // 조건문 수정하고자 하는 번호가 같을 때 
      , {
        "$set": {
          category: category, title: title
          , content: content,image1
                     ,image2,image3
                     ,image4,iamge5
        }
      });  // 밑에 조건들을 충족 하는 것을 수정함                                    
  }

  res.status(200).json({ success: true , message: "게시글을 수정했습니다."});
});

//삭제 
boardRouter.delete("/board/:boardId/delete/", authMiddleware, async (req, res) => {
  // #swagger.tags = ["Board"]
    // #swagger.summary = "게시글 삭제 페이지"
    // #swagger.description = "게시글 삭제 페이지"
  const { boardId } = req.params;
  const user = res.locals.user;


  const boardOne = await Boards.find({ boardId: Number(boardId), nickname: user.nickname })
  //console.log(boardOne.length);
  if (boardOne.length > 0) {
    await Boards.remove({ boardId: Number(boardId) });
  }
  res.status(200).json({ success: true ,message: "게시글을 삭제했습니다." });
});

module.exports = { boardRouter };