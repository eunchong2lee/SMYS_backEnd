# π  Show Me Your Space
λμ λ°©μ μλν΄μ£ΌμΈμ.

λ€λ₯Έ μ¬λμ κ³΅κ°λ€λ νμΈν΄λ³΄μΈμ!

#  π Web Site

http://showmeyourspace.s3-website.ap-northeast-2.amazonaws.com/

#  π₯ μμ° μμ

https://www.youtube.com/watch?v=bVNPAp5qS2Q

#  πμ μ κΈ°κ°
2022-06-10(κΈ) ~ 2022-06-16(λͺ©)

#  π νμμκ°
π FRONT-END(2λͺ)
  * μ΄ν¨λ¦¬ : Signup, Login, Main νμ΄μ§
  
  * μ΄νμ­ : Detail, Post, Mypage νμ΄μ§
  
  π https://github.com/vennydev/SMYS_frontEnd

π BACK-END(3λͺ)
  * μμ ν : λ‘κ·ΈμΈ, νμκ°μ, λ§μ΄νμ΄μ§, swagger, μ¦κ²¨μ°ΎκΈ° λ° μ¦κ²¨μ°ΎκΈ° μ, Jwt(accessToken λ° refreshToken)
  
  * μ΄μμ΄ : λκΈ CRUD, λκΈ λ° κ²μκΈ μ’μμ, μ’μμ μ, multer-s3(μ§μ)
   
  * μμ¬ν : κ²μκΈ CRUD, multer-s3, da#μ ν΅ν erd μ μ  

# π¨ Tech Stack
Back-end Tech Stack
  * Javascript
  * Node.js
  * Express

Back-end Library
  * bcrypt
  * multer
  * multer-s3-transform
  * sharp
  * dotenv
  * cors
  * Json Web Token
  * aws-sdk
  * http-server
  * mongoose
  * mongoose-sequence

Develope Library
  * swagger-jsdoc
  * swagger-ui-express
  * swagger-autogen
 
DBMS
  * MongoDB & Mongoose
 
Deploy
  * AWS EC2 (Ubuntu 18.04LTS)
  * AWS S3

# S.A λ° ν λΈμ νμ΄μ§ 

https://www.notion.so/4-SA-10d2f2e0e96947a8b0eb8237690e0606#a83353ea63f242ff881434099e5de764

# μμ΄νΌ νλ μ

https://www.figma.com/file/wNnyH1PuZ3s1ePF9PtxHMP/Show-me-your-space-%ED%94%84%EB%A1%9C%EC%A0%9D%ED%8A%B8-Flow

<img width="1121" alt="ααͺαα΅αα₯αα³αα¦αα΅α·1" src="https://user-images.githubusercontent.com/104499306/174006374-ec47e65c-3dd1-4c0c-9f78-08be1c19e2c2.png">
<img width="1121" alt="ααͺαα΅αα₯αα³αα¦αα΅α·2" src="https://user-images.githubusercontent.com/104499306/174006380-d2e27309-4c78-45fe-88a1-8d27ae9ea892.png">
<img width="1121" alt="ααͺαα΅αα₯αα³αα¦αα΅α·3" src="https://user-images.githubusercontent.com/104499306/174006387-33d473f8-4136-4c73-af0e-b2148f76b474.png">
<img width="1121" alt="ααͺαα΅αα₯αα³αα¦αα΅α·4" src="https://user-images.githubusercontent.com/104499306/174006396-8caf6805-dd21-41cf-97fc-6ff7b486b5b4.png">
<img width="1121" alt="ααͺαα΅αα₯αα³αα¦αα΅α·5" src="https://user-images.githubusercontent.com/104499306/174006403-3901cfb5-f9d0-4c4f-aefc-2a69b6c8c330.png">
<img width="1121" alt="ααͺαα΅αα₯αα³αα¦αα΅α·6" src="https://user-images.githubusercontent.com/104499306/174006409-afade9b1-6a89-48b6-8929-085256af8aa3.png">



# ERD & Table μ€κ³

![erd_vo0 2](https://user-images.githubusercontent.com/104499306/174009117-19f073f9-d74c-4151-ac72-220dda85a37d.jpg)


# API μ€κ³

<img width="1472" alt="apiαα₯α―αα¨1" src="https://user-images.githubusercontent.com/104499306/174013480-06b74e67-a8ec-42e9-bb68-4146e444e883.png">
<img width="1472" alt="apiαα₯α―αα¨2" src="https://user-images.githubusercontent.com/104499306/174013496-c251d82b-07fd-4c67-b835-b4b67f1a1d1f.png">
<img width="1472" alt="apiαα₯α―αα¨3" src="https://user-images.githubusercontent.com/104499306/174013515-10ef6257-5383-4119-8bba-ffe564fe16a1.png">



# <img width=100px; alt="μ€μ¨κ±° λ‘κ³ " src="https://static1.smartbear.co/swagger/media/assets/images/swagger_logo.svg"> swagger
![μ€μ¨κ±°1](https://user-images.githubusercontent.com/81402579/174002638-52cabd6b-de27-4062-9968-02a6086ba231.png)
![μ€μ¨κ±°2](https://user-images.githubusercontent.com/81402579/174002649-5135281e-c3f5-46df-9ab1-b09244c0358d.png)
![μ€μ¨κ±°3](https://user-images.githubusercontent.com/81402579/174002658-34329e29-660c-4c66-8d2a-f40d3a3b649f.png)


# Trouble Shooting

λ¬Έμ  1: aws-s3 μ¬μ© μ s3 bucketμ μ΄λ―Έμ§ μλ‘λ κ°λ₯ νλ μ½κΈ°κ° μλλ νΈλ¬λΈ μν λ°μ
-----------------------------------------------------------------------------------

ν΄κ²° : s3 bucketμ νΌλΈλ¦­ λͺ¨λλ‘ λ³κ²½ν΄μΌν¨.


λ¬Έμ  2: RequestTimeTooSkewed S3 μ΄λ―Έμ§ μλ‘λ μ S3 μκ°κ³Ό server μκ°μ μ°¨μ΄κ° μ»€μ λλ μλ¬ λ°μ
-----------------------------------------------------------------------------------

ν΄κ²° : s3 μ€μ μ correctClockSkew: true μΆκ°ν¨.


λ¬Έμ  3: λ°±μλ νλ‘ νΈμλ κ° request λΆκ°λ₯ λ°μ
-----------------------------------------------------------------------------------

ν΄κ²° : url μλ ₯ μ€μλ‘ μΈν μ€ν λ³κ²½


λ¬Έμ  4: μ€νλ‘ μΈν μ¬λ¬κ°μ§ μλ¬
-----------------------------------------------------------------------------------

ν΄κ²° : μ€ν ν΄κ²°


λ¬Έμ  5: swagger cors μλ¬
-----------------------------------------------------------------------------------

ν΄κ²° : μ£Όμ μλͺ» μλ ₯


λ¬Έμ  6: dotenv .env νμΌ λͺ» λΆλ¬μ€λ λ¬Έμ 
-----------------------------------------------------------------------------------

ν΄κ²° : .env νμΌ μμΉ λ³κ²½


# λ κ΅¬νν΄λ³΄κ³  μΆμ κΈ°λ₯

 - λλκΈ μμ± λ° μ’μμ μΆκ°
 - νμ΄μ§ λ€μ΄μ κΈ°λ₯ μΆκ°


