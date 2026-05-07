document.addEventListener("DOMContentLoaded", async () => {
    const token = localStorage.getItem("token");
    const eventsContainer = document.getElementById("eventsContainer");
    const searchInput = document.getElementById("searchInput");

    if (!token) {
        alert("Please login first.");
        window.location.href = "login.html";
        return;
    }

    let eventsData = [];

    // FETCH EVENTS
    try {
        const response = await fetch("http://localhost:5000/api/events", {
            method: "GET",
            headers: {
                "Authorization": `Bearer ${token}`,
                "Content-Type": "application/json"
            }
        });

        const data = await response.json();

        if (!data.success) {
            eventsContainer.innerHTML = "<p>Failed to load events.</p>";
            return;
        }

        eventsData = data.events;
        displayEvents(eventsData);

    } catch (error) {
        console.error("Events Fetch Error:", error);
        eventsContainer.innerHTML = "<p>Server error. Please try again.</p>";
    }

    // DISPLAY EVENTS
    function displayEvents(events) {
        if (!events || events.length === 0) {
            eventsContainer.innerHTML = "<p>No events found.</p>";
            return;
        }

        eventsContainer.innerHTML = events.map(event => `
            <div class="event-card">
                <h3>${event.title}</h3>
                <p><strong>Organizer:</strong> ${event.organizer}</p>
                <p><strong>Date:</strong> ${new Date(event.event_date).toLocaleDateString()}</p>
                <p><strong>Time:</strong> ${event.event_time}</p>
                <p><strong>Location:</strong> ${event.location}</p>
                <p><strong>Description:</strong> ${event.description}</p>
                <p><strong>Posted By:</strong> ${event.posted_by_name || "Unknown"}</p>

                ${
                    event.registration_link
                        ? `<a href="${event.registration_link}" target="_blank">Register Now</a>`
                        : ""
                }
            </div>
        `).join("");
    }

    // SEARCH FILTER
    searchInput.addEventListener("input", () => {
        const searchValue = searchInput.value.toLowerCase();

        const filteredEvents = eventsData.filter(event =>
            (event.title && event.title.toLowerCase().includes(searchValue)) ||
            (event.organizer && event.organizer.toLowerCase().includes(searchValue)) ||
            (event.location && event.location.toLowerCase().includes(searchValue))
        );

        displayEvents(filteredEvents);
    });
});