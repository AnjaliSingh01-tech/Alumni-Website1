document.addEventListener("DOMContentLoaded", () => {
    const storyForm = document.getElementById("storyForm");

    if (!storyForm) return;

    const token = localStorage.getItem("token");

    if (!token) {
        alert("Please login first.");
        window.location.href = "login.html";
        return;
    }

    storyForm.addEventListener("submit", async (e) => {
        e.preventDefault();

        const alumni_name = document.getElementById("alumniName").value.trim();
        const graduation_year = document.getElementById("graduationYear").value.trim();
        const course = document.getElementById("course").value.trim();
        const company = document.getElementById("company").value.trim();
        const job_role = document.getElementById("jobRole").value.trim();
        const achievement = document.getElementById("achievement").value.trim();
        const profile_photo = document.getElementById("profilePhoto").value.trim();
        const linkedin = document.getElementById("linkedin").value.trim();

        try {
            const response = await fetch("http://alumni-backend-folder.onrender.com/api/success-stories/post", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`
                },
                body: JSON.stringify({
                    alumni_name,
                    graduation_year,
                    course,
                    company,
                    job_role,
                    achievement,
                    profile_photo,
                    linkedin
                })
            });

            const data = await response.json();

            if (data.success) {
                alert("Success story posted successfully!");
                storyForm.reset();
                window.location.href = "success-stories.html";
            } else {
                alert(data.message || "Story posting failed");
            }

        } catch (error) {
            console.error("Success Story Post Error:", error);
            alert("Server error. Please try again.");
        }
    });
});