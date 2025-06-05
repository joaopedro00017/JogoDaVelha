var player = "vinijr";
var numJog = 0;
var pc = false;
var dificuldade = "facil";

function setDificuldade(nivel) {
  dificuldade = nivel;
}

function verificaSrc(id) {
  var file = document.getElementById(id).src;
  return file.substring(file.length - 10, file.length);
}

function checkjogo(id) {
  if (verificaSrc(id) === "transp.png") {
    document.getElementById(id).src = "../images/" + player + ".png";
    numJog++;

    if (wincheck()) {
      exibirMensagem("Fim de Jogo! Vitória de " + player + "!");
      bloquearJogo();
      return;
    }
    if (numJog >= 9) {
      exibirMensagem("Fim de Jogo! Deu Velha!");
      bloquearJogo();
      return;
    }

    player = player === "vinijr" ? "rodri" : "vinijr";

    if (pc && player === "rodri") {
      setTimeout(() => {
        var jogada = jogoDoPc();
        if (jogada) checkjogo(jogada);
      }, 500);
    }
  }
}

function jogoDoPc() {
  if (dificuldade === "facil") {
    let celulasVazias = [];
    for (let i = 1; i <= 9; i++) {
      if (verificaSrc("c" + i) === "transp.png") {
        celulasVazias.push("c" + i);
      }
    }
    return celulasVazias[Math.floor(Math.random() * celulasVazias.length)];
  }

  const possiveis = ["c1", "c2", "c3", "c4", "c5", "c6", "c7", "c8", "c9"];

  function encontrarJogada() {
    const combinacoes = [
      ["c1", "c2", "c3"],
      ["c4", "c5", "c6"],
      ["c7", "c8", "c9"],
      ["c1", "c4", "c7"],
      ["c2", "c5", "c8"],
      ["c3", "c6", "c9"],
      ["c1", "c5", "c9"],
      ["c3", "c5", "c7"],
    ];
    for (const [a, b, c] of combinacoes) {
      const va = verificaSrc(a);
      const vb = verificaSrc(b);
      const vc = verificaSrc(c);
      const transp = "transp.png";

      if (va === vb && va !== transp && vc === transp) return c;
      if (vb === vc && vb !== transp && va === transp) return a;
      if (va === vc && va !== transp && vb === transp) return b;
    }
    return null;
  }

  const jogadaVencer = encontrarJogada();
  if (jogadaVencer) return jogadaVencer;

  player = player === "vinijr" ? "rodri" : "vinijr";
  const jogadaBloqueio = encontrarJogada();
  player = player === "vinijr" ? "rodri" : "vinijr";

  if (jogadaBloqueio) return jogadaBloqueio;
  if (verificaSrc("c5") === "transp.png") return "c5";

  const cantos = ["c1", "c3", "c7", "c9"];
  for (let canto of cantos) {
    if (verificaSrc(canto) === "transp.png") return canto;
  }

  const vazias = possiveis.filter((c) => verificaSrc(c) === "transp.png");
  return vazias[Math.floor(Math.random() * vazias.length)];
}

function wincheck() {
  const combinacoes = [
    ["c1", "c2", "c3"],
    ["c4", "c5", "c6"],
    ["c7", "c8", "c9"],
    ["c1", "c4", "c7"],
    ["c2", "c5", "c8"],
    ["c3", "c6", "c9"],
    ["c1", "c5", "c9"],
    ["c3", "c5", "c7"],
  ];
  for (let [a, b, c] of combinacoes) {
    if (
      verificaSrc(a) === verificaSrc(b) &&
      verificaSrc(b) === verificaSrc(c) &&
      verificaSrc(a) !== "transp.png"
    ) {
      return true;
    }
  }
  return false;
}

function exibirMensagem(mensagem) {
  document.getElementById("mensagemFimDeJogo").innerHTML = mensagem;
}

function bloquearJogo() {
  for (let i = 1; i <= 9; i++) {
    document.getElementById("c" + i).onclick = null;
  }
}

function reiniciarJogo() {
  for (let i = 1; i <= 9; i++) {
    var celula = document.getElementById("c" + i);
    celula.src = "../images/transp.png";
    celula.onclick = function () {
      checkjogo(this.id);
    };
  }
  numJog = 0;
  player = "vinijr";
  document.getElementById("mensagemFimDeJogo").innerHTML = "";
}

function configurarJogo(opcao) {
  pc = opcao === "sim";
  document.getElementById("opcoesDificuldade").style.display = pc
    ? "block"
    : "none";
  reiniciarJogo();
}
