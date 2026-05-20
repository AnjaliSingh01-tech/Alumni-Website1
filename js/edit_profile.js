document.addEventListener("DOMContentLoaded", async () => {
    const editProfileForm = document.getElementById("editProfileForm");

    // Stop if form doesn't exist
    if (!editProfileForm) return;

    // Check token
    const token = localStorage.getItem("token");

    if (!token) {
        alert("Please login first.");
        window.location.href = "login.html";
        return;
    }

    // =========================
    // LOAD EXISTING PROFILE DATA
    // =========================
    try {
        const profileResponse = await fetch("http://alumni-backend-folder.onrender.com/api/profile", {
            method: "GET",
            headers: {
                "Authorization": `Bearer ${token}`,
                "Content-Type": "application/json"
            }
        });

        const profileData = await profileResponse.json();

        if (profileData.success) {
            document.getElementById("graduationYear").value = profileData.user.graduation_year || "";
            document.getElementById("course").value = profileData.user.course || "";
            document.getElementById("college").value = profileData.user.college || "";
            document.getElementById("linkedin").value = profileData.user.linkedin || "";
            document.getElementById("skills").value = profileData.user.skills || "";
            document.getElementById("bio").value = profileData.user.bio || "";
        } else {
            console.warn("Profile data not loaded");
        }

    } catch (error) {
        console.error("Profile Load Error:", error);
    }

    // =========================
    // UPDATE PROFILE
    // =========================
    editProfileForm.addEventListener("submit", async (e) => {
        e.preventDefault();

        const graduation_year = document.getElementById("graduationYear").value.trim();
        const course = document.getElementById("course").value.trim();
        const college = document.getElementById("college").value.trim();
        const linkedin = document.getElementById("linkedin").value.trim();
        const skills = document.getElementById("skills").value.trim();
        const bio = document.getElementById("bio").value.trim();

        try {
            const response = await fetch("http:///api/profile/update", {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`
                },
                body: JSON.stringify({
                    graduation_year,
                    course,
                    college,
                    linkedin,
                    skills,
                    bio
                })
            });

            const data = await response.json();

            if (data.success) {
                alert("Profile updated successfully!");
                window.location.href = "dashboard.html";
            } else {
                alert(data.message || "Update failed");
            }

        } catch (error) {
            console.error("Profile Update Error:", error);
            alert("Server error. Please try again.");
        }
    });
});