const dotenv = require('dotenv');
dotenv.config()

const express = require('express');
const app = express();
const cors = require('cors')
const mongoose = require("mongoose");
const { swaggerUi, specs } = require("./swagger/swagger")

console.log('env', process.env.NODE_ENV)

const requestMiddleware = ((req, res, next) => {
  console.log("Request URL:", req.originalUrl, "-", new Date());
  next();
});
const server = async () => {
  try {
    await mongoose.connect(process.env.NODE_MONGOOSE, { ignoreUndefined: true })

    app.use(express.json());
    app.use(cors());

    app.use(express.urlencoded({ extended: false }));

    app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(specs, {explorer: true}));

    app.get('/', function (req, res) {
      res.send('연결완료');
    })

    if (process.env.NODE_ENV !== 'test') {
      app.listen(process.env.PORT, () => {
        console.log('port에 연결 완료')
        console.log('env', process.env.NODE_ENV)
      });
    }

  } catch (err) {
    return res.status(500).send({ err: err.message })
  }
}

server();


// app.listen(process.env.PORT, () => {
//   console.log('port에 연결 완료')
// });

module.exports = app;