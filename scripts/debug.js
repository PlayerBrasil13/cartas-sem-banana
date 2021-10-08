function debug(num) {
	switch (num) {
		case 0:
			escolherSemente(200);
			document.getElementById("jogadorNome").value = "Zezinho";
			adicionarJogador(2);
			document.getElementById("jogadorNome").value = "Claudinho";
			adicionarJogador(3);
			document.getElementById("jogadorNome").value = "Otaquinho";
			adicionarJogador(4);
			break;
		case 1:
			escolherJogador();
			document.getElementsByName("alternativasJogador")[2].checked = true;
			break;
		case 2:
			comecarJogo();
			break;
		case 3:
			document.getElementById("pegarIdCarta").value = 37;
			procurarCartaPorId();
			break;
		case 4:
			num = 3;
	}
	botaoDebug.innerHTML = `<button type="submit" onclick="debug(${num + 1})">DeBuG</button>`
	minhaMao.innerHTML = "";
	if (num > 1) {
		for (var maoId in jogadores[jogadorAtual].mao) {
			minhaMao.innerHTML += desenharCarta(jogadores[jogadorAtual].mao[maoId]);
		}
	}
}