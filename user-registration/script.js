const form = document.getElementById("form");
form.addEventListener("submit", function (event) {
  event.preventDefault();
  // check if username at least 6 characters
  const username = form.username.value;
  if (username.length < 6) {
    alert("Username must be at least 6 characters");
    return;
  }

  // check if email is valid
  const email = form.email.value;
  const emailRegex = /\S+@\S+\.\S+/;
  if (!emailRegex.test(email)) {
    alert("Email is not valid");
    return;
  }

  // check if password at least 8 characters, one capital letter, one number
  const password = form.password.value;
  const passwordRegex = /^(?=.*[A-Z])(?=.*[0-9]).{8,}$/;
  if (!passwordRegex.test(password)) {
    alert(
      "Password must be at least 8 characters and contain one capital letter and one number"
    );
    return;
  }

  // success message
  document.getElementById("success-message").innerText = "Registration successful!";
  // clear form
  form.reset();
});
