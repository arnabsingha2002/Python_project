const form = document.querySelector("form");
const eField = form.querySelector(".email");
const eInput = eField.querySelector("input");
const pField = form.querySelector(".password");
const pInput = pField.querySelector("input");

form.addEventListener("submit", async (e) => {
  e.preventDefault(); // Prevent form submission

  // if email and password are blank, add shake class; otherwise, call specified function
  (eInput.value == "") ? eField.classList.add("shake", "error") : checkEmail();
  (pInput.value == "") ? pField.classList.add("shake", "error") : checkPass();

  setTimeout(() => { // remove shake class after 500ms
    eField.classList.remove("shake");
    pField.classList.remove("shake");
  }, 500);

  function checkEmail() { // checkEmail function
    let pattern = /^[^ ]+@[^ ]+\.[a-z]{2,3}$/; // pattern for validating email
    if (!eInput.value.match(pattern) || !eInput.value.endsWith("@ashoka.edu.in")) { // if pattern not matched or email doesn't end with "@ashoka.edu.in", add error and remove valid class
      eField.classList.add("error");
      eField.classList.remove("valid");
      let errorTxt = eField.querySelector(".error-txt");
      // if email value is not empty then show "Please enter a valid email address"; otherwise, show "Email can't be blank"
      (eInput.value != "") ? errorTxt.innerText = "Enter a valid ashoka.edu.in email address" : errorTxt.innerText = "Email can't be blank";
    } else { // if pattern matched and email ends with "@ashoka.edu.in", remove error and add valid class
      eField.classList.remove("error");
      eField.classList.add("valid");
    }
  }

  function checkPass() { // checkPass function
    if (pInput.value == "") { // if password is empty, add error and remove valid class
      pField.classList.add("error");
      pField.classList.remove("valid");
    } else { // if password is not empty, remove error and add valid class
      pField.classList.remove("error");
      pField.classList.add("valid");
    }
  }

  // if eField and pField don't contain error class, that means user filled in details properly
  if (!eField.classList.contains("error") && !pField.classList.contains("error")) {
    const loginData = {
      email: eInput.value,
      password: pInput.value
    };

    try {
      // Send form data to backend for authentication
      const response = await fetch("/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json" // Set content type to JSON
        },
        body: JSON.stringify(loginData) // Convert data to JSON format
      });

      if (response.redirected) {
        window.location.href = response.url;
      } else if (response.status === 401) {
        throw new Error("Invalid credentials");
      } else {
        throw new Error("Failed to login");
      }
    } catch (error) {
      console.error("Error logging in:", error);
      alert(error.message || "Failed to login. Please try again.");
    }
  }
});
