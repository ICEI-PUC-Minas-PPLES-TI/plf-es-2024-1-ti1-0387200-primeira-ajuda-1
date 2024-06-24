document
  .getElementById("locationForm")
  .addEventListener("submit", function (event) {
    event.preventDefault();
    const cidade = document.getElementById("city").value;
    const bairro = document.getElementById("neighborhood").value;
    const endereco = `${bairro}, ${cidade}`;

    geocodeEndereco(endereco, cidade, bairro);
  });

document.getElementById("refreshButton").addEventListener("click", function () {
  location.reload();
});

function geocodeEndereco(endereco, cidade, bairro) {
  const url = `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(
    endereco
  )}`;

  //axios.get(url): Faz uma requisição HTTP GET para a URL fornecida.
  //axios é uma biblioteca popular para fazer requisições HTTP no JavaScript.
  //Se a requisição for bem-sucedida, o código dentro do .then será executado. A resposta da requisição é passada como argumento (neste caso, response).
  axios
    .get(url)
    .then((response) => {
      if (response.data.length > 0) {
        const localizacao = response.data[0];
        const lat = localizacao.lat;
        const lon = localizacao.lon;
        const mapaWrapper = document.querySelector('#map')
        mapaWrapper.style.display = 'flex'
        const mapa = L.map("map").setView([lat, lon], 14);

        L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
          attribution:
            '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
        }).addTo(mapa);

        encontrarHospitaisProximos(mapa, lat, lon);

        // Salvar a busca no local storage
        salvarUltimaBusca(cidade, bairro);
      } else {
        alert("Endereço não encontrado.");
      }
    })
    .catch((error) => {
      console.error("Erro ao buscar o endereço:", error);
    });
}

function encontrarHospitaisProximos(mapa, lat, lon) {
  const url = `https://overpass-api.de/api/interpreter?data=[out:json];node[amenity=hospital](around:5000,${lat},${lon});out;`;

  axios
    .get(url)
    .then((response) => {
      const hospitais = response.data.elements;
      hospitais.forEach((hospital) => {
        L.marker([hospital.lat, hospital.lon])
          .addTo(mapa)
          .bindPopup(
            `<strong>${hospital.tags.name || "Hospital"}</strong><br>${hospital.tags["addr:street"] || ""
            }`
          );
      });
    })
    .catch((error) => {
      console.error("Erro ao buscar hospitais próximos:", error);
    });
}

function salvarUltimaBusca(cidade, bairro) {
  const ultimasBuscas = JSON.parse(localStorage.getItem("ultimasBuscas")) || [];
  ultimasBuscas.push({ cidade, bairro });
  localStorage.setItem("ultimasBuscas", JSON.stringify(ultimasBuscas));
}

function preencherTabela() {
  const dataTableBody = document.querySelector("#dataTable tbody");
  const ultimasBuscas = JSON.parse(localStorage.getItem("ultimasBuscas")) || [];

  //Para cada item na lista ultimasBuscas, executa a função fornecida. Aqui, u representa o item atual (uma busca anterior com cidade e bairro), e index representa o índice do item na lista.
  ultimasBuscas.forEach((u, index) => {
    dataTableBody.innerHTML += `
      <tr>
        <td>${u.cidade}</td>
        <td>${u.bairro}</td>
        <td>
          <button onclick="reverLocalizacao('${u.cidade}', '${u.bairro}')">Rever</button>
          <button onclick="deletarLocalizacao(${index})">Excluir</button>
          <button type="button" id="refreshButton" onclick="location.reload();">↻</button>
        </td>
      </tr>
    `;
  });
}

function reverLocalizacao(cidade, bairro) {
  const endereco = `${bairro}, ${cidade}`;
  geocodeEndereco(endereco, cidade, bairro);
}

function deletarLocalizacao(index) {
  const ultimasBuscas = JSON.parse(localStorage.getItem("ultimasBuscas")) || [];
  ultimasBuscas.splice(index, 1);
  localStorage.setItem("ultimasBuscas", JSON.stringify(ultimasBuscas));
  location.reload();
}

window.onload = () => {
  preencherTabela();
};
