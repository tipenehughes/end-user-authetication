console.log("Hello World!");

const login = async () => {
	const request = await fetch("http://localhost:3000/login", {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
            
		},
		body: JSON.stringify({
			username: "admin",
			password: "admin",
		}),
	});
	const response = await request.json();
    console.log(response);
};
