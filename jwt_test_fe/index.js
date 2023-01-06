const loginBtn = document.querySelector("#loginBtn");

const login = async (e) => {
	// Prevent default form submission
	e.preventDefault();

	// Get username and password values
	const username = document.querySelector("#username");
	const password = document.querySelector("#password");

	// Stop submission and prompt user if username or password is empty
	if(!username || !password) return alert("Please enter username and password");

	// Send username and password to server
	const request = await fetch("http://localhost:3000/login", {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify({
			username: username.value,
			password: password.value,
		}),
	});
	const response = await request.json();

	// Login user to chat with the token received from server
	window.zE("messenger", "loginUser", function (callback) {
		callback(response.token);
	});

	// Clear username and password fields
	username.value="";
	password.value="";
};

loginBtn.addEventListener("click", login);
