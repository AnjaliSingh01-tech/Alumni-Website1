document.addEventListener("DOMContentLoaded", () => {
    const loginForm = document.getElementById("loginForm");

    // Stop if form missing
    if (!loginForm) return;

    loginForm.addEventListener("submit", async (e) => {
        e.preventDefault();

        // Get values
        const email = document.getElementById("email").value.trim();
        const password = document.getElementById("password").value.trim();

        // Error elements
        const emailErr = document.getElementById("emailError");
        const passErr = document.getElementById("passError");

        let valid = true;

        // Hide errors
        emailErr.style.display = "none";
        passErr.style.display = "none";

        // Email validation
        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailPattern.test(email)) {
            emailErr.style.display = "block";
            valid = false;
        }

        // Password validation
        if (password.length < 6) {
            passErr.style.display = "block";
            valid = false;
        }

        if (!valid) return;

        try {
            const response = await fetch("http://localhost:5000/api/auth/login", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    email,
                    password
                })
            });

            const data = await response.json();

            if (data.success) {
                // Save token + user
                localStorage.setItem("token", data.token);
                localStorage.setItem("user", JSON.stringify(data.user));

                alert("Login successful!");
                window.location.href = "dashboard.html";

            } else {
                alert(data.message || "Login failed");
            }

        } catch (error) {
            console.error("Login Error:", error);
            alert("Server error. Please try again.");
        }
    });
});