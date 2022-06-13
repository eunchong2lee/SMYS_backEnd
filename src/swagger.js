const dotenv = require('dotenv');
dotenv.config();
const swaggerAutogen = require("swagger-autogen")();

const doc = {
  info: {
    title: "Show My Your Space",
    description:
        "당신의 방을 자랑하세요",
  },
  host: `localhost:${process.env.PORT}/api`,
  schemes: ["http"],
};

const outputFile = "./swagger-output.json";
const endpointsFiles = [
    "./routes/authroutes.js",
    "./routes/boardroutes.js",
    "./routes/commentroutes.js",
    "./routes/relationroutes.js"
];

swaggerAutogen(outputFile, endpointsFiles, doc);