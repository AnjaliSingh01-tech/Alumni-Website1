document.addEventListener("DOMContentLoaded", async () => {
    const token = localStorage.getItem("token");
    const alumniContainer = document.getElementById("alumniContainer");
    const searchInput = document.getElementById("searchInput");

    if (!token) {
        alert("Please login first.");
        window.location.href = "login.html";
        return;
    }

    let alumniData = [];

    // FETCH ALUMNI
    try {
        const response = await fetch("http://localhost:5000/api/alumni", {
            method: "GET",
            headers: {
                "Authorization": `Bearer ${token}`,
                "Content-Type": "application/json"
            }
        });

        const data = await response.json();

        if (!data.success) {
            alumniContainer.innerHTML = "<p>Failed to load alumni.</p>";
            return;
        }

        alumniData = data.alumni;
        displayAlumni(alumniData);

    } catch (error) {
        console.error("Alumni Fetch Error:", error);
        alumniContainer.innerHTML = "<p>Server error. Please try again.</p>";
    }

    // DISPLAY FUNCTION
    function displayAlumni(alumni) {
        if (alumni.length === 0) {
            alumniContainer.innerHTML = "<p>No alumni found.</p>";
            return;
        }

        alumniContainer.innerHTML = alumni.map(user => `
            <div class="alumni-card">
                <h3>${user.name}</h3>
                <p><strong>Email:</strong> ${user.email}</p>
                <p><strong>Graduation Year:</strong> ${user.graduation_year || "Not Added"}</p>
                <p><strong>Course:</strong> ${user.course || "Not Added"}</p>
                <p><strong>College:</strong> ${user.college || "Not Added"}</p>
                <p><strong>Skills:</strong> ${user.skills || "Not Added"}</p>
                <p><strong>Bio:</strong> ${user.bio || "Not Added"}</p>
                <p><strong>LinkedIn:</strong> 
                    ${user.linkedin 
                        ? `<a href="${user.linkedin}" target="_blank">View Profile</a>` 
                        : "Not Added"}
                </p>
            </div>
        `).join("");
    }

    // SEARCH FILTER
    searchInput.addEventListener("input", () => {
        const searchValue = searchInput.value.toLowerCase();

        const filteredAlumni = alumniData.filter(user =>
            (user.name && user.name.toLowerCase().includes(searchValue)) ||
            (user.course && user.course.toLowerCase().includes(searchValue)) ||
            (user.college && user.college.toLowerCase().includes(searchValue))
        );

        displayAlumni(filteredAlumni);
    });
});