function guid() {
	function s4() {
		return Math.floor((1 + Math.random()) * 0x10000)
		.toString(16)
		.substring(1);
	}
	return s4() + s4() + '-' + s4() + '-' + s4() + '-' +
	s4() + '-' + s4() + s4() + s4();
}

function parseFormula(formula) {
	if(formula.indexOf("+") > -1) {
		return formula.split("+").reduce(function(previousValue,currentValue) {
			return previousValue+parseFormula(currentValue);
		},0)
	} else if (formula.indexOf("-") > -1) {
		return formula.split("-").reduce(function(previousValue,currentValue, idx) {
			if (idx == 0) {
				return parseFormula(currentValue);
			} else {
				return previousValue-parseFormula(currentValue);
			}
		},0)
	} else if (formula.indexOf("d") > -1) {
		var e = formula.split("d",2);
		var left = parseFormula(e[0]);
		var right = parseFormula(e[1]);
		var sum = 0;
		for (var i = 1; i <= left; i++) {
			sum += rollDie(right);
		}
		return sum;
	} else {
		return parseInt(formula);
	}
}

function rollDie(sides) {
	return Math.floor(Math.random() * (sides - 1 + 1)) + 1;
}