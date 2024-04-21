const form = document.querySelector("form");

form.addEventListener("submit", async (e) => {
  e.preventDefault(); // Prevent form submission

  // Get form input values
  const email = form.querySelector(".email").value;
  const password = form.querySelector(".password").value;
  const confirmPassword = form.querySelector(".cPassword").value;

  // Perform client-side validation
  const emailPattern = /^[^ ]+@[^ ]+\.[a-z]{2,3}$/;
  const ashokaEmailPattern = /^[^ ]+@ashoka\.edu\.in$/;
  const passPattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

  if (!email.match(emailPattern) || !email.match(ashokaEmailPattern)) {
    return alert("Please enter a valid ashoka email");
  }

  if (!password.match(passPattern)) {
    return alert("Please enter a password with at least 8 characters, including uppercase, lowercase, digits, and special characters.");
  }

  if (password !== confirmPassword) {
    return alert("Passwords do not match");
  }

  try {
    // Send form data to backend
    const response = await fetch("/signup", {
      method: "POST",
      headers: {
        "Content-Type": "application/json" // Set content type to JSON
      },
      body: JSON.stringify({ email, password }) // Convert data to JSON format
    });

    if (!response.ok) {
      const errorMessage = await response.text();
      throw new Error(`Failed to register user: ${errorMessage}`);
    }

    // Redirect to login page after successful signup
    window.location.href = "/login";
  } catch (error) {
    console.error("Error registering user:", error);
    alert(error.message || "Failed to register user. Please try again later.");
  }
});

// Hide and show password
const eyeIcons = document.querySelectorAll(".show-hide");

eyeIcons.forEach((eyeIcon) => {
  eyeIcon.addEventListener("click", () => {
    const pInput = eyeIcon.parentElement.querySelector("input");
    if (pInput.type === "password") {
      eyeIcon.classList.replace("bx-hide", "bx-show");
      return (pInput.type = "text");
    }
    eyeIcon.classList.replace("bx-show", "bx-hide");
    pInput.type = "password";
  });
});
