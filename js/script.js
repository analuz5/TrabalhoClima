// Chave de API para OpenWeatherMap
const APIKey = '131cac6555f66043429c123ca53e8578';

// Elementos do DOM
const entradaCidade = document.querySelector("#entradaCidade");
const pesquisaBtn = document.querySelector("#pesquisa");
const elementocidade = document.querySelector("#cidade");
const elementoTempo = document.querySelector("#temperatura span");
const elementoDescricao = document.querySelector("#descricao");
const elementoIcone = document.querySelector("#icone");
const elementoUmidade = document.querySelector("#umidade span");
const elementoVento = document.querySelector("#vento span");
const elementoDadosClima = document.querySelector("#dadosClima");
const elementoMensagemErro = document.querySelector("#mensagemErro");
const imgInicial = document.querySelector("#imgInicial");

// Funções

/**
 * Exibe os dados climáticos na interface com base na cidade fornecida.
 * @param {string} cidade - Nome da cidade para obter os dados climáticos.
 */
const mostreDadosClima = async (cidade) => {
    try {
        // Oculta a mensagem de erro
        elementoMensagemErro.classList.add("hide");

        // Oculta a imagem inicial
        imgInicial.classList.add("hide");

        // Obtém os dados climáticos da API
        const data = await getWeatherData(cidade);

        // Atualiza os elementos da interface com os dados climáticos
        elementocidade.innerText = data.name;
        elementoTempo.innerText = parseInt(data.main.temp);
        elementoIcone.innerText = data.weather[0].description;
        elementoUmidade.innerText = `${data.main.humidity}%`;
        elementoVento.innerText = `${data.wind.speed}Km/h`;
        elementoDadosClima.classList.remove("hide");

        // Atualiza o ícone do clima com base na condição meteorológica principal
        switch (data.weather[0].main) {
            case 'Limpo':
                elementoIcone.src = 'imagens/tempo/limpo.png';
                break;
            case 'Chuva':
                elementoIcone.src = 'imagens/tempo/chuva.png';
                break;
            case 'Nevasca':
                elementoIcone.src = 'imagens/tempo/nevasca.png';
                break;
            case 'Neblina':
                elementoIcone.src = 'imagens/tempo/neblina.png';
                break;
            case 'Nuvem':
                elementoIcone.src = 'imagens/tempo/nuvem.png';
                break;
            default:
                elementoIcone.src = 'imagens/tempo/limpo.png';
        }
    } catch (error) {
        // Exibe mensagem de erro se a obtenção de dados falhar
        elementoMensagemErro.classList.remove("hide");
        elementoDadosClima.classList.add("hide");
    }
};

/**
 * Obtém dados climáticos da API OpenWeatherMap.
 * @param {string} city - Nome da cidade para obter os dados climáticos.
 * @returns {Promise} - Promise contendo os dados climáticos da cidade.
 */
const getWeatherData = async (city) => {
    // Constrói a URL da API com a chave, cidade e unidades métricas
    const apiWeatherURL = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${APIKey}&lang=pt-br`;

    // Faz uma requisição à API e converte a resposta para JSON
    const res = await fetch(apiWeatherURL);
    const data = await res.json();

    // Lança um erro se a resposta não for bem-sucedida (código diferente de 200)
    if (data.cod !== 200) {
        throw new Error(data.message);
    }

    // Retorna os dados climáticos
    return data;
};

// Eventos

// Adiciona um evento de clique ao botão de pesquisa
pesquisaBtn.addEventListener("click", (e) => {
    e.preventDefault();
    const cidade = entradaCidade.value;

    // Chama a função para exibir os dados climáticos
    mostreDadosClima(cidade);
});

// Adiciona um evento de tecla ao campo de entrada para capturar a tecla "Enter"
entradaCidade.addEventListener("keyup", (e) => {
    if (e.code === "Enter") {
        const cidade = e.target.value;

        // Chama a função para exibir os dados climáticos
        mostreDadosClima(cidade);
    }
});
