var semente;

var cartas = []; // cartas do baralho
var cartasCores = ["5e0000", "BF8F00", "005e00", "00005e"]; // Cores das cartas

var jogadores = [];
var jogadorPrincipal = NaN;
var jogadorAtual = NaN;

var rodadaProgressao = 1;

var baralhoAuxiliar = []; // Baralho da mesa
var baralhoPrincipal = []; // Baralho de compras

var sequenciaComprar = 0;

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

		cartoesJogadores.innerHTML = desenharCartoes(false);

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
				<input type="radio" name="alternativasJogador" value="${jogadores.length}" checked="true">
				Espectador
			</p>
		</div>
	`;
	cartoesJogadores.innerHTML += desenharCartoes(true);
}

function comecarJogo() {
	if (!document.getElementsByName("alternativasJogador")[0].checked) {
		for (var idJogador in jogadores) {
			if (document.getElementsByName("alternativasJogador")[parseInt(idJogador) + 1].checked) {
				jogadorPrincipal = idJogador;
			}
		}
	}

	semente = 7 * semente % 10801;
	jogadorAtual = semente % jogadores.length;

	cartas = criarCartas();

	embaralhar();
	distribuirCartas();

	jogar();

	minhaMao.innerHTML = null;
	for (var maoId in jogadores[jogadorPrincipal].mao) {
		minhaMao.innerHTML += desenharCarta(jogadores[jogadorPrincipal].mao[maoId]);
	}
}

function criarCartas() {
	var idCarta = 0;
	var cartaCriada = [];
	// Cria as cartas com número 0
	for (var cor in cartasCores) {
		cartaCriada.push({
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
	// Cria as cartas Bloquear
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
	// Cria as cartas Reverter
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
	// Cria as cartas +2
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
	// Cria as cartas trocar cor
	for (var i = 0; i < 4; i++) {
		cartaCriada.push({
			id: idCarta,
			nome: "",
			tipo: "trocarCor",
			cor: "000000"
		});
		idCarta++;
	}
	// Cria as cartas +4
	for (var i = 0; i < 4; i++) {
		cartaCriada.push({
			id: idCarta,
			nome: "+4",
			tipo: "+4",
			cor: "000000"
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
		semente = 991 * semente % 10801;
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

function desenharCarta(carta) {
	if (carta != undefined) {
		return `
			<div class="carta-fundo" style="background: #${carta.cor};">
				<div class="carta-retangulo">
					<div class="carta-conteudo-borda">${carta.nome}</div>
					<div class="carta-id">${carta.id}</div>
					<div class="carta-conteudo-centro">${carta.nome}</div>
					<div class="carta-conteudo-borda" style="transform: rotate(180deg);">${carta.nome}</div>
					<div class="carta-losango"></div>
				</div>
			</div>
		`;
	} else {
		return "";
	}
}

function desenharCartoes(comInput) {
	var desenhar = "";
	for (var idJogador in jogadores) {
		desenhar += `<div class="cartaoJogador"`

		if (idJogador == jogadorAtual) {
			desenhar += `style="box-shadow: inset 0px 0px 2vw 1vw #dd1c1c;">`;
		} else {
			desenhar += ">"
		}

		desenhar += `<p class="cartaoJogadorP">`
		if (comInput) {
			desenhar += `<input type="radio" name="alternativasJogador" value="${parseInt(idJogador)}"><br>`
		}

		if (idJogador == jogadorPrincipal) {
			desenhar += `<strong>${jogadores[idJogador].nome}</strong><br>`;
		} else {
			desenhar += `${jogadores[idJogador].nome}<br>`;
		}

		desenhar += `
		${jogadores[idJogador].mao.length}</p>
		</div>
		`;

	}
	return desenhar;
}

function jogar() {
	minhaMao.innerHTML = ""
	for (var maoId in jogadores[jogadorPrincipal].mao) {
		minhaMao.innerHTML += desenharCarta(jogadores[jogadorPrincipal].mao[maoId]);
	}
	jogadorAtual += rodadaProgressao;
	jogadorAtual = (jogadorAtual + jogadores.length) % jogadores.length;

	var jogadorNome = jogadores[jogadorAtual].nome;

	if (jogadorAtual == jogadorPrincipal) {
		saidaInfo.innerHTML = `É a sua vez.`;
		entradaInfo.innerHTML = `
			<input class="textInput" type="number" id="pegarIdCarta" placeholder="Digite o id da carta que deseja jogar">
			<button id="pegarCartaId" type="submit" onclick="procurarCartaPorId()">Ok</button>
			<button id="comprar" type="submit" onclick="comprarCarta(true)">Comprar</button>
		`
	} else {
		saidaInfo.innerHTML = `É a vez de ${jogadores[jogadorAtual].nome}.`;
		entradaInfo.innerHTML = `
			<input class="textInput" type="number" id="pegarIdCarta" placeholder="Digite o id da carta que ${jogadorNome} falar">
			<button id="pegarCartaId" type="submit" onclick="procurarCartaPorId()">Ok</button>
			<button id="comprar" type="submit" onclick="comprarCarta(true)">Comprar</button>
		`;
	}
	cartoesJogadores.innerHTML = desenharCartoes(false);
}

function jogarCarta(idCarta, listaCarta) {
	var maoPrincipal = [];

	if (!isNaN(jogadorPrincipal)) {
		maoPrincipal = jogadores[jogadorPrincipal].mao;
	}

	minhaMao.innerHTML = "";
	for (var maoId in maoPrincipal) {
		minhaMao.innerHTML += desenharCarta(maoPrincipal[maoId]);
	}

	var cartaValida = checarvalidade(listaCarta[idCarta]);

	if (cartaValida) {
		mesa.innerHTML = desenharCarta(listaCarta[idCarta]);
		baralhoAuxiliar.push(listaCarta.splice(idCarta, 1)[0]);

		if (jogadorAtual == jogadorPrincipal) {
			minhaMao.innerHTML = ""
			for (var maoId in jogadores[jogadorPrincipal].mao) {
				minhaMao.innerHTML += desenharCarta(jogadores[jogadorPrincipal].mao[maoId]);
			}
		}
		funcaoCarta(baralhoAuxiliar[baralhoAuxiliar.length - 1]);
	} else {
		saidaInfo.innerHTML = "Carta inválida."
	}
}

function procurarCartaPorId(idCarta, listaCarta) {
	if (idCarta == null) {
		idCarta = document.getElementById("pegarIdCarta").value;
		listaCarta = jogadores[jogadorAtual].mao;
	}

	var cartaEncontrada = null;
	for (var carta in listaCarta) {
		if (listaCarta[carta].id == idCarta) {
			cartaEncontrada = carta;
		}
	}

	if (cartaEncontrada == null) {
		saidaInfo.innerHTML = "Carta inválida."
	} else {
		jogarCarta(cartaEncontrada, listaCarta);
	}
}

function checarvalidade(carta) {
	var cartaMao = carta;
	var cartaBaralho = baralhoAuxiliar[baralhoAuxiliar.length - 1];

	if (
		baralhoAuxiliar.length == 0 || (
			sequenciaComprar == 0 && (
				cartaMao.cor == cartaBaralho.cor ||
				cartaMao.nome == cartaBaralho.nome ||
				cartaMao.cor == "000000"
			)
		) || (
			sequenciaComprar != 0 &&
			cartaMao.nome == cartaBaralho.nome
		)
	) {
		return true;
	} else {
		return false;
	}
}

function comprarCarta(checar) {
	if (checar == true) {
		var haValidas = false;
	} else {
		var haValidas = true;
	}

	for (var idCarta in jogadores[jogadorAtual].mao) {
		if (checarvalidade(jogadores[jogadorAtual].mao[idCarta])) {
			haValidas = true;
		}
	}

	if (haValidas) {
		saidaInfo.innerHTML = "Não é possível comprar cartas, há cartas válidas!"
	} else {
		var jogarApos = false;
		if (sequenciaComprar == 0) { sequenciaComprar++; } else { jogarApos = true; }
		while (sequenciaComprar > 0) {
			jogadores[jogadorAtual].mao.splice(0, 0, baralhoPrincipal.splice(0, 1)[0]);
			sequenciaComprar--;
		}
		minhaMao.innerHTML = ""
		for (var maoId in jogadores[jogadorPrincipal].mao) {
			minhaMao.innerHTML += desenharCarta(jogadores[jogadorPrincipal].mao[maoId]);
		}
		cartoesJogadores.innerHTML = desenharCartoes(false);
		if (jogarApos) { jogar(); }
	}
}

function funcaoCarta(carta) {
	cartaTipo = carta.tipo;
	cartaNome = carta.nome;
	switch (cartaTipo) {
		case "numero":
			if (cartaNome == "0") {
				rolarMaos();
				jogar();
			} else if (cartaNome == "7") {
				entradaInfo.innerHTML = `<button type="submit" onclick="trocarMaos()">TrocarMaos</button>`;
				cartoesJogadores.innerHTML = desenharCartoes(true);
				document.getElementsByName("alternativasJogador")[jogadorAtual].disabled = true;
			} else {
				jogar();
			}
			break;
		case "reverter":
			jogadorAtual -= 2;
			rodadaProgressao = rodadaProgressao * (-1);
			jogar();
			break;
		case "bloquear":
			jogadorAtual += rodadaProgressao;
			jogar();
			break;
		case "trocarCor":
			escolherCor("nenhuma", carta);
			break;
		case "+2":
			sequenciaComprar += 2;
			jogar();
			break;
		case "+4":
			sequenciaComprar += 4;
			escolherCor("nenhuma", carta);
			break;
	}
	//cartoesJogadores.innerHTML = desenharCartoes(false);
}

function rolarMaos() {
	var maos = [];
	for (var mao in jogadores) {
		maos.push(jogadores[mao].mao);
	}

	if (rodadaProgressao == 1) {
		maos.push(maos.splice(0, 1)[0]);
	} else {
		maos.splice(0, 0, maos.splice(jogadores.length - 1, 1)[0])
	}

	for (var mao in jogadores) {
		jogadores[mao].mao = maos[mao];
	}

}

function trocarMaos() {
	var maoMovida = "no";
	for (var idJogador in jogadores) {
		if (document.getElementsByName("alternativasJogador")[parseInt(idJogador)].checked) {
			maoMovida = jogadores[idJogador].mao;
			jogadores[idJogador].mao = jogadores[jogadorAtual].mao;
			jogadores[jogadorAtual].mao = maoMovida;
		}
	}
	if (maoMovida != "no") {
		jogar();
	}
}

function escolherCor(corEscolher, cartaEscolher) {
	if (corEscolher == "nenhuma") {
		saidaInfo.innerHTML = "Escolha a cor da carta";
		entradaInfo.innerHTML = "";
		for (var cor in cartasCores) {
			cartaEscolher.cor = cartasCores[cor];
			entradaInfo.innerHTML += `<button type="submit" onclick="escolherCor('${cartasCores[cor]}')">${desenharCarta(cartaEscolher)}</button>`;
		}
	} else {
		cartaEscolher = baralhoAuxiliar[baralhoAuxiliar.length - 1];
		cartaEscolher.cor = corEscolher;
		mesa.innerHTML = desenharCarta(baralhoAuxiliar[baralhoAuxiliar.length - 1])

		jogar();
	}
}

function salvarJogo() {
	var saveFileArray = [];
	var salvarJogador;

	saveFileArray.push(semente);
	saveFileArray.push(jogadorAtual);
	saveFileArray.push(rodadaProgressao);
	saveFileArray.push(sequenciaComprar);

	salvarJogador = jogadores;
	saveFileArray.push(salvarJogador.length);
	while (salvarJogador.length > 0) {
		saveFileArray.push(salvarJogador[0].nome);
		salvarId(salvarJogador[0].mao);
		salvarJogador.splice(0, 1);
	}

	salvarId(baralhoPrincipal);
	salvarId(baralhoAuxiliar);

	function salvarId(deMao) {
		saveFileArray.push(deMao.length);
		while (deMao.length > 0) {
			saveFileArray.push(deMao[0].id);
			deMao.splice(0, 1);
		}
	}

	var saveFile = "";
	console.log(saveFileArray.length)
	while (saveFileArray.length > 0) {
		saveFile += saveFileArray.splice(0, 1)[0];
		saveFile += "| |"
	}

	saidaInfo.innerHTML = saveFile;
}

function carregarJogo() {
	var saveFile = document.getElementById("pegarSave").value;
	// var saveFile = "1358| |1| |1| |0| |2| |coc| |7| |29| |86| |7| |83| |85| |56| |50| |suc| |7| |46| |36| |20| |15| |35| |43| |62| |94| |71| |28| |80| |42| |19| |39| |63| |99| |94| |74| |101| |33| |60| |11| |23| |55| |96| |8| |2| |92| |40| |37| |9| |82| |12| |75| |103| |22| |14| |3| |31| |54| |25| |64| |34| |13| |84| |100| |0| |24| |61| |59| |90| |1| |57| |44| |72| |32| |17| |93| |70| |41| |26| |78| |106| |89| |91| |76| |97| |4| |30| |107| |10| |52| |6| |27| |67| |102| |5| |104| |105| |49| |18| |16| |45| |53| |38| |51| |48| |58| |77| |87| |81| |65| |79| |47| |95| |21| |88| |66| |68| |69| |73| |98| |0| |";

	var saveFileArray = saveFile.split("| |");

	semente = parseInt(saveFileArray.splice(0, 1)[0]);
	jogadorAtual = parseInt(saveFileArray.splice(0, 1)[0]);
	rodadaProgressao = parseInt(saveFileArray.splice(0, 1)[0]);
	sequenciaComprar = parseInt(saveFileArray.splice(0, 1)[0]);

	cartas = criarCartas();

	var numeroJogadores = parseInt(saveFileArray.splice(0, 1)[0]);
	

	while (jogadores.length < numeroJogadores) {
		var construirJogador = {};
		var construirMao = [];
		construirJogador.nome = saveFileArray.splice(0, 1)[0];
		carregarId(construirMao);
		construirJogador.mao = construirMao;

		jogadores.push(construirJogador);
	}
	
	carregarId(baralhoPrincipal)
	carregarId(baralhoAuxiliar)

	function carregarId(paraMao) {
		var numeroCartas = parseInt(saveFileArray.splice(0, 1)[0]);
		while (paraMao.length < numeroCartas) {
			paraMao.push(cartas[parseInt(saveFileArray.splice(0, 1)[0])]);
		}
	}
	escolherJogador()
}


// 0 1 2 3 4 5 6 7 8 9 +2 +4 🔃 Ø
// Vermelho: 5e0000
// Amarelo: BF8F00
// Verde: 005e00
// Azul: 00005w
