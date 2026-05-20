document.addEventListener("DOMContentLoaded", async () => {
    // Get token
    const token = localStorage.getItem("token");

    // If no token → back to login
    if (!token) {
        alert("Please login first.");
        window.location.href = "login.html";
        return;
    }

    try {
        // Fetch profile
        const response = await fetch("http://alumni-backend-folder.onrender.com/api/profile", {
            method: "GET",
            headers: {
                "Authorization": `Bearer ${token}`,
                "Content-Type": "application/json"
            }
        });

        const data = await response.json();

        // If invalid token
        if (!response.ok || !data.success) {
            localStorage.removeItem("token");
            localStorage.removeItem("user");

            alert(data.message || "Session expired. Please login again.");
            window.location.href = "login.html";
            return;
        }

        // Show user info
        document.getElementById("userName").textContent = data.user.name;
        document.getElementById("userEmail").textContent = data.user.email;
        document.getElementById("graduationYear").textContent = data.user.graduationYear;
        document.getElementById("course").textContent = data.user.course || "Not added";
        document.getElementById("college").textContent = data.user.college || "Not added";
        document.getElementById("linkedin").textContent = data.user.linkedin || "Not added";
        document.getElementById("skills").textContent = data.user.skills || "Not added";
        document.getElementById("bio").textContent = data.user.bio || "Not added";

    } catch (error) {
        console.error("Dashboard Error:", error);
        alert("Unable to load dashboard.");
    }
});


// LOGOUT FUNCTION
function logout() {
    localStorage.removeItem("token");
    localStorage.removeItem("user");

    alert("Logged out successfully!");
    window.location.href = "login.html";
}