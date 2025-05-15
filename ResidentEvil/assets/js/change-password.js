        document.addEventListener('DOMContentLoaded', function() {
            // Back button functionality
            document.getElementById('backButton').addEventListener('click', function() {
                window.location.href = 'dashboard.html';
            });
            
            const form = document.getElementById('changePasswordForm');
            const currentPassword = document.getElementById('currentPassword');
            const newPassword = document.getElementById('newPassword');
            const confirmPassword = document.getElementById('confirmPassword');
            const currentPasswordError = document.getElementById('currentPasswordError');
            const newPasswordError = document.getElementById('newPasswordError');
            const confirmPasswordError = document.getElementById('confirmPasswordError');
            const successMessage = document.getElementById('successMessage');
            
            // Password validation function
            function validatePassword(password) {
                const minLength = 8;
                const maxLength = 16;
                const hasUpperCase = /[A-Z]/.test(password);
                const hasLowerCase = /[a-z]/.test(password);
                const hasNumber = /[0-9]/.test(password);
                const hasSpecialChar = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(password);
                
                if (password.length < minLength) {
                    return "Password must be at least 8 characters long";
                }
                if (password.length > maxLength) {
                    return "Password must not exceed 16 characters";
                }
                if (!hasUpperCase) {
                    return "Password must include at least one uppercase letter";
                }
                if (!hasLowerCase) {
                    return "Password must include at least one lowercase letter";
                }
                if (!hasNumber) {
                    return "Password must include at least one number";
                }
                if (!hasSpecialChar) {
                    return "Password must include at least one special character";
                }
                
                return ""; // Empty string means validation passed
            }
            
            // Form submission handler
            form.addEventListener('submit', function(event) {
                event.preventDefault();
                
                // Reset error messages
                currentPasswordError.style.display = 'none';
                newPasswordError.style.display = 'none';
                confirmPasswordError.style.display = 'none';
                
                // Reset error styling
                currentPassword.classList.remove('error-field');
                newPassword.classList.remove('error-field');
                confirmPassword.classList.remove('error-field');
                
                let hasError = false;
                
                // Check for empty fields first
                if (currentPassword.value.trim() === '') {
                    currentPasswordError.textContent = "Current password is required";
                    currentPasswordError.style.display = 'block';
                    currentPassword.classList.add('error-field');
                    hasError = true;
                }
                
                if (newPassword.value.trim() === '') {
                    newPasswordError.textContent = "New password is required";
                    newPasswordError.style.display = 'block';
                    newPassword.classList.add('error-field');
                    hasError = true;
                }
                
                if (confirmPassword.value.trim() === '') {
                    confirmPasswordError.textContent = "Password confirmation is required";
                    confirmPasswordError.style.display = 'block';
                    confirmPassword.classList.add('error-field');
                    hasError = true;
                }
                
                // If any field is empty, stop validation here
                if (hasError) {
                    return;
                }
                
                // Validate new password
                const passwordValidationResult = validatePassword(newPassword.value);
                if (passwordValidationResult) {
                    newPasswordError.textContent = passwordValidationResult;
                    newPasswordError.style.display = 'block';
                    newPassword.classList.add('error-field');
                    hasError = true;
                }
                
                // Validate password confirmation
                if (newPassword.value !== confirmPassword.value) {
                    confirmPasswordError.textContent = 'Passwords do not match';
                    confirmPasswordError.style.display = 'block';
                    confirmPassword.classList.add('error-field');
                    hasError = true;
                }
                
                // If no errors, submit the form
                if (!hasError) {
                    // Here you would normally send the data to your server
                    // For this demo, we'll just show the success message
                    form.style.display = 'none';
                    successMessage.style.display = 'block';
                }
            });
            
            // Add session option handlers
            document.getElementById('stayLoggedIn').addEventListener('click', function() {
                // In a real application, you might make an API call to maintain the session
                alert('You will remain logged in to your account.');
                // Redirect to dashboard or account page
                window.location.href = 'dashboard.html';
            });
            
            document.getElementById('logOut').addEventListener('click', function() {
                // In a real application, you'd make an API call to end the session
                alert('You will be redirected to the login page.');
                // Redirect to login page
                window.location.href = 'login.html';
            });
            
            // Add input event listeners to clear error messages when user starts typing
            currentPassword.addEventListener('input', function() {
                currentPasswordError.style.display = 'none';
                currentPassword.classList.remove('error-field');
            });
            
            newPassword.addEventListener('input', function() {
                newPasswordError.style.display = 'none';
                newPassword.classList.remove('error-field');
            });
            
            confirmPassword.addEventListener('input', function() {
                confirmPasswordError.style.display = 'none';
                confirmPassword.classList.remove('error-field');
            });
        });