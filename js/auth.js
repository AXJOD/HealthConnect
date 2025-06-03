// --- HealthConnect Authentication Logic ---
// This file handles user signup and login using localStorage for demo purposes.
// In a real app, use a backend for secure authentication!

// Get all users from localStorage, or start with an empty array
const users = JSON.parse(localStorage.getItem('users')) || [];

// Wait for the DOM to be fully loaded before attaching event listeners
// This ensures the form elements exist before we try to use them

document.addEventListener('DOMContentLoaded', () => {
    // --- Signup Logic ---
    // Handles new user registration
    const signupForm = document.getElementById('signupForm');
    if (signupForm) {
        signupForm.addEventListener('submit', (e) => {
            e.preventDefault(); // Prevent form from submitting normally
            // Get form values
            const name = document.getElementById('signupName').value;
            const email = document.getElementById('signupEmail').value;
            const password = document.getElementById('signupPassword').value;
            const role = document.getElementById('signupRole').value;
            const doctorName = role === 'doctor' ? document.getElementById('doctorNameField').value : '';

            // Check if a user with this email already exists
            if (users.some(user => user.email === email)) {
                alert('Account already exists! Please login instead.');
                window.location.href = 'login.html';
                return;
            }

            // Create a new user object
            const newUser = {
                name,
                email,
                password,
                role,
                doctorName: role === 'doctor' ? doctorName : null
            };

            // Add the new user to the users array and save to localStorage
            users.push(newUser);
            localStorage.setItem('users', JSON.stringify(users));

            // Store the current user in localStorage (for session)
            localStorage.setItem('currentUser', JSON.stringify(newUser));

            // Redirect to the correct dashboard based on role
            window.location.href = role === 'doctor' ? 'doctor-dashboard.html' : 'patient-dashboard.html';
        });
    }

    // --- Login Logic ---
    // Handles user login
    const loginForm = document.getElementById('loginForm');
    if (loginForm) {
        loginForm.addEventListener('submit', (e) => {
            e.preventDefault(); // Prevent form from submitting normally
            // Get form values
            const email = document.getElementById('loginEmail').value;
            const password = document.getElementById('loginPassword').value;

            // Find a user with matching email and password
            const user = users.find(u => u.email === email && u.password === password);

            if (user) {
                // Store the current user in localStorage (for session)
                localStorage.setItem('currentUser', JSON.stringify(user));
                // Redirect to the correct dashboard based on role
                window.location.href = user.role === 'doctor' ? 'doctor-dashboard.html' : 'patient-dashboard.html';
            } else {
                alert('Invalid email or password!');
            }
        });
    }
}); 