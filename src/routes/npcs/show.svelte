<script>
	import {
		Table,
		TableBody,
		TableBodyCell,
		TableBodyRow,
		TableHead,
		TableHeadCell,
		Checkbox,
		TableSearch
	} from 'flowbite-svelte';

	import StatInput from '../../components/statInput.svelte';

	import {
		calcBody,
		calcConsider,
		calcDodge,
		calcLevel,
		calcMind,
		calcMove,
		calcPerception,
		calcRun,
		calcStatBonus,
		calcTotalSkillBonus
	} from '../../utils/calculations';

	let monster = {
		id: 134,
		user_id: '0c0e600d-12ce-4895-bce7-6bcec3e39dc9',
		name: 'Shi Huang',
		inserted_at: '2022-11-10T23:03:40.403179+00:00',
		str: 9,
		dex: 12,
		emp: 8,
		int: 6,
		description:
			'- From Jeon\n- Dual wields scimitars\n- Looks very intimidating, he’s obviously the enforcer on the ship\n\nEquipment: \nDual Wield Scimitars\nArmor: Gambeson (+2) and Splint Mail (+4)',
		smash: 2,
		launch: 1,
		athletics: 1,
		physique: 1,
		provoke: 1,
		accuracy: 3,
		mobility: 3,
		thievery: 3,
		notice: 2,
		stealth: 0,
		animal_handling: 0,
		deceive: 0,
		rapport: 0,
		willpower: 1,
		mysticism: 0,
		craft: 0,
		travel: 0,
		reasoning: 0,
		lore: 0,
		resourcefulness: 0,
		specialties: {
			'Long blades': 3,
			Dodge: 3
		},
		size: 'medium',
		difficulty: 'average',
		is_public: false
	};
</script>

<div class="grid gap-6 mb-6 md:grid-cols-2">
	<Table striped={true}>
		<TableBody class="divide-y">
			<TableBodyRow>
				<TableBodyCell>STR</TableBodyCell>
				<TableBodyCell>0</TableBodyCell>
			</TableBodyRow>
			<TableBodyRow>
				<TableBodyCell>DEX</TableBodyCell>
				<TableBodyCell>0</TableBodyCell>
			</TableBodyRow>
			<TableBodyRow>
				<TableBodyCell>EMP</TableBodyCell>
				<TableBodyCell>0</TableBodyCell>
			</TableBodyRow>
			<TableBodyRow>
				<TableBodyCell>INT</TableBodyCell>
				<TableBodyCell>0</TableBodyCell>
			</TableBodyRow>
			<TableBodyRow>
				<TableBodyCell>Size</TableBodyCell>
				<TableBodyCell>0</TableBodyCell>
			</TableBodyRow>
		</TableBody>
	</Table>

	<Table striped={true}>
		<TableBody class="divide-y">
			<TableBodyRow>
				<TableBodyCell>Body</TableBodyCell>
				<TableBodyCell>0</TableBodyCell>
			</TableBodyRow>
			<TableBodyRow>
				<TableBodyCell>Mind</TableBodyCell>
				<TableBodyCell>0</TableBodyCell>
			</TableBodyRow>
			<TableBodyRow>
				<TableBodyCell>Dodge</TableBodyCell>
				<TableBodyCell>0</TableBodyCell>
			</TableBodyRow>
			<TableBodyRow>
				<TableBodyCell>Consider</TableBodyCell>
				<TableBodyCell>0</TableBodyCell>
			</TableBodyRow>
			<TableBodyRow>
				<TableBodyCell>Perception</TableBodyCell>
				<TableBodyCell>0</TableBodyCell>
			</TableBodyRow>
			<TableBodyRow>
				<TableBodyCell>Move</TableBodyCell>
				<TableBodyCell>0</TableBodyCell>
			</TableBodyRow>
			<TableBodyRow>
				<TableBodyCell>Run</TableBodyCell>
				<TableBodyCell>0</TableBodyCell>
			</TableBodyRow>
			<TableBodyRow>
				<TableBodyCell>~XP</TableBodyCell>
				<TableBodyCell>0</TableBodyCell>
			</TableBodyRow>
		</TableBody>
	</Table>
</div>

<div class="grid gap-6 mb-6 md:grid-cols-2">
	<Table striped={true}>
		<TableBody class="divide-y">
			<StatInput
				label="Smash"
				bind:statValue={monster.smash}
				statBonus={calcTotalSkillBonus(monster.str, monster.smash)}
			/>
			<StatInput
				label="Launch"
				bind:statValue={monster.launch}
				statBonus={calcTotalSkillBonus(monster.str, monster.launch)}
			/>
			<StatInput
				label="Athletics"
				bind:statValue={monster.athletics}
				statBonus={calcTotalSkillBonus(monster.str, monster.athletics)}
			/>
			<StatInput
				label="Physique"
				bind:statValue={monster.physique}
				statBonus={calcTotalSkillBonus(monster.str, monster.physique)}
			/>
			<StatInput
				label="Provoke"
				bind:statValue={monster.provoke}
				statBonus={calcTotalSkillBonus(monster.str, monster.provoke)}
			/>
		</TableBody>
	</Table>
</div>
