//Button text function
const changeTxt = () => {
	document.getElementById("login-button").innerHTML = "LOADING...";
};

const loginFormHandler = async (event) => {
	event.preventDefault();
	//changes text of submit button to LOADING...
	changeTxt();

	const email = document.querySelector("#email-login").value.trim();
	const password = document.querySelector("#password-login").value.trim();

	if (email && password) {
		const response = await fetch("/api/users/login", {
			method: "POST",
			body: JSON.stringify({ email, password }),
			headers: { "Content-Type": "application/json" },
		});
		if (response.ok) {
			document.location.replace("/");
		} else {
			alert("Failed to log in.");
		}
	}
};

// event listener for login submit
document
	.getElementById("login-form")
	.addEventListener("submit", loginFormHandler);
