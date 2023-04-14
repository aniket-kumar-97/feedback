const express = require("express");
const path = require("path");
const {connect} = require("mongoose");
const app = express();

const PORT = 8080;

app.use(express.json());
app.use(express.urlencoded({extended: false}));

connect("mongodb://127.0.0.1:27017/feedback");

app.use(express.static(path.join(__dirname, "../", "public")));

app.use("/", require("./router/router"));

app.listen(PORT, () => console.log(`Server is listening on ${PORT}`));