(function() {
	var rollButton = document.getElementById('roll-btn'),
		widgetRollButton = document.getElementById('widget-roll-btn');

	if (rollButton !== null)
		rollButton.addEventListener('click', rollDice);
	if (widgetRollButton !== null)
		widgetRollButton.addEventListener('click', widgetRollDice);

	function rollDice() {
		clearRolls('dice-roll', 'all-rolls');
		var numberOfDice = document.getElementById('number-dice').value;
		
		if (numberOfDice < 1)
			return;
		
		var dieType = document.getElementById('die-type').value,
			rolls = getRolls(numberOfDice, dieType),
			modifier = parseInt(document.getElementById('modifier').value);

		displayTotal('dice-roll', parseInt(rolls.reduce(addValues)) + modifier);
	}

	function widgetRollDice() {
		clearRolls('dice-roll-widget');
		var numberOfDice = document.getElementById('widget-number-dice').value;
		
		if (numberOfDice < 1)
			return;
		
		var dieType = document.getElementById('widget-die-type').value,
			rolls = getRolls(numberOfDice, dieType),
			modifier = parseInt(document.getElementById('widget-modifier').value);

		displayTotal('dice-roll-widget', parseInt(rolls.reduce(addValues)) + modifier);
	}

	function getRolls(numberOfDice, dieType) {
		var rolls = [];
		for (var i = 0; i < numberOfDice; i++) {
			rolls.push(randomNumber(1, dieType));
		}
		return rolls;
	}

	function randomNumber(min, max) {
		return Math.floor(Math.random() * (max - min + 1)) + min;
	}

	function addValues(a, b) {
		return a + b;
	}

	function displayTotal(containerId, value) {
		document.getElementById(containerId).innerHTML = value;
	}

	function displayAllRolls(containerId, values) {
		document.getElementById(containerId).innerHTML = '(' + values.join(', ') + ')';
	}

	function clearRolls(rollContainerId, allRollsContainerId) {
		document.getElementById(rollContainerId).innerHTML = '';
		document.getElementById(allRollsContainerId).innerHTML = '';
	}
})();