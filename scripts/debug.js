function debug(num) {
    saidaInfo.innerHTML = semente;
    switch (num) {
        case 0:
            escolherSemente(35);
            document.getElementById("jogadorNome").value = "Zezinho";
            adicionarJogador(2);
            document.getElementById("jogadorNome").value = "Claudinho";
            adicionarJogador(3);
            document.getElementById("jogadorNome").value = "Otaquinho";
            adicionarJogador(4);
            document.getElementById("jogadorNome").value = "Inho";
            adicionarJogador(5);
            break;
        case 1:
            escolherJogador();
            document.getElementsByName("alternativasJogador")[2].checked = true;
            break;
        case 2:
            comecarJogo();
            document.getElementById("pegarIdCarta").value = 71;
            break;
        case 3:
            procurarCartaPorId();
            break;
    }
    botaoDebug.innerHTML = `<button type="submit" onclick="debug(${num + 1})">DeBuG</button>`
}
