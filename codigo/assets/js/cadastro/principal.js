const BASE_URL = "http://localhost:3000";

const userRegistrationForm = document.querySelector("form#userRegistration");

const nameField = userRegistrationForm.querySelector("#name");
const phoneField = userRegistrationForm.querySelector("#phone");
const cityField = userRegistrationForm.querySelector("#city");
const neighborhoodField = userRegistrationForm.querySelector("#neighborhood");
const professionField = userRegistrationForm.querySelector("#profession");
const emailField = userRegistrationForm.querySelector("#email");
const passwordField = userRegistrationForm.querySelector("#password");

async function buscarUsuarios() {
  const usuarios = await fetch(BASE_URL + "/usuarios").then((response) =>
    response.json()
  );

  return usuarios;
}

async function buscarUsuario(id) {
  const usuarios = await buscarUsuarios();

  const usuario = usuarios.find((u) => u.id == id);

  if (!usuario) {
    alert("Usuário não encontrado!");
    return;
  }

  return usuario;
}

async function cadastrarUsuario(
  name,
  phone,
  city,
  neighborhood,
  profession,
  email,
  password
) {
  const data = {
    name,
    phone,
    city,
    neighborhood,
    profession,
    email,
    password,
  };

  await fetch(BASE_URL + "/usuarios", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });
}

async function editarUsuario(
  id,
  name,
  phone,
  city,
  neighborhood,
  profession,
  email,
  password
) {
  const data = {
    name,
    phone,
    city,
    neighborhood,
    profession,
    email,
    password,
  };

  await fetch(BASE_URL + "/usuarios/" + id, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });
}

async function deletarUsuario(id) {
  await fetch(BASE_URL + "/usuarios/" + id, {
    method: "DELETE",
  });

  alert("Deletado com sucesso!");

  location.reload();
}

userRegistrationForm.addEventListener("submit", (e) => {
  e.preventDefault();

  const urlSearchParams = new URLSearchParams(window.location.search);
  if (urlSearchParams.has("id")) {
    editarUsuario(
      urlSearchParams.get("id"),
      nameField.value,
      phoneField.value,
      cityField.value,
      neighborhoodField.value,
      professionField.value,
      emailField.value,
      passwordField.value
    );

    alert("Usuário editado com sucesso!");
    window.location.href = window.location.pathname;
    return;
  }

  cadastrarUsuario(
    nameField.value,
    phoneField.value,
    cityField.value,
    neighborhoodField.value,
    professionField.value,
    emailField.value,
    passwordField.value
  );

  alert("Usuário cadastrado com sucesso!");

  location.reload();
});
