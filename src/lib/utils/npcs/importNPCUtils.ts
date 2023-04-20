const validKeys = [
	'id',
	'user_id',
	'name',
	'inserted_at',
	'str',
	'dex',
	'emp',
	'int',
	'description',
	'smash',
	'launch',
	'athletics',
	'physique',
	'provoke',
	'accuracy',
	'mobility',
	'thievery',
	'notice',
	'stealth',
	'animal_handling',
	'deceive',
	'rapport',
	'willpower',
	'mysticism',
	'craft',
	'travel',
	'reasoning',
	'lore',
	'resourcefulness',
	'specialties',
	'size',
	'difficulty',
	'is_public',
	'tags',
	'spell_ids',
	'equipment_ids'
];

export const parseTemplateLine = (line: string, data: any) => {
	try {
		const parts = line.split(':');

		if (parts[0].toLowerCase() === 'name') {
			data.name = parts[1].trim();
			return;
		}

		if (parts[0].toLowerCase() === 'description') {
			data.description = parts[1].trim();
			return;
		}

		if (parts.length === 2) {
			const key = parts[0].trim().toLowerCase();
			const value = parts[1].trim().split(' ')[0].trim();
			if (key !== '') {
				data[key] = value;
			}
		}
	} catch (error) {
		console.warn('Error parsing template line:', line, error);
	}
};

export const parseSpecialtyLine = (line: string, data: any, specialties: any) => {
	try {
		const specialtyParts = line.match(/(\S+)\s*:\s*(\S+)\s+(\d+)/);
		if (specialtyParts && specialtyParts.length === 4) {
			const skill = specialtyParts[1].trim();
			const specialtyKey = specialtyParts[2].trim();
			const specialtyValue = specialtyParts[3].trim();
			if (skill !== '' && specialtyKey !== '') {
				specialties[specialtyKey] = {
					value: specialtyValue,
					skill: skill
				};
			}
		}
	} catch (error) {
		console.warn('Error parsing specialty line:', line, error);
	}
};

export const parseTemplate = (template: string) => {
	const lines = template.split('\n');
	const data: any = {};
	let parsingSpecialties = false;
	let parsingSpells = false;
	let parsingEquipment = false;
	const specialties: any = {};

	lines.forEach((line) => {
		try {
			if (line.trim() === 'Specialties:') {
				parsingSpecialties = true;
				return;
			} else if (line.trim() === 'Spells:') {
				parsingSpells = true;
				parsingSpecialties = false;
				return;
			} else if (line.trim() === 'Equipment:') {
				parsingEquipment = true;
				parsingSpells = false;
				return;
			}

			if (!parsingSpecialties && !parsingSpells && !parsingEquipment) {
				parseTemplateLine(line, data);
			} else if (parsingSpecialties) {
				parseSpecialtyLine(line, data, specialties);
			} else if (parsingSpells || parsingEquipment) {
				data.description = data.description ? data.description + '\n' + line.trim() : line.trim();
			}
		} catch (error) {
			console.warn('Error processing line:', line, error);
		}
	});

	data.specialties = specialties;

	Object.keys(data).forEach((key) => {
		if (!validKeys.includes(key)) {
			delete data[key];
		}
		if (data[key] === '') {
			delete data[key];
		}
	});

	return data;
};
