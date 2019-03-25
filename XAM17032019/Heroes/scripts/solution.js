function solve() {
	let characterStats = {
		FIGHTERS: { attack: 50, defense: 50 },
		MAGES: { attack: 70, defense: 30 },
		TANKS: { attack: 20, defense: 80 }
	}
	function isValidName(name) {
		return typeof name === 'string' && name.length >= 2;
	}
	let kingdomNameRebuildInput = $('#kingdom input')[0];
	let kingNameInput = $('#kingdom input')[1];
	let rebuildButton = $('#kingdom button');
	rebuildButton.click(() => {
		let kingName = kingNameInput.value;
		if (isValidName(kingName)) {
			let kingdomName = kingdomNameRebuildInput.value.toLowerCase();
			let kingdom = $($('#map div[id="' + `${kingdomName}` + '"]')[0]);
			if (kingdom && kingdom.css('display') === 'none') {
				kingdom.append($(`<h1>${kingdomName.toUpperCase()}</h1>`));
				let castle = $('<div>');
				castle.addClass('castle');
				kingdom.append(castle);
				kingdom.append($(`<h2>${kingName.toUpperCase()}</h2>`));
				let army = $('<fieldset>');
				army.append($('<legend>Army</legend>'));
				let characterTypes = ['TANKS', 'FIGHTERS', 'MAGES'];
				for (let characterType of characterTypes) {
					let platoon = $(`<p>${characterType} - 0</p>`);
					platoon.appendTo(army);
				}
				let armyOutput = $('<div>');
				armyOutput.addClass('armyOutput');;
				army.append(armyOutput)
				kingdom.append(army);
				kingdom.css('display', 'inline-block');
			}
		}
	});
	let characterNameInput = $('#characters input[type="text"]')[0];
	let kingdomNameJoinInput = $('#characters input[type="text"]')[1];
	let joinButton = $('#characters button');
	joinButton.click(() => {
		let selectedCharacter = $('input[name="characterType"]:checked')[0];
		if (selectedCharacter) {
			let characterType = selectedCharacter.value.toUpperCase();
			let characterName = characterNameInput.value;
			if (isValidName(characterName)) {
				let kingdomName = kingdomNameJoinInput.value.toLowerCase();
				let kingdom = $($('#map div[id="' + `${kingdomName}` + '"]')[0]);
				if (kingdom && kingdom.css('display') !== 'none') {
					let characterStatus = Array.from(kingdom.children('fieldset').children('p'))
						.filter(p => $(p).text().includes(characterType))[0];
					let characterCount = Number(characterStatus.innerText.split(' - ')[1]) + 1;
					characterStatus.innerText = `${characterType}S - ${characterCount}`;
				}
				let armyOutput = kingdom.children('fieldset').children('div');
				armyOutput.text(`${armyOutput.text()} ${characterName}`.trim());
			}
		}
	});
	let warButton = $('#actions button');
	let kingdomNameAttackerInput = $('#actions input[type="text"]')[0];
	let kingdomNameDefenderInput = $('#actions input[type="text"]')[1];
	warButton.click(() => {
		let attackingKingdomName = kingdomNameAttackerInput.value.toLowerCase();
		let attackingKingdom = $($('#map div[id="' + `${attackingKingdomName}` + '"]')[0]);
		if (attackingKingdom && attackingKingdom.css('display') !== 'none') {
			let defendingKingdomName = kingdomNameDefenderInput.value.toLowerCase();
			let defendingKingdom = $($('#map div[id="' + `${defendingKingdomName}` + '"]')[0]);
			if (defendingKingdom && defendingKingdom.css('display') !== 'none') {
				if (attackingKingdomName !== defendingKingdomName) {
					let attackers = Array.from(attackingKingdom.children('fieldset')
						.children('p')).map(p => $(p).text());
					let attackingKingdomStrength = 0;
					for (let attackGroup of attackers) {
						let attackerInfo = attackGroup.split(' - ');
						let characterCount = Number(attackerInfo[1]);
						if (characterCount > 0) {
							let characterType = attackerInfo[0];
							let characterAttack = characterStats[characterType].attack;
							attackingKingdomStrength += characterCount * characterAttack;
						}
					}
					let defenders = Array.from(defendingKingdom.children('fieldset')
						.children('p')).map(p => $(p).text());
					let defendingKingdomResilience = 0;
					for (let defenseGroup of defenders) {
						let defenderInfo = defenseGroup.split(' - ');
						let characterCount = Number(defenderInfo[1]);
						if (characterCount > 0) {
							let characterType = defenderInfo[0];
							let characterDefense = characterStats[characterType].defense;
							defendingKingdomResilience += characterCount * characterDefense;
						}
					}
					if (attackingKingdomStrength > defendingKingdomResilience) {
						let attackingKing = attackingKingdom.children('h2')[0].innerText;
						defendingKingdom.children('h2')[0].innerText = attackingKing;
					}
				}
			}
		}
	});
}

solve();