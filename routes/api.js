const router = require("express").Router();
const path = require("path");
const { v4: uuidv4 } = require("uuid");
const fsPromise = require("fs/promises");

const dbPath = path.join(".", "db");

router.route("/notes")
	.all((req, res, next) => { next(); })
	.get((req, res) => {
		res.sendFile("db.json", { root: dbPath });
	})

module.exports = router;