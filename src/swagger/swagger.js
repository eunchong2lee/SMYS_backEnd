const swaggerUi = require("swagger-ui-express")
const swaggereJsdoc = require("swagger-jsdoc")

const options = {
  swaggerDefinition: {
    openapi: "3.0.0",
    info: {
      version: "1.0.0",
      title: "BASIC RESTAPI 공부",
      description:
        "프로젝트 설명 Node.js RESTAPI 공부 및 SWAGGER 연결",
      license: {
        name: 'hello world'
      }
        
    },
    servers: [
      {
        url: "http://localhost:3000", // 요청 URL
      }],
    
  },
  apis: [
    "src/app.js",
    "src/routes/*",
    "src/swagger/test.js",
    // "src/swagger/test",
  ] //Swagger 파일 연동
  
}
const specs = swaggereJsdoc(options)
console.log('hi')


module.exports = { swaggerUi, specs }