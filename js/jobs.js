document.addEventListener("DOMContentLoaded", async () => {
    const token = localStorage.getItem("token");
    const jobsContainer = document.getElementById("jobsContainer");
    const searchInput = document.getElementById("searchInput");

    if (!token) {
        alert("Please login first.");
        window.location.href = "login.html";
        return;
    }

    let jobsData = [];

    // FETCH JOBS
    try {
        const response = await fetch("http://localhost:5000/api/jobs", {
            method: "GET",
            headers: {
                "Authorization": `Bearer ${token}`,
                "Content-Type": "application/json"
            }
        });

        const data = await response.json();

        if (!data.success) {
            jobsContainer.innerHTML = "<p>Failed to load jobs.</p>";
            return;
        }

        jobsData = data.jobs;
        displayJobs(jobsData);

    } catch (error) {
        console.error("Jobs Fetch Error:", error);
        jobsContainer.innerHTML = "<p>Server error. Please try again.</p>";
    }

    // DISPLAY JOBS
    function displayJobs(jobs) {
        if (!jobs || jobs.length === 0) {
            jobsContainer.innerHTML = "<p>No jobs found.</p>";
            return;
        }

        jobsContainer.innerHTML = jobs.map(job => `
            <div class="job-card">
                <h3>${job.title}</h3>
                <p><strong>Company:</strong> ${job.company}</p>
                <p><strong>Location:</strong> ${job.location}</p>
                <p><strong>Salary:</strong> ${job.salary || "Not Mentioned"}</p>
                <p><strong>Type:</strong> ${job.job_type || "Not Mentioned"}</p>
                <p><strong>Description:</strong> ${job.description}</p>
                <p><strong>Posted By:</strong> ${job.posted_by_name || "Unknown"}</p>
                <p><strong>Date:</strong> ${new Date(job.created_at).toLocaleDateString()}</p>

                ${
                    job.apply_link
                        ? `<a href="${job.apply_link}" target="_blank">Apply Now</a>`
                        : ""
                }
            </div>
        `).join("");
    }

    // SEARCH FILTER
    searchInput.addEventListener("input", () => {
        const searchValue = searchInput.value.toLowerCase();

        const filteredJobs = jobsData.filter(job =>
            (job.title && job.title.toLowerCase().includes(searchValue)) ||
            (job.company && job.company.toLowerCase().includes(searchValue)) ||
            (job.location && job.location.toLowerCase().includes(searchValue))
        );

        displayJobs(filteredJobs);
    });
});