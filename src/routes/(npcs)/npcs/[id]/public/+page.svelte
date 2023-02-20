<script>
	import skillPool from '$lib/utils/data/skills';
	import {
		calcBody,
		calcConsider,
		calcDodge,
		calcLevel,
		calcMind,
		calcMove,
		calcPerception,
		calcRawSpecialtyBonus,
		calcRun,
		calcStatBonus,
		calcTotalSkillBonus,
		formattedValue
	} from '$lib/utils/npcs/statCalculations';
	import { damageCalculation, toHit } from '$lib/utils/npcs/weaponCalculations';

	export let data;
	let { monster } = data;

	let metaText = '';
	let calculatedStatsText = '';
	let baseStatsText = '';
	let skillText = '';
	let specialtyText = '';
	let equipmentText = '';
	let spellText = '';

	const printStats = () => {
		const str = `${monster.str}(${calcStatBonus(monster.str)})`.padEnd(8);
		const dex = `${monster.dex}(${calcStatBonus(monster.dex)})`.padEnd(8);
		const emp = `${monster.emp}(${calcStatBonus(monster.emp)})`.padEnd(8);
		const int = `${monster.int}(${calcStatBonus(monster.int)})`.padEnd(8);

		const strLabel = `STR`.padEnd(8);
		const dexLabel = `DEX`.padEnd(8);
		const empLabel = `EMP`.padEnd(8);
		const intLabel = `INT`.padEnd(8);

		return str + dex + emp + int + '\n' + strLabel + dexLabel + empLabel + intLabel;
	};

	const printSkills = () => {
		const getStatValue = (skill) => {
			const stat = skillPool().find((skillz) => skillz.name === skill.name).stat;
			return monster[stat];
		};

		return skillPool()
			.map((skill) => {
				if (monster[skill.name]) {
					const statValue = getStatValue(skill);
					return (
						skill.name +
						': ' +
						monster[skill.name] +
						`(${calcTotalSkillBonus(statValue, monster[skill.name])})`
					);
				}
			})
			.filter((skill) => skill)
			.join('\n');
	};

	const printSpecialties = () => {
		return Object.keys(monster.specialties)
			.map((specialty) => {
				if (monster.specialties[specialty]) {
					return (
						specialty + ': ' + '+' + calcRawSpecialtyBonus(monster, monster.specialties[specialty])
					);
				}
			})
			.join('\n');
	};

	const cleanDescription = (description) => {
		// split description into lines that are 80 characters or less
		// add to new line if split

		const lines = description.split('\n');
		const newLines = [];

		lines.forEach((line) => {
			if (line.length > 60) {
				const split = line.match(/.{1,60}(\s|$)/g);
				split.forEach((splitLine) => {
					newLines.push(splitLine);
				});
			} else {
				newLines.push(line);
			}
		});

		return newLines.join('\n');
	};

	const printEquipment = () => {
		return monster.equipment
			.map((item) => {
				return `${item.name} (${item.type}) Hit: ${formattedValue(
					toHit(monster, item.roll_bonus, item.specialties, item.skills)
				)} DMG: (${damageCalculation(monster, item.damage_formula)})`;
			})
			.join('\n');
	};

	const printSpells = () => {
		return '';
	};

	metaText = `
${monster.name}
Size: ${monster.size}
${cleanDescription(monster.description)}
`;

	baseStatsText = `
Base Stats:
${printStats()}
`;

	skillText = `
Skills:
${printSkills()}
`;
	specialtyText = `
Specialties:
${printSpecialties()}
`;

	calculatedStatsText = `
Calculated Stats:
Body: ${calcBody(monster)}
Mind: ${calcMind(monster)}
Dodge: ${calcDodge(monster)}
Consider: ${calcConsider(monster)}
Perception: ${calcPerception(monster)}
Move: ${calcMove(monster)}
Run: ${calcRun(monster)}
~XP: ${calcLevel(monster)}
`;

	equipmentText = `
Equipment:
${printEquipment()}
`;

	spellText = `
Spells:
${printSpells()}
`;
</script>

<table class="dark:text-white text-black">
	<tr><td><pre>{metaText}</pre></td></tr>
	<tr><td><pre>{baseStatsText}</pre></td></tr>
	<tr><td><pre>{skillText}</pre></td> </tr>
	<tr><td><pre>{specialtyText}</pre></td></tr>
	<tr><td><pre>{equipmentText}</pre></td></tr>
	<tr><td><pre>{spellText}</pre></td></tr>
</table>

<style>
	table td,
	table td * {
		vertical-align: top;
	}
</style>
