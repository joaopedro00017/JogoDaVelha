var player = "vinijr"; 
var numJog = 0; 
var pc = false; 


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

        
        player = (player === "vinijr") ? "rodri" : "vinijr";

        
        if (pc && player === "rodri") {
            setTimeout(() => {
                var jogada = jogoDoPc();
                checkjogo(jogada);
            }, 500); 
        }
    }
}


function jogoDoPc() {
    
    if (verificaSrc('c5') === "transp.png") {
        return 'c5';
    }

    
    var celulasVazias = [];
    for (let i = 1; i <= 9; i++) {
        if (verificaSrc('c' + i) === "transp.png") {
            celulasVazias.push('c' + i);
        }
    }

    var indice = Math.floor(Math.random() * celulasVazias.length);
    return celulasVazias[indice];
}


function wincheck() {
    var combinacoes = [
        ['c1', 'c2', 'c3'],
        ['c4', 'c5', 'c6'],
        ['c7', 'c8', 'c9'],
        ['c1', 'c4', 'c7'],
        ['c2', 'c5', 'c8'],
        ['c3', 'c6', 'c9'],
        ['c1', 'c5', 'c9'],
        ['c3', 'c5', 'c7']
    ];

    for (var i = 0; i < combinacoes.length; i++) {
        var [a, b, c] = combinacoes[i];
        if (verificaSrc(a) === verificaSrc(b) && verificaSrc(b) === verificaSrc(c) && verificaSrc(a) !== "transp.png") {
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
        document.getElementById('c' + i).onclick = null;
    }
}


function reiniciarJogo() {
    for (let i = 1; i <= 9; i++) {
        var celula = document.getElementById('c' + i);
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
    pc = (opcao === "sim");
    reiniciarJogo();
}
