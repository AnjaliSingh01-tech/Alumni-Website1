document.addEventListener("DOMContentLoaded", async () => {
    const storiesContainer = document.getElementById("storiesContainer");
    const searchInput = document.getElementById("searchInput");

    let storiesData = [];

    // FETCH STORIES
    try {
        const response = await fetch("http://alumni-backend-folder.onrender.com/api/success-stories");

        const data = await response.json();

        if (!data.success) {
            storiesContainer.innerHTML = "<p>Failed to load success stories.</p>";
            return;
        }

        storiesData = data.stories;
        displayStories(storiesData);

    } catch (error) {
        console.error("Success Stories Fetch Error:", error);
        storiesContainer.innerHTML = "<p>Server error. Please try again.</p>";
    }

    // DISPLAY STORIES
    function displayStories(stories) {
        if (!stories || stories.length === 0) {
            storiesContainer.innerHTML = "<p>No success stories found.</p>";
            return;
        }

        storiesContainer.innerHTML = stories.map(story => `
            <div class="story-card">

                ${
                    story.profile_photo
                        ? `<img src="${story.profile_photo}" alt="${story.alumni_name}" class="story-image">`
                        : ""
                }

                <h3>${story.alumni_name}</h3>

                <p><strong>Graduation Year:</strong> ${story.graduation_year || "Not Added"}</p>
                <p><strong>Course:</strong> ${story.course || "Not Added"}</p>
                <p><strong>Company:</strong> ${story.company}</p>
                <p><strong>Role:</strong> ${story.job_role}</p>
                <p><strong>Achievement:</strong> ${story.achievement}</p>
                <p><strong>Posted By:</strong> ${story.posted_by_name || "Unknown"}</p>

                ${
                    story.linkedin
                        ? `<a href="${story.linkedin}" target="_blank">Connect on LinkedIn</a>`
                        : ""
                }

            </div>
        `).join("");
    }

    // SEARCH FILTER
    searchInput.addEventListener("input", () => {
        const searchValue = searchInput.value.toLowerCase();

        const filteredStories = storiesData.filter(story =>
            (story.alumni_name && story.alumni_name.toLowerCase().includes(searchValue)) ||
            (story.company && story.company.toLowerCase().includes(searchValue)) ||
            (story.course && story.course.toLowerCase().includes(searchValue))
        );

        displayStories(filteredStories);
    });
});