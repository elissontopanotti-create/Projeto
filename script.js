//  DETECTAR ELEMENTOS
const botaoNao = document.getElementById("nao");
const botaoSim = document.getElementById("sim");
const contador = document.getElementById("contador");
const img = document.getElementById("foto");
const musica = document.getElementById("musica");
const botaoProximo = document.getElementById("proximo");
const textoFinal = document.getElementById("texto");
const botaoReiniciar = document.getElementById("reiniciar");

let intervalo; // controle do slideshow
let trocas = 0;
let index = 0;

// Função para alternar telas
function mostrarTela(idTela) {
  document.querySelectorAll(".tela").forEach(tela => {
    tela.classList.remove("ativa");
    tela.style.display = "none";
  });
  const tela = document.getElementById(idTela);
  tela.style.display = "flex";
  setTimeout(() => tela.classList.add("ativa"), 50);
}

// CHUVA DE CORAÇÕES
function criarCoracao() {
  const coracao = document.createElement("div");
  const coracoes = ["💐", "💝", "💌", "💫", "💗", "❤️", "✨", "🌸"];
  coracao.classList.add("coracao");
  coracao.innerText = coracoes[Math.floor(Math.random() * coracoes.length)];
  coracao.style.left = Math.random() * 100 + "vw";
  coracao.style.animationDuration = (Math.random() * 3 + 3) + "s";
  coracao.style.fontSize = (Math.random() * 20 + 10) + "px";
  coracao.style.transform = `rotate(${Math.random() * 360}deg)`;
  document.getElementById("chuva-coracoes").appendChild(coracao);
  setTimeout(() => coracao.remove(), 6000);
}
setInterval(criarCoracao, 250);

// TELA INICIAL
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
    musica.currentTime = 0;
    musica.play();
    mostrarTela("tela2");
    iniciarSlideshow();
  });
}

// TELA 2
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

  function iniciarSlideshow() {
    index = 0;
    trocas = 0;
    img.src = fotos[index];
    botaoProximo.style.display = "none";
    clearInterval(intervalo);
    intervalo = setInterval(trocarFoto, 4000);
  }

  if (botaoProximo) {
    botaoProximo.addEventListener("click", () => {
      mostrarTela("tela3");
    });
  }
}

// TELA 3
function verificar() {
  let resposta = document.getElementById("resposta")?.value.trim();
  if (!resposta) return;
  resposta = resposta.replaceAll("-", "/");
  if (resposta === "19/04/2021") {
    mostrarTela("tela4");
    iniciarTelaFinal();
  } else {
    document.getElementById("erro").innerText =
      "Como assim você não lembra? O certo não era nem tentar de novo";
  }
}

// TELA FINAL
function iniciarTelaFinal() {
  if (textoFinal) {
    const mensagem = `Meu Amor, hoje completamos 5 anos, 5 anos que eu compartilho
    minha vida com você, é até dificil descrever o que esses 5 anos significam para mim.
    Esses 5 anos com você me fizeram crescer mais rapido do que eu jamais imaginei,
    nunca imaginei que um simples "oi" pudesse mudar tanto a minha vida, mas mudou,
    do seu lado aprendi oq é amar e ser amado de verdade, aprendi a ser mais paciente, mais compreensivo, mais feliz.
    Quero te agradecer por tudo que você já fez e faz por mim, pelas nossas conversas,
    pelos momentos que eu estava mal e você me fez sorrir. Você foi, e é uma das melhores coisas que
    já aconteceram comigo. Existem tantas coisas que admiro em você.
    O seu esforço, a sua dedicação, a sua inteligência, o seu jeito bobo, que sempre me faz sorrir
    e te amar cada vez mais, o seu sorriso, que é a coisa mais linda que eu já vi, o seu abraço, que é o melhor lugar do mundo.
    Eu te amo muito, e quero passar muitos e muitos anos ao seu lado, te fazendo feliz, te amando cada vez mais, e vivendo a nossa história de amor.
    Feliz aniversário de namoro, meu amor! 💖`;
    let i = 0;
    textoFinal.innerHTML = "";
    function digitar() {
      if (i < mensagem.length) {
        textoFinal.innerHTML += mensagem.charAt(i);
        i++;
        setTimeout(digitar, 50);
      }
    }
    digitar();

    if (botaoReiniciar) {
      botaoReiniciar.addEventListener("click", () => {
        mostrarTela("tela1");
        textoFinal.innerHTML = "";
        document.getElementById("erro").innerText = "";
        botaoProximo.style.display = "none";
        img.src = "fotos/foto1.jpg";
        clearInterval(intervalo);
      });
    }
  }
}
