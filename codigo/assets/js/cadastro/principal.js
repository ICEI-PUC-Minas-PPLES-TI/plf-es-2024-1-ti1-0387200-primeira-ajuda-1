import { CadastroService } from "../../services/cadastroService.js";

const cadastroService = new CadastroService()
const consultarSeletor = (variante) => document.querySelector(variante)

const form = consultarSeletor("form")
const senha = consultarSeletor("#senha")
const telefone = consultarSeletor("#telefone")
const confirmaSenha = consultarSeletor("#confirmaSenha")

telefone.addEventListener('input', ({ target }) => {
  let valor = target.value.replace(/\D/g, '')
  let valorFormatado = ''

  if (valor.length > 0) {
    valorFormatado += '(' + valor.substring(0, 2)
  }
  if (valor.length >= 3) {
    valorFormatado += ') ' + valor.substring(2, 7)
  }
  if (valor.length >= 8) {
    valorFormatado += '-' + valor.substring(7, 11)
  }

  target.value = valorFormatado
})

confirmaSenha.addEventListener('keyup', ({ target }) => {
  if (target.value.length === 0) {
    target.classList.remove('senhasValidas')
    target.classList.remove('senhasInvalidas')

    senha.classList.remove('senhasValidas')
    senha.classList.remove('senhasInvalidas')

  } else if (target.value != senha.value) {
    target.classList.add('senhasInvalidas')
    senha.classList.add('senhasInvalidas')
  } else {
    target.classList.remove('senhasInvalidas')
    target.classList.add('senhasValidas')

    senha.classList.remove('senhasInvalidas')
    senha.classList.add('senhasValidas')
  }
})

form.addEventListener('reset', () => {
  senha.classList.remove('senhasValidas')
  senha.classList.remove('senhasInvalidas')
  confirmaSenha.classList.remove('senhasValidas')
  confirmaSenha.classList.remove('senhasInvalidas')
})



// async function buscarUsuarios() {
//   const usuarios = await fetch(BASE_URL + "/usuarios").then((response) =>
//     response.json()
//   );

//   return usuarios;
// }

// async function buscarUsuario(id) {
//   const usuarios = await buscarUsuarios();

//   const usuario = usuarios.find((u) => u.id == id);

//   if (!usuario) {
//     alert("Usuário não encontrado!");
//     return;
//   }

//   return usuario;
// }

async function cadastrarUsuario(data) {
  const resposta = await cadastroService.createUsuario(data)

  if (resposta) window.location.href = ""
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

  await cadastroService.updateUsuario(id, data)
}

async function deletarUsuario(id) {
  await cadastroService.deleteUsuario(id)
  alert("Deletado com sucesso!");
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

  // alert("Usuário cadastrado com sucesso!");

  // location.reload();
});
