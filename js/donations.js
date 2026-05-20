document.addEventListener("DOMContentLoaded", async () => {
    const donationsContainer = document.getElementById("donationsContainer");
    const searchInput = document.getElementById("searchInput");

    let donationsData = [];

    // FETCH DONATIONS
    try {
        const response = await fetch("http://alumni-backend-folder.onrender.com/api/donations");

        const data = await response.json();

        if (!data.success) {
            donationsContainer.innerHTML = "<p>Failed to load donations.</p>";
            return;
        }

        donationsData = data.donations;
        displayDonations(donationsData);

    } catch (error) {
        console.error("Donations Fetch Error:", error);
        donationsContainer.innerHTML = "<p>Server error. Please try again.</p>";
    }

    // DISPLAY DONATIONS
    function displayDonations(donations) {
        if (!donations || donations.length === 0) {
            donationsContainer.innerHTML = "<p>No donations found.</p>";
            return;
        }

        donationsContainer.innerHTML = donations.map(donation => `
            <div class="donation-card">

                <h3>${donation.donor_name}</h3>

                <div class="amount">₹${Number(donation.amount).toLocaleString()}</div>

                <p><strong>Purpose:</strong> ${donation.purpose}</p>
                <p><strong>Message:</strong> ${donation.message || "No message"}</p>
                <p><strong>Posted By:</strong> ${donation.posted_by_name || "Unknown"}</p>
                <p><strong>Date:</strong> ${new Date(donation.created_at).toLocaleDateString()}</p>

            </div>
        `).join("");
    }

    // SEARCH FILTER
    searchInput.addEventListener("input", () => {
        const searchValue = searchInput.value.toLowerCase();

        const filteredDonations = donationsData.filter(donation =>
            (donation.donor_name && donation.donor_name.toLowerCase().includes(searchValue)) ||
            (donation.purpose && donation.purpose.toLowerCase().includes(searchValue))
        );

        displayDonations(filteredDonations);
    });
});