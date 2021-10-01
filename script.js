var semente;

var cartas = []; // cartas do baralho
var cartasCores = ["5e0000", "BF8F00", "005e00", "00005e"]; // Cores das cartas

var jogadores = [];

var baralhoAuxiliar = []; // Baralho ordenado
var baralhoPrincipal = cartas; // Baralho desordenado

function criarCartas() {
	var idCarta = 0;
	// Cria as cartas com número 0
	for (var cor in cartasCores) {
		cartas.push({
			id: idCarta,
			nome: "0",
			tipo: "numero",
			cor: cartasCores[cor]
		});
		idCarta++;
	}
	// Cria as cartas numéricas
	for (var cor in cartasCores) {
		for (var i = 0; i < 2; i++) {
			for (var num = 1; num < 10; num++) {
				cartas.push({
					id: idCarta,
					nome: String(num),
					tipo: "numero",
					cor: cartasCores[cor]
				});
				idCarta++;
			}
		}
	}
	// Cria as cartas Bloquear
	for (var i = 0; i < 2; i++) {
		for (var cor in cartasCores) {
			cartas.push({
				id: idCarta,
				nome: "Ø",
				tipo: "bloquear",
				cor: cartasCores[cor]
			});
			idCarta++;
		}
	}
	// Cria as cartas Reverter
	for (var i = 0; i < 2; i++) {
		for (var cor in cartasCores) {
			cartas.push({
				id: idCarta,
				nome: "🔃",
				tipo: "reverter",
				cor: cartasCores[cor]
			});
			idCarta++;
		}
	}
	// Cria as cartas +2
	for (var i = 0; i < 2; i++) {
		for (var cor in cartasCores) {
			cartas.push({
				id: idCarta,
				nome: "+2",
				tipo: "+2",
				cor: cartasCores[cor]
			});
			idCarta++;
		}
	}
	// Cria as cartas trocar cor
	for (var i = 0; i < 4; i++) {
		cartas.push({
			id: idCarta,
			nome: "",
			tipo: "trocarCor",
			cor: "escolherCor"
		});
		idCarta++;
	}
	// Cria as cartas +4
	for (var i = 0; i < 4; i++) {
		cartas.push({
			id: idCarta,
			nome: "+4",
			tipo: "+4",
			cor: "escolherCor"
		});
		idCarta++;
	}
}

function embaralhar() {
	for (var i = 0; i < 2; i++) {
		baralhoAuxiliar = baralhoPrincipal;
		baralhoPrincipal = [];
		while (baralhoAuxiliar.length > 0) {
			semente = 7 * semente % 10801;
			var cartaMovida = semente % (baralhoAuxiliar.length);
			baralhoPrincipal.push(baralhoAuxiliar.splice(cartaMovida, 1)[0]);
		}
	}
}

criarCartas();

function desenharCarta(idCarta) {

	var corExibicao = cartas[idCarta].cor;

	if (corExibicao == "escolherCor") {
		corExibicao = "000000"
	}

	resultado.innerHTML += `<div class="carta-fundo" style="background: #${corExibicao};">
  <div class="carta-retangulo">
    <div class="carta-conteudo-borda">${cartas[idCarta].nome}</div>
    <div class="carta-conteudo-centro">${cartas[idCarta].nome}</div>
    <div class="carta-conteudo-borda" style="transform: rotate(180deg);">${cartas[idCarta].nome}</div>
    <div class="carta-losango"></div>
  </div>
</div>`
}

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
			ePrincipal: false,
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
				<input type="radio" name="alternativasJogador" value="jogador0" checked="true"><br>
				Espectador
			</p>
		</div>
	`;
	for (var idJogador in jogadores) {
		cartoesJogadores.innerHTML += `
		<div class="cartaoJogador">
			<p class="cartaoJogadorP">
				<input type="radio" name="alternativasJogador" value="jogador${parseInt(idJogador) + 1}"><br>
				${jogadores[idJogador].nome}<br>
				${jogadores[idJogador].mao.length}
			</p>
		</div>
		`;
	}
}

// jogadores = [
// 	{
// 		nome: "Zezinho",
// 		mao: [],
// 		ePrincipal: false
// 	},
// 	{
// 		nome: "Claudinho",
// 		mao: [],
// 		ePrincipal: false
// 	},
// 	{
// 		nome: "Robinho",
// 		mao: [],
// 		ePrincipal: false
// 	},
// 	{
// 		nome: "Inho",
// 		mao: [],
// 		ePrincipal: false
// 	}
// ]

// escolherJogador();

// desenharCarta(carta);

// 0 1 2 3 4 5 6 7 8 9 +2 +4 🔃 Ø
// Vermelho: 5e0000
// Amarelo: BF8F00
// Verde: 005e00
// Azul: 00005e
