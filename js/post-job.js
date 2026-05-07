document.addEventListener("DOMContentLoaded", () => {
    const jobForm = document.getElementById("jobForm");

    if (!jobForm) return;

    const token = localStorage.getItem("token");

    if (!token) {
        alert("Please login first.");
        window.location.href = "login.html";
        return;
    }

    jobForm.addEventListener("submit", async (e) => {
        e.preventDefault();

        const title = document.getElementById("title").value.trim();
        const company = document.getElementById("company").value.trim();
        const location = document.getElementById("location").value.trim();
        const salary = document.getElementById("salary").value.trim();
        const job_type = document.getElementById("jobType").value.trim();
        const description = document.getElementById("description").value.trim();
        const apply_link = document.getElementById("applyLink").value.trim();

        try {
            const response = await fetch("http://localhost:5000/api/jobs/post", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`
                },
                body: JSON.stringify({
                    title,
                    company,
                    location,
                    salary,
                    job_type,
                    description,
                    apply_link
                })
            });

            const data = await response.json();

            if (data.success) {
                alert("Job posted successfully!");
                jobForm.reset();
                window.location.href = "jobs.html";
            } else {
                alert(data.message || "Job posting failed");
            }

        } catch (error) {
            console.error("Job Post Error:", error);
            alert("Server error. Please try again.");
        }
    });
});