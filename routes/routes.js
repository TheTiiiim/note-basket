const router = require("express").Router();
const path = require("path");

const apiRoutes = require("./api");

const options = { root: path.join(".", "public") };

router.get("/", (req, res) => {
    res.sendFile("index.html", options);
});

router.get("/notes", (req, res) => {
    res.sendFile("notes.html", options);
});

router.use("/api", apiRoutes)

module.exports = router;