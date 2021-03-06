const router = require("express").Router();
const { v4: uuidv4 } = require("uuid");
const path = require("path");
const fsPromise = require("fs/promises");

const db = require("../lib/db");
db.init();

router.route("/notes")
	.get((req, res, next) => {
		if (req.query.id) res.send(db.getNotebyID(req.query.id));
		else next();
	}, (req, res, next) => {
		if (req.query.title) res.send(db.getNotesbyTitle(req.query.title));
		else next();
	}, (req, res) => {
		res.send(db.getNotes());
	})
	.post((req, res) => {
		// create note
		const { title, text } = req.body;
		const note = {
			title: title,
			text: text,
			id: uuidv4()
		}
		// add note
		db.addNote(note);
		// send status
		res.status(200).send(note);
	})
	.delete((req, res) => {
		const id = req.query.id;
		if (id) {
			const deleted = db.deleteNotebyID(id);
			if (deleted) res.sendStatus(200);
			else res.sendStatus(404);
		}
		else res.status(403).send("expected id")
	});
router.route("/notes/:id")
	.get((req, res) => {
		res.send(db.getNotebyID(req.params.id));
	})
	.put((req, res) => {
		// create note
		const { title, text } = req.body;
		const note = {
			title: title,
			text: text,
			id: req.params.id
		}
		// add note
		db.deleteNotebyID(note.id);
		db.addNote(note);
		// send status
		res.status(200).send(note);
	})
	.delete((req, res) => {
		const id = req.params.id;
		const deleted = db.deleteNotebyID(id);
		if (deleted) res.sendStatus(200);
		else res.sendStatus(404);
	});

module.exports = router;