document.addEventListener("DOMContentLoaded", async () => {
    const noticesContainer = document.getElementById("noticesContainer");
    const searchInput = document.getElementById("searchInput");

    let noticesData = [];

    // FETCH NOTICES
    try {
        const response = await fetch("http://localhost:5000/api/notices");

        const data = await response.json();

        if (!data.success) {
            noticesContainer.innerHTML = "<p>Failed to load notices.</p>";
            return;
        }

        noticesData = data.notices;
        displayNotices(noticesData);

    } catch (error) {
        console.error("Notices Fetch Error:", error);
        noticesContainer.innerHTML = "<p>Server error. Please try again.</p>";
    }

    // DISPLAY NOTICES
    function displayNotices(notices) {
        if (!notices || notices.length === 0) {
            noticesContainer.innerHTML = "<p>No notices found.</p>";
            return;
        }

        noticesContainer.innerHTML = notices.map(notice => `
            <div class="notice-card">

                <div class="notice-category">${notice.category}</div>

                <h3>${notice.title}</h3>

                <p><strong>Message:</strong> ${notice.message}</p>
                <p><strong>Posted By:</strong> ${notice.posted_by_name || "Unknown"}</p>
                <p><strong>Date:</strong> ${new Date(notice.created_at).toLocaleDateString()}</p>

            </div>
        `).join("");
    }

    // SEARCH FILTER
    searchInput.addEventListener("input", () => {
        const searchValue = searchInput.value.toLowerCase();

        const filteredNotices = noticesData.filter(notice =>
            (notice.title && notice.title.toLowerCase().includes(searchValue)) ||
            (notice.category && notice.category.toLowerCase().includes(searchValue))
        );

        displayNotices(filteredNotices);
    });
});