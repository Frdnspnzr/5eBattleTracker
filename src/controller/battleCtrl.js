app.controller('BattleCtrl', ['$scope', '$log', function($scope,$log) {

	$scope.round = 0;
	$scope.creatures = [];

	$scope.sortCreatures = function() {
		$scope.creatures.sort(function(a,b) {
			return b.initiative - a.initiative;
		});
	};

	$scope.restart = function() {
		$scope.round = 0;
		if ($scope.creatures.length > 0) {
			$scope.setCreatureActive(0);
		}
		for (var i = 1; i < $scope.creatures.length; i++) {
			$scope.setCreatureInactive(i);
		}
	};

	$scope.forward = function() {

		//Find the currently active creature
		var active = -1;
		for (var i = 0; i < $scope.creatures.length; i++) {
			if ($scope.creatures[i].active == 'active') {
				active = i;
				init = $scope.creatures[i].initiative;
				break;
			}
		}

		if (active + 1 == $scope.creatures.length) {
			$scope.round++;
			if ($scope.creatures.length > 0) {
				$scope.setCreatureActive(0);
			}
			for (i = 1; i < $scope.creatures.length; i++) {
				$scope.setCreatureInactive(i);
			}
			for (i = 0; i < $scope.creatures.length; i++) {
				for (j = 0; j < $scope.creatures[i].notes.length; j++) {
					if ($scope.creatures[i].notes[j].rounds > 0) {
						$scope.creatures[i].notes[j].rounds--;
					}
				}
			}
		} else {
			$scope.setCreatureInactive(active);
			$scope.setCreatureActive(active+1);
			for (j = 0; j < $scope.creatures[active].notes.length; j++) {
				if ($scope.creatures[active].notes[j].turns > 0) {
					$scope.creatures[active].notes[j].turns--;
				}
			}
		}

	};

	$scope.add = function() {
		var newCreature = {
			id: guid(),
			name: 'New creature',
			active: 'inactive',
			description: '',
			initiative: 0,
			hp: null,
			reaction: true,
			notes: []
		}

		if ($scope.creatures.length == 0) {
			newCreature.active = 'active';
		}

		$scope.creatures.push(newCreature);
	};

	$scope.parse = function(creature) {
		creature.hp = parseFormula(creature.hp.toString());
	}

	$scope.delete = function(id) {
		for (var i = 0; i < $scope.creatures.length; i++) {
			creature = $scope.creatures[i];

			//If the deleted creature is currently active skip it
			if (creature.active == 'active') {
				$scope.forward();
			}

			if (creature.id == id) {
				$scope.creatures.splice(i,1);
				break;
			}
		}
	};

	$scope.clone = function(id) {
		for (var i = 0; i < $scope.creatures.length; i++) {
			creature = $scope.creatures[i];
			if (creature.id == id) {
				var newCreature = {
					id: guid(),
					name: creature.name,
					active: 'inactive',
					description: creature.description,
					initiative: creature.initiative,
					hp: creature.hp,
					reaction: creature.reaction,
					notes: []
				}
				//Increment number at the end of the name
				newCreature.name = newCreature.name.replace(/\d+$/,function(match) {
					var number = parseInt(match);
					number++;
					return number;
				});
				$scope.creatures.push(newCreature);
				break;
			}
		}
	};

	$scope.addNote = function(creatureID) {
		for (var i = 0; i < $scope.creatures.length; i++) {
			creature = $scope.creatures[i];
			if (creature.id == creatureID) {
				var newNote = {
					id: guid(),
					text: "New note",
					rounds: null,
					turns: null
				};
				creature.notes.push(newNote);
				break;
			}
		}
	};

	$scope.deleteNote = function(creatureID,noteID) {
		search:
		for (var i = 0; i < $scope.creatures.length; i++) {
			creature = $scope.creatures[i];
			if (creature.id == creatureID) {
				for (j = 0; j < creature.notes.length; j++) {
					note = creature.notes[j];
					if (note.id == noteID) {
						creature.notes.splice(j,1);
						break search;
					}
				}
			}
		}
	};

	$scope.setCreatureActive = function(index) {
		$scope.creatures[index].active = 'active';
		$scope.creatures[index].reaction = true;
	}

	$scope.setCreatureInactive = function(index) {
		$scope.creatures[index].active = 'inactive';
	}

}]);