const express = require("express");
const cors = require('cors')
const bodyParser = require('body-parser')
const jwt = require("jsonwebtoken");

require("dotenv").config();

const app = express();

// Adding CORS headers to response
app.use(cors())

app.use(bodyParser.json())

app.post("/login", (req, res) => {
	// Secure credentials
	const SECRET = process.env.SIGNING_KEY;
	const KEY_ID = process.env.KEY_ID;

  console.log(req.body);

	// Get the username and password from the request body
	const { username, password } = req.body;

	// Perform your authentication here, for example by checking the username and password against a database
	const isAuthenticated = true;

	if (!isAuthenticated) {
		return res.status(401).send({ error: "Invalid login credentials" });
	}

	const payload = {
		name: username,
		email: "#{customerEmail}",
		exp: 360,
		external_id: "#{customerIdentifier}",
	};

	// Generate the JWT
	const token = jwt.sign(payload, SECRET, { header: { kid: KEY_ID } });

	// Send the JWT in the response
	return res.send({ token });
});

app.listen(3000, () => console.log("Listening on port 3000"));
