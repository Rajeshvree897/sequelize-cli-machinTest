const express = require("express");
const bodyParser = require("body-parser");
const router = require("./routes")
const app = express();
app.use(bodyParser.json());
app.use("/dev", router)
app.listen(8080, console.log("Running..."))