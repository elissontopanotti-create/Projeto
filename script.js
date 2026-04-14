// =========================
// 🎯 DETECTAR ELEMENTOS
// =========================
const botaoNao = document.getElementById("nao");
const botaoSim = document.getElementById("sim");
const contador = document.getElementById("contador");
const img = document.getElementById("foto");
const musica = document.getElementById("musica");
const botaoProximo = document.getElementById("proximo");
const textoFinal = document.getElementById("texto");

// Função para alternar telas com transição suave
function mostrarTela(idTela) {
  // esconde todas
  document.querySelectorAll(".tela").forEach(tela => {
    tela.classList.remove("ativa");
    tela.style.display = "none";
  });

  // mostra a escolhida
  const tela = document.getElementById(idTela);
  tela.style.display = "flex";
  setTimeout(() => tela.classList.add("ativa"), 50); // delay para ativar transição
}

function criarCoracao() {
  const coracao = document.createElement("div");
  const coracoes = ["💐", "💝", "💌", "💫", "💗", "❤️", "✨", "🌸"];
  coracao.classList.add("coracao");
 coracao.innerText = coracoes[Math.floor(Math.random() * coracoes.length)];

  // posição horizontal aleatória
  coracao.style.left = Math.random() * 100 + "vw";

  // duração da queda
  coracao.style.animationDuration = (Math.random() * 3 + 3) + "s";

  // tamanho aleatório
  const tamanho = Math.random() * 20 + 10;
  coracao.style.fontSize = tamanho + "px";

  // leve rotação inicial
  coracao.style.transform = `rotate(${Math.random() * 360}deg)`;

  document.getElementById("chuva-coracoes").appendChild(coracao);

  setTimeout(() => coracao.remove(), 6000);
}

setInterval(criarCoracao, 250);

// =========================
// 🏃 TELA INICIAL
// =========================
if (botaoNao && botaoSim) {
  botaoNao.addEventListener("mouseover", () => {
    const largura = window.innerWidth - 100;

    const altura = window.innerHeight - 50;
    const x = Math.random() * largura;
    const y = Math.random() * altura;
    botaoNao.style.left = `${x}px`;
    botaoNao.style.top = `${y}px`;
  });
  

  botaoSim.addEventListener("click", () => {
    mostrarTela("tela2");
  });
}

// =========================
// 💖 TELA 2
// =========================
if (contador && img) {
  const dataInicio = new Date("2021-04-30");
  function atualizarContador() {
    const hoje = new Date();
    const diferenca = hoje - dataInicio;
    const dias = Math.floor(diferenca / (1000 * 60 * 60 * 24));
    contador.innerText = `Estamos juntos há ${dias} dias 💖`;
  }
  atualizarContador();

  const fotos = [
    "fotos/foto1.jpg","fotos/foto2.jpg","fotos/foto3.jpg",
    "fotos/foto4.jpg","fotos/foto5.jpg","fotos/foto6.jpg",
    "fotos/foto7.jpg","fotos/foto8.jpg","fotos/foto9.jpg","fotos/foto10.jpg"
  ];
  let index = 0;

  let trocas = 0;

  function trocarFoto() {
    img.style.opacity = 0;
    setTimeout(() => {
      index++;
      if (index >= fotos.length) index = 0;
      img.src = fotos[index];
      img.style.opacity = 1;
      trocas++;
      if (trocas >= fotos.length && botaoProximo) {
        botaoProximo.style.display = "block";
      }
    }, 1500);
  }
  const intervalo = setInterval(trocarFoto, 4000);

  document.addEventListener("click", () => musica.play(), { once: true });

  setInterval(() => {
    localStorage.setItem("tempoMusica", musica.currentTime);
  }, 1000);

  if (botaoProximo) {
    botaoProximo.addEventListener("click", () => {
      mostrarTela("tela3");
    });
  }
}

// =========================
// ❓ TELA 3
// =========================
function verificar() {
  let resposta = document.getElementById("resposta")?.value.trim();
  if (!resposta) return;
  resposta = resposta.replaceAll("-", "/");
  if (resposta === "19/04/2021") {
    mostrarTela("tela4");
    iniciarTelaFinal();
  } else {
    document.getElementById("erro").innerText =
      "Como Assim você não lembra? O Certo Não Era Nem Tentar De Novo";
  }
}

// Função para alternar telas com transição suave
function mostrarTela(idTela) {
  document.querySelectorAll(".tela").forEach(tela => {
    tela.classList.remove("ativa");
    tela.style.display = "none";
  });
  const tela = document.getElementById(idTela);
  tela.style.display = "flex";
  setTimeout(() => tela.classList.add("ativa"), 50);
}

// =========================
// 💌 TELA FINAL
// =========================
function iniciarTelaFinal() {

  if (textoFinal) {
    
    const mensagem = `Desde que você entrou na minha vida, 
    tudo ganhou mais cor, mais sentido e mais alegria. 
    Cada momento ao seu lado é especial, e até nos dias mais difíceis, 
    é em você que encontro força e paz. Seu sorriso ilumina meus pensamentos, 
    e o seu carinho faz meu coração se sentir em casa. 
    Eu te amo de um jeito que vai além das palavras, 
    e sou muito grato por ter você comigo em cada passo dessa caminhada 💖`;
    let i = 0;
    textoFinal.innerHTML = ""; // limpa antes de digitar
    function digitar() {
      if (i < mensagem.length) {
        textoFinal.innerHTML += mensagem.charAt(i);
        i++;
        setTimeout(digitar, 50);
      }
    }
    digitar();

    

    // 👉 Botão de reinício

    const botaoReiniciar = document.getElementById("reiniciar");
    if (botaoReiniciar) {
      botaoReiniciar.addEventListener("click", () => {
        // volta para a tela inicial
        mostrarTela("tela1");
        textoFinal.innerHTML = ""; // limpa mensagem final
      });
    }
  }
}
