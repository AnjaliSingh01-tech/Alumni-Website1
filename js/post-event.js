document.addEventListener("DOMContentLoaded", () => {
    const eventForm = document.getElementById("eventForm");

    if (!eventForm) return;

    const token = localStorage.getItem("token");

    if (!token) {
        alert("Please login first.");
        window.location.href = "login.html";
        return;
    }

    eventForm.addEventListener("submit", async (e) => {
        e.preventDefault();

        const title = document.getElementById("title").value.trim();
        const organizer = document.getElementById("organizer").value.trim();
        const event_date = document.getElementById("eventDate").value;
        const event_time = document.getElementById("eventTime").value;
        const location = document.getElementById("location").value.trim();
        const description = document.getElementById("description").value.trim();
        const registration_link = document.getElementById("registrationLink").value.trim();

        try {
            const response = await fetch("http://localhost:5000/api/events/post", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`
                },
                body: JSON.stringify({
                    title,
                    organizer,
                    event_date,
                    event_time,
                    location,
                    description,
                    registration_link
                })
            });

            const data = await response.json();

            if (data.success) {
                alert("Event posted successfully!");
                eventForm.reset();
                window.location.href = "events.html";
            } else {
                alert(data.message || "Event posting failed");
            }

        } catch (error) {
            console.error("Event Post Error:", error);
            alert("Server error. Please try again.");
        }
    });
});