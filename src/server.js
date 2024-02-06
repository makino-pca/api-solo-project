const express = require("express");
const app = express();
app.use(express.json());

const setupExpressServer = () => {
  /* return configured express app */

//   // express basics
//   // 1:should return status 418
//   app.get("/teapot", (req, res) => {
//     res.status(418).send();
//   });

//   // 2 : should return the text/html 'world'
//   app.get("/hello", (req, res) => {
//     res.send("world");
//   });

//   // 3 : should return the JSON for { hello: 'world' }
//   app.get("/hellojson", (req, res) => {
//     res.send({ hello: "world" });
//   });

//   // 4 : should greet the name given in query parameter 'name' with 'Hello name!'
//   app.get("/greet", (req, res) => {
//     const name = req.query["name"];
//     res.send(`Hello ${name}!`);
//   });

//   // 5 : should return a JSON object with a result field
//   app.get("/:a/plus/:b", (req, res) => {
//     res.send({ result: parseInt(req.params.a) + parseInt(req.params.b) });
//   });

//   // handling bodies
//   // 1 : POST /echo returns body content
//   app.post("/echo", (req, res) => {
//     res.send(req.body);
//   });

//   // 2 : OPTIONS /echo flips keys and values of simple objects
//   app.options("/echo", (req, res) => {
//     const flip = {};
//     for (let key in req.body) {
//       flip[req.body[key]] = key;
//     }
//     res.send(flip);
//   });

//   // Adding middleware
//   // 1 : Returns status 401 when called normally
//   // 2 : Returns status 200 when given a token query parameter that contains an even number
//   // 3 : Returns status 401 when given a token query parameter that is not an even number
//   app.get("/secret", (req, res) => {
//     const token = req.query["token"];
//     if (!token || token % 2 === 1) {
//       res.status(401).send();
//     }
//     res.send();
//   });

//   //Returns 'polo' when given a valid token query and posting a JSON body { key: 42, shout: 'marco' }
//   app.post("/secret/message", (req, res) => {
//     const token = req.query["token"];
//     const body = req.body;
//     if (!token || token % 2 === 1) {
//       res.status(401).send();
//     }
//     let valid = false;
//     for (let key in body) {
//       if (key === "key" && body[key] === 42) {
//         valid = true;
//       } else if (key === "shout" && body[key] === "marco") {
//         valid = true;
//       } else {
//         valid = false;
//       }
//     }
//     if (valid) {
//       res.send("polo");
//     } else {
//       res.status(403).send();
//     }
//   });

  return app;
};

module.exports = { setupExpressServer };
