/*===== LOGIN SHOW and HIDDEN =====*/
const signUp = document.getElementById('sign-up'),
    signIn = document.getElementById('sign-in'),
    loginIn = document.getElementById('login-in'),
    loginUp = document.getElementById('login-up'),
    signinButton = document.getElementById('signin-button'),
    signupButton = document.getElementById('signup-button');

// Function to switch to Sign Up form
signUp.addEventListener('click', () => {
    loginIn.classList.add('none');
    loginUp.classList.remove('none');
});

// Function to switch to Sign In form
signIn.addEventListener('click', () => {
    loginUp.classList.add('none');
    loginIn.classList.remove('none');
});

// Handle Sign In
signinButton.addEventListener('click', async (e) => {
    e.preventDefault(); // Prevent default anchor behavior
    const email = document.getElementById('signin-email').value;
    const password = document.getElementById('signin-password').value;

    try {
        // Firebase authentication
        await signInWithEmailAndPassword(auth, email, password);
        // Redirect to index.html after successful sign-in
        window.location.href = "product.html"; // This line handles the redirection
    } catch (error) {
        alert("Error signing in: " + error.message);
    }
});

// Handle Sign Up
signupButton.addEventListener('click', async (e) => {
    e.preventDefault(); // Prevent default anchor behavior
    const email = document.getElementById('signup-email').value;
    const password = document.getElementById('signup-password').value;

    try {
        // Firebase authentication
        await createUserWithEmailAndPassword(auth, email, password);
        // Optionally redirect or alert user
        alert("Account created successfully! You can now sign in.");
        loginUp.classList.add('none');
        loginIn.classList.remove('none');
    } catch (error) {
        alert("Error creating account: " + error.message);
    }
});
