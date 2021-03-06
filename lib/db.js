const path = require("path");
const fsPromise = require("fs/promises");
const dbPath = path.join(".", "db");

class db {
	#notes;

	#updateFile = () => {
		return fsPromise.writeFile(
			path.join(dbPath, "db.json"),
			JSON.stringify(this.#notes, null, "	")
		);
	};

	init = () => {
		fsPromise.readFile(path.join(dbPath, "db.json"), "utf8")
			.then((data) => {
				// parse data
				data = JSON.parse(data);
				// make sure data is an array
				if (!Array.isArray(data)) data = [];

				this.#notes = data;
			}).catch(console.error);
	};

	checkInit = () => {
		if (!this.#notes) throw Error("db has not been initialized");
	};

	getNotes = () => {
		this.checkInit();
		return this.#notes;
	};

	getNotesbyTitle = (title) => {
		this.checkInit();
		return this.#notes.filter((note) => note.title === title);
	};

	getNotebyID = (id) => {
		this.checkInit();
		return this.#notes.filter((note) => note.id === id)[0];
	};

	deleteNotebyID = (id) => {
		this.checkInit();
		let deleted = false;
		this.#notes = this.#notes.filter((note) => {
			const match = note.id === id;
			if (match) deleted = true;
			return !match;
		});
		this.#updateFile();
		return deleted;
	};

	addNote = (note) => {
		this.#notes.push(note);
		this.#updateFile();
		// update file
	}
}

module.exports = new db();