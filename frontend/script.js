// Navbar Shadow + Animate on Scroll
window.addEventListener('scroll', () => {
    const navbar = document.querySelector('.navbar');
    navbar.classList.toggle('shadow', window.scrollY > 50);

    // Animate elements on scroll
    document.querySelectorAll('.animate').forEach(el => {
        const rect = el.getBoundingClientRect();
        if (rect.top < window.innerHeight - 100) {
            el.classList.add('visible');
        }
    });
});

// Mobile Menu Toggle
function toggleMenu() {
    document.getElementById('navLinks').classList.toggle('active');
}

// Process Payment
function processPayment() {
    const amount = document.getElementById("payment-amount").value;
    
    if (!amount || amount <= 0) {
        alert("Please enter a valid amount.");
        return;
    }

    alert("Payment of ₹" + amount + " has been processed successfully!");

    // Enable submit button after payment
    document.getElementById("submitForm").disabled = false;

    // Update Payment section
    document.getElementById("payment").innerHTML = `
        <p style="color: green; font-weight: bold;">Payment of ₹${amount} successful! Your service request is confirmed.</p>
    `;
}

// Handle Form Submission
document.getElementById("serviceForm").addEventListener("submit", async function (event) {
    event.preventDefault();

    const name = document.getElementById("name").value.trim();
    const email = document.getElementById("email").value.trim();
    const service = document.getElementById("service").value;
    const location = document.getElementById("location").value.trim();

    if (!name || !email || !service || !location) {
        alert("Please fill all fields correctly.");
        return;
    }

    try {
        const response = await fetch("http://localhost:5000/api/request-service", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ name, email, service, location }),
        });

        const result = await response.json();

        if (result.success) {
            alert(result.message);
            document.getElementById("serviceForm").reset();
            document.getElementById("submitForm").disabled = true;
        } else {
            alert("Failed to submit service request. Please try again.");
        }
    } catch (error) {
        console.error("Error:", error);
        alert("Something went wrong. Please try again later.");
    }
});

// Google Map Initialization with Live Location
function initMap() {
    let initialLocation = new google.maps.LatLng(37.7749, -122.4194); // Default (San Francisco)

    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
            (position) => {
                initialLocation = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);
                updateMap(initialLocation);
            },
            () => {
                updateMap(initialLocation);
            }
        );
    } else {
        updateMap(initialLocation);
    }

    function updateMap(location) {
        const mapOptions = {
            zoom: 12,
            center: location,
        };
        const map = new google.maps.Map(document.getElementById("map-canvas"), mapOptions);

        new google.maps.Marker({
            position: location,
            map: map,
            title: "Your Location",
        });
    }
}
