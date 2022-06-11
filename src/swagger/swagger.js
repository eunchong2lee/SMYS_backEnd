const swaggerUi = require("swagger-ui-express")
const swaggereJsdoc = require("swagger-jsdoc")

const options = {
  swaggerDefinition: {
    openapi: "3.0.0",
    info: {
      version: "1.0.0",
      title: "Show My Your Space",
      description:
        "당신의 방을 자랑하세요",
      license: {
        name: '항해99 7기 4조'
      }
        
    },
    servers: [
      {
        url: `http://localhost:${process.env.PORT}/api`, // 요청 URL
      }],
    
  },
  apis: [
    "src/app.js",
    "src/routes/*",
    "src/swagger/test.js",
    "src/swagger/*",
    "./swagger/*",
    "src/swagger/authSwagger.yaml"
    // "src/swagger/test",
  ] //Swagger 파일 연동
  
}
const specs = swaggereJsdoc(options)
console.log('hi')


module.exports = { swaggerUi, specs }