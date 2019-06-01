// cambia el color del titutlo
function colorBlink(selector) {
	$(selector).animate({
			opacity: '1',
		}, {
			step: function () {
				$(this).css('color', 'white');
			},
			queue: true
		})
		.animate({
			opacity: '1'
		}, {
			step: function () {
				$(this).css('color', 'yellow');
			},
			queue: true
		}, 600)
		.delay(1000)
		.animate({
			opacity: '1'
		}, {
			step: function () {
				$(this).css('color', 'white');
			},
			queue: true
		})
		.animate({
			opacity: '1'
		}, {
			step: function () {
				$(this).css('color', 'yellow');
				colorBlink('h1.main-titulo');
			},
			queue: true
		});
}

// Obtiene números aleatorios
function getRandomInt(min, max) {
	min = Math.ceil(min);
	max = Math.floor(max);
	return Math.floor(Math.random() * (max - min)) + min;
}

function giveCandyArrays(arrayType, index) {

	var candyCol1 = $('.col-1').children();
	var candyCol2 = $('.col-2').children();
	var candyCol3 = $('.col-3').children();
	var candyCol4 = $('.col-4').children();
	var candyCol5 = $('.col-5').children();
	var candyCol6 = $('.col-6').children();
	var candyCol7 = $('.col-7').children();

	var candyColumns = $([candyCol1, candyCol2, candyCol3, candyCol4,
		candyCol5, candyCol6, candyCol7
	]);

	if (typeof index === 'number') {
		var candyRow = $([candyCol1.eq(index), candyCol2.eq(index), candyCol3.eq(index),
			candyCol4.eq(index), candyCol5.eq(index), candyCol6.eq(index),
			candyCol7.eq(index)
		]);
	} else {
		index = '';
	}

	if (arrayType === 'columns') {
		return candyColumns;
	} else if (arrayType === 'rows' && index !== '') {
		return candyRow;
	}
}

// Crea arrays candyRow
function candyRows(index) {
	var candyRow = giveCandyArrays('rows', index);
	return candyRow;
}

// Crea arrays candyColumn
function candyColumns(index) {
	var candyColumn = giveCandyArrays('columns');
	return candyColumn[index];
}

// Valida si hay dulces que se eliminarán en una columna
function columnValidation() {
	for (var j = 0; j < 7; j++) {
		var counter = 0;
		var candyPosition = [];
		var extraCandyPosition = [];
		var candyColumn = candyColumns(j);
		var comparisonValue = candyColumn.eq(0);
		var gap = false;
		for (var i = 1; i < candyColumn.length; i++) {
			var srcComparison = comparisonValue.attr('src');
			var srcCandy = candyColumn.eq(i).attr('src');

			if (srcComparison != srcCandy) {
				if (candyPosition.length >= 3) {
					gap = true;
				} else {
					candyPosition = [];
				}
				counter = 0;
			} else {
				if (counter == 0) {
					if (!gap) {
						candyPosition.push(i - 1);
					} else {
						extraCandyPosition.push(i - 1);
					}
				}
				if (!gap) {
					candyPosition.push(i);
				} else {
					extraCandyPosition.push(i);
				}
				counter += 1;
			}
			// Comparación de actualizaciones Valor
			comparisonValue = candyColumn.eq(i);
		}
		// Si la posición extra de caramelo tiene más de dos elementos, se fusionó con la posición de caramelo
		if (extraCandyPosition.length > 2) {
			candyPosition = $.merge(candyPosition, extraCandyPosition);
		}
		if (candyPosition.length <= 2) {
			candyPosition = [];
		}
		candyCount = candyPosition.length;
		if (candyCount >= 3) {
			deleteColumnCandy(candyPosition, candyColumn);
			setScore(candyCount);
		}
	}
}

// Añade la clase "eliminar" a "líneas de dulces" que se encuentran en las columnas de dulces
function deleteColumnCandy(candyPosition, candyColumn) {
	for (var i = 0; i < candyPosition.length; i++) {
		candyColumn.eq(candyPosition[i]).addClass('delete');
	}
}

// Valida si hay dulces que deben eliminarse en una fila
function rowValidation() {
	for (var j = 0; j < 6; j++) {
		var counter = 0;
		var candyPosition = [];
		var extraCandyPosition = [];
		var candyRow = candyRows(j);
		var comparisonValue = candyRow[0];
		var gap = false;
		for (var i = 1; i < candyRow.length; i++) {
			var srcComparison = comparisonValue.attr('src');
			var srcCandy = candyRow[i].attr('src');

			if (srcComparison != srcCandy) {
				if (candyPosition.length >= 3) {
					gap = true;
				} else {
					candyPosition = [];
				}
				counter = 0;
			} else {
				if (counter == 0) {
					if (!gap) {
						candyPosition.push(i - 1);
					} else {
						extraCandyPosition.push(i - 1);
					}
				}
				if (!gap) {
					candyPosition.push(i);
				} else {
					extraCandyPosition.push(i);
				}
				counter += 1;
			}

			comparisonValue = candyRow[i];
		}
		// If extraCandyPosition has more than two elements, it's merged with candyPosition
		if (extraCandyPosition.length > 2) {
			candyPosition = $.merge(candyPosition, extraCandyPosition);
		}
		// If candyPosition has less than/or two elements, it is deleted
		if (candyPosition.length <= 2) {
			candyPosition = [];
		}
		// CandyCount is equal to the number of elements in candyPosition
		candyCount = candyPosition.length;
		// If there was a 'candy line' of 3 or more
		if (candyCount >= 3) {
			deleteHorizontal(candyPosition, candyRow);
			setScore(candyCount);
		}
	}
}

// Agrega la clase 'eliminar' a 'líneas de dulces' en las filas de dulces
function deleteHorizontal(candyPosition, candyRow) {
	for (var i = 0; i < candyPosition.length; i++) {
		candyRow[candyPosition[i]].addClass('delete');
	}
}

// Establece la puntuación de acuerdo al número de dulces que tienes
function setScore(candyCount) {
	var score = Number($('#score-text').text());
	switch (candyCount) {
		case 3:
			score += 25;
			break;
		case 4:
			score += 50;
			break;
		case 5:
			score += 75;
			break;
		case 6:
			score += 100;
			break;
		case 7:
			score += 200;
	}
	$('#score-text').text(score);
}

// Se llama cuando el juego comienza, o los cambios ocurren en el tablero del juego
function checkBoard() {
	fillBoard();
}

function fillBoard() {
	var top = 6;
	var column = $('[class^="col-"]');

	column.each(function () {
		var candys = $(this).children().length;
		var agrega = top - candys;
		for (var i = 0; i < agrega; i++) {
			var candyType = getRandomInt(1, 5);
			if (i === 0 && candys < 1) {
				$(this).append('<img src="image/' + candyType + '.png" class="element"></img>');
			} else {
				$(this).find('img:eq(0)').before('<img src="image/' + candyType + '.png" class="element"></img>');
			}
		}
	});
	addCandyEvents();
	setValidations();
}

// Establece las validaciones de columnas y fila
function setValidations() {
	columnValidation();
	rowValidation();

	if ($('img.delete').length !== 0) {
		deletesCandyAnimation();
	}
}

// Añade los eventos de dulces. Llamadas cada vez que se crean
function addCandyEvents() {
	$('img').draggable({
		containment: '.panel-tablero',
		droppable: 'img',
		revert: true,
		revertDuration: 500,
		grid: [100, 100],
		zIndex: 10,
		drag: constrainCandyMovement
	});
	$('img').droppable({
		drop: swapCandy
	});
	enableCandyEvents();
}

function disableCandyEvents() {
	$('img').draggable('disable');
	$('img').droppable('disable');
}

function enableCandyEvents() {
	$('img').draggable('enable');
	$('img').droppable('enable');
}

// Limita el movimiento del caramelo (éste es defectuoso)
function constrainCandyMovement(event, candyDrag) {
	candyDrag.position.top = Math.min(100, candyDrag.position.top);
	candyDrag.position.bottom = Math.min(100, candyDrag.position.bottom);
	candyDrag.position.left = Math.min(100, candyDrag.position.left);
	candyDrag.position.right = Math.min(100, candyDrag.position.right);
}

// Cambia un caramelo por otro (a través de arrastrar y soltar)
function swapCandy(event, candyDrag) {
	var candyDrag = $(candyDrag.draggable);
	var dragSrc = candyDrag.attr('src');
	var candyDrop = $(this);
	var dropSrc = candyDrop.attr('src');
	candyDrag.attr('src', dropSrc);
	candyDrop.attr('src', dragSrc);

	setTimeout(function () {
		checkBoard();

		// De esta manera, impedimos movimientos equivocados
		if ($('img.delete').length === 0) {
			candyDrag.attr('src', dragSrc);
			candyDrop.attr('src', dropSrc);
		} else {
			updateMoves();
		}
	}, 500);

}

function checkBoardPromise(result) {
	if (result) {
		checkBoard();
	}
}

// Actualiza el valor de los movimientos
function updateMoves() {
	var actualValue = Number($('#movimientos-text').text());
	var result = actualValue += 1;
	$('#movimientos-text').text(result);
}

// Animación que precede a la eliminación de dulces
function deletesCandyAnimation() {
	disableCandyEvents();
	$('img.delete').effect('pulsate', 400);
	$('img.delete').animate({
			opacity: '0'
		}, {
			duration: 300
		})
		.animate({
			opacity: '0'
		}, {
			duration: 400,
			complete: function () {
				deletesCandy()
					.then(checkBoardPromise)
					.catch(showPromiseError);
			},
			queue: true
		});
}

function showPromiseError(error) {
	console.log(error);
}

// Elimina el caramelo (devuelve una promesa)
function deletesCandy() {
	return new Promise(function (resolve, reject) {
		if ($('img.delete').remove()) {
			resolve(true);
		} else {
			reject('No se pudo eliminar Candy...');
		}
	})
}

// Termina el juego
function endGame() {
	$('div.panel-tablero, div.time').effect('fold');
	$('h1.main-titulo').addClass('title-over')
		.text('Gracias por jugar!');
	$('div.score, div.moves, div.panel-score').width('100%');
}

// Comienza el juego
function initGame() {

	colorBlink('h1.main-titulo');

	$('.btn-reinicio').click(function () {
		// Recarga la página cuando se hace clic por segunda vez
		if ($(this).text() === 'Reiniciar') {
			location.reload(true);
		}
		checkBoard();
		$(this).text('Reiniciar');

		$('#timer').startTimer({
			onComplete: endGame
		})
	});
}

// Prepara el juego
$(function() {
	initGame();
});
