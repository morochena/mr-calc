<script>
	import {
		Table,
		TableBody,
		TableBodyCell,
		TableBodyRow,
		TableHead,
		TableHeadCell,
		Checkbox,
		TableSearch,
		Label,
		Input,
		Textarea,
		Button,
		ButtonGroup,
		Select
	} from 'flowbite-svelte';

	import StatInput from '../../components/statInput.svelte';
	import SpecialtyInput from '../../components/specialtyInput.svelte';

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
		calcTotalSkillBonus,
		calcSpecialtyBonus
	} from '../../utils/calculations';
	import skillPool from '../../utils/data/skills';

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
			'Long blades': { value: 3, skill: 'accuracy' },
			Dodge: { value: 1, skill: 'stealth' }
		},
		size: 'medium',
		difficulty: 'average',
		is_public: false
	};
</script>

<div class="flex justify-end">
	<ButtonGroup class="space-x-px my-4">
		<Button pill color="purple">Public View</Button>
		<Button pill color="purple">Export</Button>
		<Button pill color="purple">Make a Copy</Button>
	</ButtonGroup>
</div>

<Label class="space-y-2">
	<span>Name</span>
	<Input type="text" size="lg" bind:value={monster.name} />
</Label>

<Label for="description" class="mb-2">Description</Label>
<Textarea
	id="description"
	placeholder=""
	rows="7"
	name="description"
	bind:value={monster.description}
/>

<h1 class="text-4xl dark:text-white pb-8 mt-8">Stats</h1>

<div class="grid gap-6 mb-6 md:grid-cols-2">
	<Table striped={true}>
		<TableBody class="divide-y">
			<StatInput
				label="Strength"
				bind:statValue={monster.str}
				statBonus={calcStatBonus(monster.str)}
			/>
			<StatInput
				label="Dexterity"
				bind:statValue={monster.dex}
				statBonus={calcStatBonus(monster.dex)}
			/>
			<StatInput
				label="Empathy"
				bind:statValue={monster.emp}
				statBonus={calcStatBonus(monster.emp)}
			/>
			<StatInput
				label="Intelligence"
				bind:statValue={monster.int}
				statBonus={calcStatBonus(monster.int)}
			/>

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
				<TableBodyCell>{calcBody(monster)}</TableBodyCell>
			</TableBodyRow>
			<TableBodyRow>
				<TableBodyCell>Mind</TableBodyCell>
				<TableBodyCell>{calcMind(monster)}</TableBodyCell>
			</TableBodyRow>
			<TableBodyRow>
				<TableBodyCell>Dodge</TableBodyCell>
				<TableBodyCell>{calcDodge(monster)}</TableBodyCell>
			</TableBodyRow>
			<TableBodyRow>
				<TableBodyCell>Consider</TableBodyCell>
				<TableBodyCell>{calcConsider(monster)}</TableBodyCell>
			</TableBodyRow>
			<TableBodyRow>
				<TableBodyCell>Perception</TableBodyCell>
				<TableBodyCell>{calcPerception(monster)}</TableBodyCell>
			</TableBodyRow>
			<TableBodyRow>
				<TableBodyCell>Move</TableBodyCell>
				<TableBodyCell>{calcMove(monster)}</TableBodyCell>
			</TableBodyRow>
			<TableBodyRow>
				<TableBodyCell>Run</TableBodyCell>
				<TableBodyCell>{calcRun(monster)}</TableBodyCell>
			</TableBodyRow>
			<TableBodyRow>
				<TableBodyCell>~XP</TableBodyCell>
				<TableBodyCell>{calcLevel(monster)}</TableBodyCell>
			</TableBodyRow>
		</TableBody>
	</Table>
</div>

<h1 class="text-4xl dark:text-white pb-8">Skills</h1>
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
	<Table striped={true}>
		<TableBody class="divide-y">
			<StatInput
				label="Accuracy"
				bind:statValue={monster.accuracy}
				statBonus={calcTotalSkillBonus(monster.dex, monster.accuracy)}
			/>
			<StatInput
				label="Mobility"
				bind:statValue={monster.mobility}
				statBonus={calcTotalSkillBonus(monster.dex, monster.mobility)}
			/>
			<StatInput
				label="Thievery"
				bind:statValue={monster.thievery}
				statBonus={calcTotalSkillBonus(monster.dex, monster.thievery)}
			/>
			<StatInput
				label="Notice"
				bind:statValue={monster.notice}
				statBonus={calcTotalSkillBonus(monster.dex, monster.notice)}
			/>
			<StatInput
				label="Stealth"
				bind:statValue={monster.stealth}
				statBonus={calcTotalSkillBonus(monster.dex, monster.stealth)}
			/>
		</TableBody>
	</Table>
	<Table striped={true}>
		<TableBody class="divide-y">
			<StatInput
				label="Animal Handling"
				bind:statValue={monster.animal_handling}
				statBonus={calcTotalSkillBonus(monster.emp, monster.animal_handling)}
			/>
			<StatInput
				label="Deceive"
				bind:statValue={monster.deceive}
				statBonus={calcTotalSkillBonus(monster.emp, monster.deceive)}
			/>
			<StatInput
				label="Rapport"
				bind:statValue={monster.rapport}
				statBonus={calcTotalSkillBonus(monster.emp, monster.rapport)}
			/>
			<StatInput
				label="Willpower"
				bind:statValue={monster.willpower}
				statBonus={calcTotalSkillBonus(monster.emp, monster.willpower)}
			/>
			<StatInput
				label="Mysticism"
				bind:statValue={monster.mysticism}
				statBonus={calcTotalSkillBonus(monster.emp, monster.mysticism)}
			/>
		</TableBody>
	</Table>
	<Table striped={true}>
		<TableBody class="divide-y">
			<StatInput
				label="Craft"
				bind:statValue={monster.craft}
				statBonus={calcTotalSkillBonus(monster.int, monster.craft)}
			/>
			<StatInput
				label="Travel"
				bind:statValue={monster.travel}
				statBonus={calcTotalSkillBonus(monster.int, monster.travel)}
			/>
			<StatInput
				label="Reasoning"
				bind:statValue={monster.reasoning}
				statBonus={calcTotalSkillBonus(monster.int, monster.reasoning)}
			/>
			<StatInput
				label="Lore"
				bind:statValue={monster.lore}
				statBonus={calcTotalSkillBonus(monster.int, monster.lore)}
			/>
			<StatInput
				label="Resourcefulness"
				bind:statValue={monster.resourcefulness}
				statBonus={calcTotalSkillBonus(monster.int, monster.resourcefulness)}
			/>
		</TableBody>
	</Table>
</div>

<div class="grid gap-6 mb-6 md:grid-cols-2">
	<div>
		<h1 class="text-4xl dark:text-white pb-8">Specialties</h1>
		<Table striped={true}>
			<TableBody class="divide-y">
				{#each Object.keys(monster.specialties || {}) as specialty}
					<SpecialtyInput
						label={specialty}
						statSkill={monster.specialties[specialty].skill}
						bind:statValue={monster.specialties[specialty].value}
						statBonus={calcSpecialtyBonus(monster, monster.specialties[specialty])}
					/>
				{/each}
			</TableBody>
		</Table>

		<form class="mt-4">
			<div class="grid gap-6 mb-6 md:grid-cols-2">
				<Label class="space-y-2">
					<span>New Specialty</span>
					<Input type="text" required />
				</Label>
				<Label class="space-y-2">
					<span>Skill</span>
					<Select items={skillPool().map((e) => ({ name: e.name, value: e.name }))} required />
				</Label>
			</div>
			<Button type="submit">Add</Button>
		</form>
	</div>
	<div>
		<h1 class="text-4xl dark:text-white pb-8">Equipment</h1>

		<form class="mt-4">
			<Label class="space-y-2">
				<span>Type</span>
				<Select items={equipmentTypes} bind:value={selectedNewEquipmentType} required />
			</Label>
			<div class="grid gap-6 mb-6 md:grid-cols-2 mt-4">
				<Label class="space-y-2">
					<span>Name</span>
					<Input type="text" required />
				</Label>
				<Label class="space-y-2">
					<span>Roll Bonus</span>
					<Input type="number" required value="0" />
				</Label>
				<Label class="space-y-2">
					<span>Skill</span>
					<Select items={skillPool().map((e) => ({ name: e.name, value: e.name }))} />
				</Label>
				<Label class="space-y-2">
					<span>Specialty</span>
					<Select items={Object.keys(monster.specialties).map((e) => ({ name: e, value: e }))} />
				</Label>
				<Label class="space-y-2">
					<span>Damage Formula</span>
					<Input type="text" value="" placeholder="eg. [str] + 3" />
				</Label>
				<Label class="space-y-2">
					<span>Armor Piercing</span>
					<Input type="number" value="0" />
				</Label>
			</div>
			<Button type="submit">Add</Button>
		</form>
	</div>
</div>

<h1 class="text-4xl dark:text-white pb-8">Spells</h1>
