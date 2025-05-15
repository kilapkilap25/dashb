// Toggle password visibility
function togglePassword() {
  const passwordInput = document.getElementById('login-pass');
  const eyeIcon = document.getElementById('eye-icon');

  if (passwordInput.type === 'password') {
    passwordInput.type = 'text'; // Show password
    eyeIcon.classList.remove('fa-eye'); // Change icon
    eyeIcon.classList.add('fa-eye-slash');
  } else {
    passwordInput.type = 'password'; // Hide password
    eyeIcon.classList.remove('fa-eye-slash'); // Change icon back
    eyeIcon.classList.add('fa-eye');
  }
}

// Function to handle login and redirect to dashboard
function handleLogin(event) {
  event.preventDefault();
  // You can add validation/authentication here if needed
  window.location.href = 'dashboard.html';
}

// Attach the handler to the login form
document.addEventListener('DOMContentLoaded', function() {
  const loginForm = document.getElementById('loginForm');
  if (loginForm) {
    loginForm.addEventListener('submit', handleLogin);
  }
});

