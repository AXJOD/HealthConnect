// Function to show alerts dynamically (Success/Error messages)
function showAlert(message, type = 'success') {
  const alertDiv = document.createElement('div');
  alertDiv.classList.add('alert', type);
  alertDiv.textContent = message;
  document.body.appendChild(alertDiv);
  
  // Remove alert after 3 seconds
  setTimeout(() => {
    alertDiv.remove();
  }, 3000);
}

// Show confirmation modal before appointment submission
function showConfirmationModal(appointment) {
  const modal = document.getElementById("appointmentModal");
  const modalContent = document.querySelector(".modal-content");
  
  // Populate modal with appointment details
  modalContent.innerHTML = `
    <h3>Confirm Appointment</h3>
    <p>Patient: ${appointment.patient}</p>
    <p>Doctor: ${appointment.doctor}</p>
    <p>Date: ${appointment.date}</p>
    <p>Time: ${appointment.time}</p>
    <button id="confirmBtn">Confirm</button>
    <button id="cancelBtn">Cancel</button>
  `;
  
  modal.style.display = "block";

  document.getElementById("confirmBtn").onclick = () => {
    bookAppointment(appointment);
    modal.style.display = "none";
  };

  document.getElementById("cancelBtn").onclick = () => {
    modal.style.display = "none";
  };
}

// Book Appointment
function bookAppointment(appointment) {
  const appointments = JSON.parse(localStorage.getItem("appointments")) || [];
  appointments.push(appointment);
  localStorage.setItem("appointments", JSON.stringify(appointments));

  showAlert("Appointment booked successfully!", "success");
}

// Event Listener for Appointment Form Submission
const appointmentForm = document.getElementById("appointmentForm");
if (appointmentForm) {
  appointmentForm.addEventListener("submit", function (e) {
    e.preventDefault();

    const name = document.getElementById("name").value.trim();
    const email = document.getElementById("email").value.trim();
    const doctor = document.getElementById("doctor").value.trim();
    const date = document.getElementById("date").value;
    const time = document.getElementById("time").value;

    if (!isValidName(name) || !isValidEmail(email) || !doctor || !date || !time) {
      showAlert("Please fill in all fields correctly.", "error");
      return;
    }

    const appointment = { patient: name, email, doctor, date, time };
    showConfirmationModal(appointment);
  });
}

// Close Modal when clicked outside of it
window.onclick = function(event) {
  const modal = document.getElementById("appointmentModal");
  if (event.target === modal) {
    modal.style.display = "none";
  }
}

// Load Patient Appointments
function loadPatientAppointments() {
  const tableBody = document.querySelector("#patientAppointmentsTable tbody");
  if (!tableBody) return;

  const userEmail = localStorage.getItem("userEmail");
  const allAppointments = JSON.parse(localStorage.getItem("appointments")) || [];

  const userAppointments = allAppointments.filter(app => app.email === userEmail);

  tableBody.innerHTML = userAppointments.length
    ? userAppointments.map(app => `
        <tr>
          <td>${app.doctor}</td>
          <td>${app.date}</td>
          <td>${app.time}</td>
        </tr>
      `).join('')
    : "<tr><td colspan='3'>No appointments found.</td></tr>";
}

// Load Doctor Appointments
function loadDoctorAppointments() {
  const tableBody = document.querySelector("#doctorAppointmentsTable tbody");
  if (!tableBody) return;

  const doctorEmail = localStorage.getItem("userEmail");
  const allAppointments = JSON.parse(localStorage.getItem("appointments")) || [];

  const doctorName = JSON.parse(localStorage.getItem(doctorEmail))?.name;

  const filtered = allAppointments.filter(app => app.doctor === doctorName);

  tableBody.innerHTML = filtered.length
    ? filtered.map(app => `
        <tr>
          <td>${app.patient}</td>
          <td>${app.email}</td>
          <td>${app.date}</td>
          <td>${app.time}</td>
        </tr>
      `).join('')
    : "<tr><td colspan='4'>No appointments found.</td></tr>";
}

// Run on page load
document.addEventListener("DOMContentLoaded", () => {
  loadPatientAppointments();
  loadDoctorAppointments();
});
// Show success/error alert dynamically
function showAlert(message, type = 'success') {
  const alertDiv = document.createElement('div');
  alertDiv.classList.add('alert', type);
  alertDiv.textContent = message;
  document.body.appendChild(alertDiv);
  
  // Remove alert after 3 seconds
  setTimeout(() => {
    alertDiv.remove();
  }, 3000);
}

// Show appointment confirmation modal
function showConfirmationModal(appointment) {
  const modal = document.getElementById("appointmentModal");
  const modalContent = document.querySelector(".modal-content");
  
  // Populate modal with appointment details
  modalContent.innerHTML = `
    <h3>Confirm Appointment</h3>
    <p>Patient: ${appointment.patient}</p>
    <p>Doctor: ${appointment.doctor}</p>
    <p>Date: ${appointment.date}</p>
    <p>Time: ${appointment.time}</p>
    <button id="confirmBtn">Confirm</button>
    <button id="cancelBtn">Cancel</button>
  `;
  
  modal.style.display = "block";

  document.getElementById("confirmBtn").onclick = () => {
    bookAppointment(appointment);
    modal.style.display = "none";
  };

  document.getElementById("cancelBtn").onclick = () => {
    modal.style.display = "none";
  };
}

// Book appointment function
function bookAppointment(appointment) {
  const appointments = JSON.parse(localStorage.getItem("appointments")) || [];
  appointments.push(appointment);
  localStorage.setItem("appointments", JSON.stringify(appointments));

  showAlert("Appointment booked successfully!", "success");
}
