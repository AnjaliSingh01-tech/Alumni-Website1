document.addEventListener("DOMContentLoaded", () => {
    const signupForm = document.getElementById("signupForm");

    // Stop if form not found
    if (!signupForm) return;

    signupForm.addEventListener("submit", async (e) => {
        e.preventDefault();

        // Get input values
        const name = document.getElementById("fullname").value.trim();
        const email = document.getElementById("email").value.trim();
        const password = document.getElementById("password").value.trim();
        const confirmPassword = document.getElementById("confirmPassword").value.trim();

        // Error elements
        const nameErr = document.getElementById("nameError");
        const emailErr = document.getElementById("emailError");
        const passErr = document.getElementById("passError");
        const confirmErr = document.getElementById("confirmError");

        let valid = true;

        // Hide all errors first
        nameErr.style.display = "none";
        emailErr.style.display = "none";
        passErr.style.display = "none";
        confirmErr.style.display = "none";

        // Name Validation
        if (name === "") {
            nameErr.style.display = "block";
            valid = false;
        }

        // Email Validation
        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailPattern.test(email)) {
            emailErr.style.display = "block";
            valid = false;
        }

        // Password Validation
        if (password.length < 6) {
            passErr.style.display = "block";
            valid = false;
        }

        // Confirm Password Validation
        if (confirmPassword === "" || password !== confirmPassword) {
            confirmErr.style.display = "block";
            valid = false;
        }

        // Stop if validation fails
        if (!valid) return;

        try {
            const response = await fetch("http://localhost:5000/api/auth/signup", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    name,
                    email,
                    password
                })
            });

            const data = await response.json();

            if (data.success) {
                alert("Signup successful! Please login.");
                signupForm.reset();
                window.location.href = "login.html";
            } else {
                alert(data.message || "Signup failed");
            }

        } catch (error) {
            console.error("Signup Error:", error);
            alert("Server error. Please try again.");
        }
    });
});