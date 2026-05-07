document.addEventListener("DOMContentLoaded", () => {
    const noticeForm = document.getElementById("noticeForm");

    if (!noticeForm) return;

    const token = localStorage.getItem("token");

    if (!token) {
        alert("Please login first.");
        window.location.href = "login.html";
        return;
    }

    noticeForm.addEventListener("submit", async (e) => {
        e.preventDefault();

        const title = document.getElementById("title").value.trim();
        const category = document.getElementById("category").value.trim();
        const message = document.getElementById("message").value.trim();

        try {
            const response = await fetch("http://localhost:5000/api/notices/post", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`
                },
                body: JSON.stringify({
                    title,
                    category,
                    message
                })
            });

            const data = await response.json();

            if (data.success) {
                alert("Notice posted successfully!");
                noticeForm.reset();
                window.location.href = "notices.html";
            } else {
                alert(data.message || "Notice posting failed");
            }

        } catch (error) {
            console.error("Notice Post Error:", error);
            alert("Server error. Please try again.");
        }
    });
});