var semente;

var cartas = []; // cartas do baralho
var cartasCores = ["5e0000", "BF8F00", "005e00", "00005e"]; // Cores das cartas

var jogadores = [];
var jogadorPrincipal;

var baralhoAuxiliar = []; // Baralho da mesa
var baralhoPrincipal; // Baralho de compras

criarCartas();

function escolherSemente(valor) {
	valor = parseInt(valor);
	if (isNaN(valor)) {
		semente = parseInt(Math.random() * 10801);
	} else {
		semente = valor;
	}
	semente = semente % 10801;
	saidaInfo.innerHTML = `<h2>Sua semente é: ${semente}</h2>`;
	adicionarJogador(1);
}

function adicionarJogador(numeroJogador) {
	if (numeroJogador == 1) {
		entradaInfo.innerHTML = `
		<button type="submit" onclick="adicionarJogador(${numeroJogador + 1})">Adicionar jogador</button>
		<button type="submit" onclick="escolherJogador()">Continuar</button><br>
		<input class="textInput" type="text" id="jogadorNome" placeholder="Jogador ${numeroJogador}" maxlength="8">
		`;
	}

	if (document.getElementById("jogadorNome").value != "") {
		var jogador = {
			nome: document.getElementById("jogadorNome").value,
			mao: []
		}

		jogadores.push(jogador);

		cartoesJogadores.innerHTML = "";
		for (var idJogador in jogadores) {
			cartoesJogadores.innerHTML += `
			<div class="cartaoJogador">
			<p class="cartaoJogadorP">
			${jogadores[idJogador].nome}<br>${jogadores[idJogador].mao.length}
			</p>
			</div>`;
		}
		entradaInfo.innerHTML = `
		<button type="submit" onclick="adicionarJogador(${numeroJogador + 1})">Adicionar jogador</button>
		<button type="submit" onclick="escolherJogador()">Continuar</button><br>
		<input class="textInput" type="text" id="jogadorNome" placeholder="Jogador ${numeroJogador}" maxlength="8">
		`;
	}
}

function escolherJogador() {
	saidaInfo.innerHTML = "Quem é você?";
	entradaInfo.innerHTML = `<button type="submit" onclick="comecarJogo()">Começar Jogo</button>`;
	cartoesJogadores.innerHTML = `
		<div class="cartaoJogador">
		<p class="cartaoJogadorP">
				<input type="radio" name="alternativasJogador" value="0" checked="true"><br>
				Espectador
			</p>
		</div>
	`;
	for (var idJogador in jogadores) {
		cartoesJogadores.innerHTML += `
		<div class="cartaoJogador">
			<p class="cartaoJogadorP">
				<input type="radio" name="alternativasJogador" value="${parseInt(idJogador) + 1}"><br>
				${jogadores[idJogador].nome}<br>
				${jogadores[idJogador].mao.length}
			</p>
		</div>
		`;
	}
}

function criarCartas() {
	var idCarta = 0;
	var cartaCriada = [];
	// Cria as cartaCriada com número 0
	for (var cor in cartasCores) {
		cartaCriada.push({
			id: idCarta,
			nome: "0",
			tipo: "numero",
			cor: cartasCores[cor]
		});
		idCarta++;
	}
	// Cria as cartaCriada numéricas
	for (var cor in cartasCores) {
		for (var i = 0; i < 2; i++) {
			for (var num = 1; num < 10; num++) {
				cartaCriada.push({
					id: idCarta,
					nome: String(num),
					tipo: "numero",
					cor: cartasCores[cor]
				});
				idCarta++;
			}
		}
	}
	// Cria as cartaCriada Bloquear
	for (var i = 0; i < 2; i++) {
		for (var cor in cartasCores) {
			cartaCriada.push({
				id: idCarta,
				nome: "Ø",
				tipo: "bloquear",
				cor: cartasCores[cor]
			});
			idCarta++;
		}
	}
	// Cria as cartaCriada Reverter
	for (var i = 0; i < 2; i++) {
		for (var cor in cartasCores) {
			cartaCriada.push({
				id: idCarta,
				nome: "🔃",
				tipo: "reverter",
				cor: cartasCores[cor]
			});
			idCarta++;
		}
	}
	// Cria as cartaCriada +2
	for (var i = 0; i < 2; i++) {
		for (var cor in cartasCores) {
			cartaCriada.push({
				id: idCarta,
				nome: "+2",
				tipo: "+2",
				cor: cartasCores[cor]
			});
			idCarta++;
		}
	}
	// Cria as cartaCriada trocar cor
	for (var i = 0; i < 4; i++) {
		cartaCriada.push({
			id: idCarta,
			nome: "",
			tipo: "trocarCor",
			cor: "escolherCor"
		});
		idCarta++;
	}
	// Cria as cartaCriada +4
	for (var i = 0; i < 4; i++) {
		cartaCriada.push({
			id: idCarta,
			nome: "+4",
			tipo: "+4",
			cor: "escolherCor"
		});
		idCarta++;
	}
	return cartaCriada;
}

function embaralhar() {
	baralhoPrincipal = criarCartas();
	baralhoAuxiliar = baralhoPrincipal;
	baralhoPrincipal = [];
	while (baralhoAuxiliar.length > 0) {
		semente = 7 * semente % 10801;
		var cartaMovida = semente % (baralhoAuxiliar.length);
		baralhoPrincipal.push(baralhoAuxiliar.splice(cartaMovida, 1)[0]);
	}
}

function distribuirCartas() {
	for (var i = 0; i < 7; i++) {
		for (var idJogador in jogadores) {
			jogadores[idJogador].mao.push(baralhoPrincipal.splice(0, 1)[0]);
		}
	}
}

function desenharCarta(idCarta) {
	if (idCarta != undefined) {
		var cartaCor = cartas[idCarta].cor;
		var cartaNome = cartas[idCarta].nome;
		var cartaId = cartas[idCarta].id;

		if (cartaCor == "escolherCor") {
			cartaCor = "000000"
		}

		return `
			<div class="carta-fundo" style="background: #${cartaCor};">
				<div class="carta-retangulo">
					<div class="carta-conteudo-borda">${cartaNome}</div>
					<div class="carta-id">${cartaId}</div>
					<div class="carta-conteudo-centro">${cartaNome}</div>
					<div class="carta-conteudo-borda" style="transform: rotate(180deg);">${cartaNome}</div>
					<div class="carta-losango"></div>
				</div>
			</div>
		`;
	} else {
		return "";
	}
}

function comecarJogo() {
	if (!document.getElementsByName("alternativasJogador")[0].checked) {
		for (var idJogador in jogadores) {
			if (document.getElementsByName("alternativasJogador")[parseInt(idJogador) + 1].checked) {
				jogadorPrincipal = idJogador;
			}
		}
	}


	cartoesJogadores.innerHTML = "";
	for (var idJogador in jogadores) {
		cartoesJogadores.innerHTML += `
		<div class="cartaoJogador">
		<p class="cartaoJogadorP">
		${jogadores[idJogador].nome}<br>${jogadores[idJogador].mao.length}
		</p>
		</div>`;
	}

	embaralhar();
	distribuirCartas();

	jogarCarta(0, baralhoPrincipal);

	semente = 7 * semente % 10801;
	var jogadorAtual = semente % jogadores.length;
	jogar(jogadorAtual);
}

function jogar(idJogador) {
	var jogadorNome = jogadores[idJogador].nome;
	var jogadorMao = jogadores[idJogador].mao;

	if (idJogador == jogadorPrincipal) {
		saidaInfo.innerHTML = `É a sua vez.`;
		entradaInfo.innerHTML = `
			<input class="textInput" type="number" id="pegarIdCarta" placeholder="Digite o id da carta que deseja jogar">
			<button type="submit" onclick="procurarCartaPorId(document.getElementById('pegarIdCarta').value, jogadores[jogadorPrincipal].mao)">Ok</button>
		`
	} else {
		saidaInfo.innerHTML = `É a vez de ${jogadores[idJogador].nome}.`;
		entradaInfo.innerHTML = `
		<input class="textInput" type="number" id="pegarIdCarta" placeholder="Digite o id da carta que ${jogadorNome} falar">
		<button type="submit" onclick="procurarCartaPorId(document.getElementById('pegarIdCarta').value, ${jogadorMao})">Ok</button>
		`;
	}
}

function jogarCarta(idCarta, listaCarta) {
	for (var maoId in jogadores[jogadorPrincipal].mao) {
		minhaMao.innerHTML += desenharCarta(jogadores[jogadorPrincipal].mao[maoId].id);
	}

	var cartaValida = false;

	if (baralhoAuxiliar.length == 0) {
		cartaValida = true;
	} else if (listaCarta[idCarta].cor == "escolherCor") {
		cartaValida = true;
		// escolherCor();
	} else if (listaCarta[idCarta].cor == baralhoAuxiliar[baralhoAuxiliar.length - 1].cor || listaCarta[idCarta].nome == baralhoAuxiliar[baralhoAuxiliar.length - 1].nome) {
		cartaValida = true;
	} else {
		saidaInfo.innerHTML = "Carta inválida."
	}

	if (cartaValida) {
		baralhoAuxiliar.push(listaCarta.splice(idCarta, 1)[0]);
		mesa.innerHTML = desenharCarta(idCarta);
	}
}

function procurarCartaPorId(idCarta, ondeProcurar) {
	var cartaEncontrada = null;
	for (var carta in ondeProcurar) {
		if (ondeProcurar[carta].id == idCarta) {
			cartaEncontrada = carta;
		}
	}

	if (cartaEncontrada == null) {
		saidaInfo.innerHTML = "Carta inválida."
	} else {
		jogarCarta(cartaEncontrada, ondeProcurar)
	}
}

cartas = criarCartas();

function debug() {
	escolherSemente(91);
	document.getElementById("jogadorNome").value = "Zezinho";
	adicionarJogador(2);
	document.getElementById("jogadorNome").value = "Claudinho";
	adicionarJogador(3);
	document.getElementById("jogadorNome").value = "Otaquinho";
	adicionarJogador(4);
	document.getElementById("jogadorNome").value = "Inho";
	adicionarJogador(5);
	escolherJogador();
	jogadorPrincipal = 1;
	// escolherJogador();
	// comecarJogo();
}

// 0 1 2 3 4 5 6 7 8 9 +2 +4 🔃 Ø
// Vermelho: 5e0000
// Amarelo: BF8F00
// Verde: 005e00
// Azul: 00005w
