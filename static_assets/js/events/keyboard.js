window.addEventListener("keydown", (event) => {
	if (event.altKey && event.key.toLowerCase() === "q") {
		event.preventDefault();
		document.getElementById("back-parent-btn").click();
	}

	if (event.altKey && event.key.toLowerCase() === "m") {
		event.preventDefault();
		const btn = document.querySelector("[data-controller='goToForward']");
		try {
			btn?.click();
		} catch (error) {
			console.error("Error triggering goToForward button:", error);
		}
	}
});
