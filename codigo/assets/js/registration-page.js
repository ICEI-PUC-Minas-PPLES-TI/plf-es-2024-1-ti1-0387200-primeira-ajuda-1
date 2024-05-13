const userRegistrationForm = document.querySelector("form#userRegistration");

userRegistrationForm.addEventListener("submit", (e) => {
  e.preventDefault();

  const name = userRegistrationForm.querySelector("#name").value;
  const phone = userRegistrationForm.querySelector("#phone").value;
  const city = userRegistrationForm.querySelector("#city").value;
  const profession = userRegistrationForm.querySelector("#profession").value;
  const email = userRegistrationForm.querySelector("#email").value;
  const password = userRegistrationForm.querySelector("#password").value;

  const data = {
    name,
    phone,
    city,
    profession,
    email,
    password,
  };

  localStorage.setItem("userRegistration", JSON.stringify(data));

  alert("Usuário registrado com sucesso!");

  userRegistrationForm.reset();
});
