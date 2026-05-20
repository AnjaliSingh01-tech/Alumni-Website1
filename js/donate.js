document.addEventListener("DOMContentLoaded", () => {
    const donationForm = document.getElementById("donationForm");

    if (!donationForm) return;

    const token = localStorage.getItem("token");

    if (!token) {
        alert("Please login first.");
        window.location.href = "login.html";
        return;
    }

    donationForm.addEventListener("submit", async (e) => {
        e.preventDefault();

        const donor_name = document.getElementById("donorName").value.trim();
        const amount = document.getElementById("amount").value.trim();
        const purpose = document.getElementById("purpose").value.trim();
        const message = document.getElementById("message").value.trim();

        try {
            const response = await fetch("http://alumni-backend-folder.onrender.com/api/donations/post", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`
                },
                body: JSON.stringify({
                    donor_name,
                    amount,
                    purpose,
                    message
                })
            });

            const data = await response.json();

            if (data.success) {
                alert("Donation submitted successfully!");
                donationForm.reset();
                window.location.href = "donations.html";
            } else {
                alert(data.message || "Donation failed");
            }

        } catch (error) {
            console.error("Donation Error:", error);
            alert("Server error. Please try again.");
        }
    });
});