const express = require('express');
const routes = require("./routes/routes");

const app = express();
const PORT = process.env.PORT || 3000;

// parse json request body
app.use(express.json());
// parse urlencoded request body
app.use(express.urlencoded({ extended: true }));

app.use(express.static('public'))

app.use(routes);

app.listen(PORT, () => {
	console.log(`listening on ${PORT}`)
})