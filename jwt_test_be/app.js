const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const jwt = require("jsonwebtoken");

require("dotenv").config();

const app = express();

// Adding CORS headers to response
app.use(cors());

app.use(bodyParser.json());

app.post("/login", (req, res) => {
	// Secure credentials
	const SECRET = process.env.SHARED_SECRET;
	const KEY_ID = process.env.KEY_ID;
	const ORIGIN = process.env.ORIGIN;

	console.log(req.body);

	// Get the username and password from the request body
	const { username, password } = req.body;

	// Perform your authentication here, for example by checking the username and password against a database
	// Currently hardcoded to true for testing purposes
	const isAuthenticated = true;

	if (!isAuthenticated) {
		return res.status(401).send({ error: "Invalid login credentials" });
	}

	// Generates expiry time of 360 seconds for the JWT
	const expiry = Math.floor((new Date().getTime() + 360 * 1000) / 1000);

	const headers = {
		alg: "HS256",
		typ: "JWT",
		kid: KEY_ID,
	};

	const payload = {
		name: username,
		email: "example@zendesk.com",
		external_id: username,
		exp: expiry,
		scope: "user",
	};

	// Generate the JWT
	const token = jwt.sign(payload, SECRET, { header: headers });

	// route protection
	req.headers.origin === ORIGIN
		? res.send({ token })
		: res.status(403).send({ error: `Request origin does not match an approved domain` });
});

app.listen(3000, () => console.log("Listening on port 3000"));
