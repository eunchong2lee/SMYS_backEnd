const mongoose = require("mongoose");

const boardsSchema = mongoose.Schema({
    // 게시판 번호 
    boardId:{ 
       type : Number, 
       required : true, 
       unique : true,
    },
    // 작성자 명 
    category: {
        type : Number,
        required : true, 
    },
    //제목
    title: {
        type : String,
        required : true, 
    },
    // 내용
    content: {
        type : String, 
        required : true,
    },
    // 이미지
    image1: {
        type : String, 
        required : false,
    },
    // 닉네임
    nickname: {
        type : String, 
        required : false,
    }
    
    
} , 
    {
        timestamps: true, // 생성, 업데이트 시간 설정

});

const Boards = mongoose.model("Board", boardsSchema);

module.exports = { Boards, boardsSchema };
 