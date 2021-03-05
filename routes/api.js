const router = require("express").Router();
const path = require("path");
const { v4: uuidv4 } = require("uuid");
const fsPromise = require("fs/promises");

const dbPath = path.join(".", "db");

router.route("/notes")
	.get((req, res) => {
		res.sendFile("db.json", { root: dbPath });
	})
	.post((req, res) => {
		// make sure note has title and text properties
		const note = { title, text } = req.body;
		// create an id
		note.id = uuidv4();
		// send status
		res.sendStatus(202);
		// update db
		fsPromise.readFile(path.join(dbPath, "db.json"), "utf8")
			.then((data) => {
				// parse data
				data = JSON.parse(data);
				// make sure data is an array
				if (!Array.isArray(data)) data = [];
				// add new note
				data.push(note);
				// save note
				return fsPromise.writeFile(
					path.join(dbPath, "db.json"),
					JSON.stringify(data, null, "	"))
			}).catch(console.error)
	});

router.delete("/notes/:id", (req, res) => {
	// send status
	res.sendStatus(202);
	// update db
	fsPromise.readFile(path.join(dbPath, "db.json"), "utf8")
		.then((data) => {
			// parse data
			data = JSON.parse(data);
			// make sure data is an array
			if (!Array.isArray(data)) data = [];
			// filter data for notes matching id
			data = data.filter((note) => note.id != req.params.id)

			// save note
			return fsPromise.writeFile(
				path.join(dbPath, "db.json"),
				JSON.stringify(data, null, "	"));
		}).catch(console.error);
});

module.exports = router;