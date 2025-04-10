document.addEventListener("DOMContentLoaded", () => {
    const form = document.getElementById("contactForm");

    form.addEventListener("submit", (event) => {
        // Get form values
        const name = document.getElementById("name").value.trim();
        const email = document.getElementById("email").value.trim();
        const subject = document.getElementById("subject").value.trim();
        const message = document.getElementById("message").value.trim();

        // Validate email format
        const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;

        if (!name || !email || !subject || !message) {
            event.preventDefault();
            alert("Please fill out all fields.");
            return;
        }

        if (!emailPattern.test(email)) {
            event.preventDefault();
            alert("Please enter a valid email address.");
            return;
        }
    });
});
