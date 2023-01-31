const express = require("express");
const cors = require("cors");

const router = require("./router");

const app = express();
app.use(cors());

app.use(express.json());
console.log("parsittu");

app.get("/health", (req, res) => {
    if (res.statusCode === 200) {
        res.send("OK");
    } else {
        res.send("Not OK");
    }
});

app.use("/api/recept", router);

module.exports = app;
