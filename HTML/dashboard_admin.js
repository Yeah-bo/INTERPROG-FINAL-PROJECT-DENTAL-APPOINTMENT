// Get references to elements
const contentArea = document.getElementById('content-area');
const homeBtn = document.getElementById('home-btn');
const scheduleBtn = document.getElementById('schedule-btn');
const requestBtn = document.getElementById('request-btn');
const logoutBtn = document.getElementById('logout-btn');

// Function to load content based on button click
function loadContent(content) {
    contentArea.innerHTML = content;
}

// HOME button click
homeBtn.addEventListener('click', () => {
    const homeContent = `
        <h2>HOME - Dashboard Overview</h2>
        <p>Welcome back, Admin! Here's a quick overview:</p>
        <ul>
            <li>Total Patients: 150</li>
            <li>Today's Appointments: 25</li>
            <li>Pending Requests: 5</li>
        </ul>
        <p>Use the sidebar to navigate to specific sections.</p>
    `;
    loadContent(homeContent);
});

// SCHEDULE FOR TODAY button click
scheduleBtn.addEventListener('click', () => {
    const scheduleContent = `
        <h2>SCHEDULE FOR TODAY</h2>
        <table border="1" style="width: 100%; color: white;">
            <thead>
                <tr>
                    <th>Time</th>
                    <th>Patient Name</th>
                    <th>Appointment Type</th>
                </tr>
            </thead>
            <tbody>
                <tr><td>9:00 AM</td><td>John Doe</td><td>Check-up</td></tr>
                <tr><td>10:30 AM</td><td>Jane Smith</td><td>Consultation</td></tr>
                <tr><td>2:00 PM</td><td>Bob Johnson</td><td>Follow-up</td></tr>
                <!-- Add more rows as needed -->
            </tbody>
        </table>
    `;
    loadContent(scheduleContent);
});

// REQUEST button click
requestBtn.addEventListener('click', () => {
    const requestContent = `
        <h2>PENDING REQUESTS</h2>
        <ul style="color: white;">
            <li>Request 1: New patient registration - Status: Pending</li>
            <li>Request 2: Appointment reschedule - Status: Approved</li>
            <li>Request 3: Medical record update - Status: In Review</li>
        </ul>
        <p>Click on a request to manage it.</p>
    `;
    loadContent(requestContent);
});

// LOGOUT button click
logoutBtn.addEventListener('click', () => {
    // For demo: Alert and redirect to login page
    alert('Logging out...');
    window.location.href = 'login.html'; // Replace with your login page URL
    // If using backend, add session clearing here
});