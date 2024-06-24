const userRegistrationForm = document.querySelector("form#userRegistration");

const nameField = userRegistrationForm.querySelector("#name");
const phoneField = userRegistrationForm.querySelector("#phone");
const cityField = userRegistrationForm.querySelector("#city");
const neighborhoodField = userRegistrationForm.querySelector("#neighborhood");
const professionField = userRegistrationForm.querySelector("#profession");
const emailField = userRegistrationForm.querySelector("#email");
const passwordField = userRegistrationForm.querySelector("#password");

function buscarUsuarios() {
  const localStorageUsuarios = localStorage.getItem("usuarios");
  const usuarios = localStorageUsuarios ? JSON.parse(localStorageUsuarios) : [];

  return usuarios;
}

function buscarUsuario(id) {
  const usuarios = buscarUsuarios();

  const usuario = usuarios.find((u) => u.id == id);

  if (!usuario) {
    alert("Usuário não encontrado!");
    return;
  }

  return usuario;
}

function cadastrarUsuario(
  name,
  phone,
  city,
  neighborhood,
  profession,
  email,
  password
) {
  const usuarios = buscarUsuarios();

  usuarios.push({
    id: usuarios.length + 1,
    name,
    phone,
    city,
    neighborhood,
    profession,
    email,
    password,
  });

  localStorage.setItem("usuarios", JSON.stringify(usuarios));
}

function editarUsuario(
  id,
  name,
  phone,
  city,
  neighborhood,
  profession,
  email,
  password
) {
  const usuarios = buscarUsuarios();

  for (let i = 0; i < usuarios.length; i++) {
    if (usuarios[i].id == id) {
      usuarios[i] = {
        id,
        name,
        phone,
        city,
        neighborhood,
        profession,
        email,
        password,
      };

      break;
    }
  }

  localStorage.setItem("usuarios", JSON.stringify(usuarios));
}

function deletarUsuario(id) {
  const usuarios = buscarUsuarios();

  const novaListaUsuarios = usuarios.filter((u) => u.id != id);

  localStorage.setItem("usuarios", JSON.stringify(novaListaUsuarios));
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
