var semente = parseInt(Math.random() * 11);
var sementeMax = 2147483647;

var cartas = []; // cartas do baralho
var cartasCores = ["5e0000", "BF8F00", "005e00", "00005e"]; // Cores das cartas

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
					cor: cartasCores[num]
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
				cor: cartasCores[num]
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
				cor: cartasCores[num]
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
				cor: cartasCores[num]
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

function desenharCarta(idCarta, cor) {
	resultado.innerHTML += `<div class="carta-fundo" style="background: #${cor};">
  <div class="carta-retangulo">
    <div class="carta-conteudo-borda">${idCarta}</div>
    <div class="carta-conteudo-centro">${idCarta}</div>
    <div class="carta-conteudo-borda" style="transform: rotate(180deg);">${idCarta}</div>
    <div class="carta-losango"></div>
  </div>
</div>`
}

desenharCarta("↑↓", "BF8F00");
desenharCarta("↱↲", "BF8F00");
desenharCarta("Ø", "005e00");
desenharCarta("Ø", "00005e");
desenharCarta("↺", "BF8F00");
desenharCarta("↻", "BF8F00");
desenharCarta("Ø", "5e0000");
desenharCarta("Ø", "BF8F00");
desenharCarta("", "000000");

// 0 1 2 3 4 5 6 7 8 9 +2 +4 🔃 Ø
// Vermelho: 5e0000
// Amarelo: BF8F00
// Verde: 005e00
// Azul: 00005e
