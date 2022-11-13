<script>
	import WeaponRow from '../WeaponRow.svelte';

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
	import { supabaseClient } from '$lib/db';
	import Toastify from 'toastify-js';
	import 'toastify-js/src/toastify.css';
	import StatInput from '../../../components/statInput.svelte';
	import SpecialtyInput from '../../../components/specialtyInput.svelte';
	import SSelect from 'svelte-select';

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
	} from '../../../utils/calculations';
	import skillPool from '../../../utils/data/skills';
	import { sizes } from '../../../utils/data/sizes';

	export let data;
	let { disableInputs, monster } = data;

	// Start Spells
	let selectedSpellId = null;

	const addSpell = async () => {
		if (!selectedSpellId) return;

		monster.spell_ids.push(selectedSpellId.value);

		const { data: spell } = await supabaseClient
			.from('spells')
			.select('name')
			.eq('id', selectedSpellId.value)
			.single();

		monster = {
			...monster,
			spells: [...(monster.spells || []), spell]
		};
	};

	const fetchSpells = async (spellFilterText) => {
		const { data: spells, error } = await supabaseClient
			.from('spells')
			.select('id, name')
			.ilike('name', `%${spellFilterText}%`)
			.order('name', { ascending: true })
			.limit(20);

		return spells?.map((e) => ({ value: e.id, label: e.name })) || [];
	};

	// Start Equipment
	let selectedEquipmentId = null;

	const addEquipment = async () => {
		if (!selectedEquipmentId) return;

		monster.equipment_ids.push(selectedEquipmentId.value);

		const { data } = await supabaseClient
			.from('equipment')
			.select('*')
			.eq('id', selectedEquipmentId.value)
			.single();

		monster = {
			...monster,
			equipment: [...monster.equipment, data]
		};
	};

	const fetchEquipment = async (filterText) => {
		const { data } = await supabaseClient
			.from('equipment')
			.select('id, name, type')
			.ilike('name', `%${filterText}%`)
			.limit(20);

		return data?.map((e) => ({ value: e.id, label: e.name, group: e.type })) || [];
	};
	// End Equipment

	// Start Specialties
	let specialtyName = '';
	let specialtySkill = '';
	const addSpecialty = () => {
		const value = {
			value: 1,
			skill: specialtySkill
		};

		monster.specialties[specialtyName] = value;
		specialtyName = '';
		specialtySkill = '';
	};
	const removeSpeciality = (specialtyName) => {
		const newSpecialties = { ...monster.specialties };
		delete newSpecialties[specialtyName];
		monster.specialties = newSpecialties;
	};
	// End Specialties

	const saveMonster = async () => {
		const monsterToSave = { ...monster };
		// if monster.tags is a string, then split it
		if (typeof monsterToSave.tags === 'string') {
			monsterToSave.tags = monsterToSave.tags.split(',').map((t) => t.trim());
		}

		// remove spells and equipment
		monsterToSave.spells = undefined;
		monsterToSave.equipment = undefined;

		const { error } = await supabaseClient
			.from('monsters')
			.update(monsterToSave)
			.eq('id', monsterToSave.id);
		if (!error) {
			Toastify({
				text: 'Saved!',
				duration: 3000
			}).showToast();
		} else {
			Toastify({
				text: 'Error!!',
				duration: 3000
			}).showToast();
		}
	};

	const exportMonster = () => {};

	const makeCopy = async () => {
		const { data: userData } = await supabaseClient.auth.getUser();
		const monsterData = { ...monster };
		delete monsterData.id;
		monsterData.name = monsterData.name + ' (copy)';
		monsterData.user_id = userData.user.id;
		const { data } = await supabaseClient.from('monsters').insert([monsterData]).select();

		window.location.href = `/npcs/${data[0].id}`;
	};

	const deleteMonster = async () => {
		await supabaseClient.from('monsters').delete().eq('id', monster.id);
		window.location.href = '/npcs';
	};
</script>

<div class="flex justify-end">
	<ButtonGroup class="space-x-px my-4">
		<Button on:click={saveMonster} disabled={disableInputs} pill color="purple">Save</Button>
		<Button href={`/npcs/${monster.id}/public`} pill color="purple">Public View</Button>
		<Button on:click={exportMonster} pill color="purple">Export</Button>
		<Button on:click={makeCopy} pill color="purple">Make a Copy</Button>
		<Button on:click={deleteMonster} disabled={disableInputs} pill color="purple">Delete</Button>
	</ButtonGroup>
</div>

<Label class="space-y-2">
	<span>Name</span>
	<Input type="text" size="lg" bind:value={monster.name} disabled={disableInputs} />
</Label>

<Label class="space-y-2">
	<span>Tags</span>
	<Input type="text" bind:value={monster.tags} disabled={disableInputs} />
</Label>

<Label for="description" class="mb-2">Description</Label>
<Textarea
	id="description"
	placeholder=""
	rows="7"
	name="description"
	bind:value={monster.description}
	disabled={disableInputs}
/>

<h1 class="text-4xl dark:text-white pb-8 mt-8">Stats</h1>

<div class="grid gap-6 mb-6 md:grid-cols-2">
	<Table striped={true}>
		<TableBody class="divide-y">
			<StatInput
				label="Strength"
				bind:statValue={monster.str}
				statBonus={calcStatBonus(monster.str)}
				disabled={disableInputs}
			/>
			<StatInput
				label="Dexterity"
				bind:statValue={monster.dex}
				statBonus={calcStatBonus(monster.dex)}
				disabled={disableInputs}
			/>
			<StatInput
				label="Empathy"
				bind:statValue={monster.emp}
				statBonus={calcStatBonus(monster.emp)}
				disabled={disableInputs}
			/>
			<StatInput
				label="Intelligence"
				bind:statValue={monster.int}
				statBonus={calcStatBonus(monster.int)}
				disabled={disableInputs}
			/>

			<TableBodyRow>
				<TableBodyCell>Size</TableBodyCell>
				<TableBodyCell>
					<Select items={sizes} bind:value={monster.size} disabled={disableInputs} />
				</TableBodyCell>
				<TableBodyCell />
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
				disabled={disableInputs}
			/>
			<StatInput
				label="Launch"
				bind:statValue={monster.launch}
				statBonus={calcTotalSkillBonus(monster.str, monster.launch)}
				disabled={disableInputs}
			/>
			<StatInput
				label="Athletics"
				bind:statValue={monster.athletics}
				statBonus={calcTotalSkillBonus(monster.str, monster.athletics)}
				disabled={disableInputs}
			/>
			<StatInput
				label="Physique"
				bind:statValue={monster.physique}
				statBonus={calcTotalSkillBonus(monster.str, monster.physique)}
				disabled={disableInputs}
			/>
			<StatInput
				label="Provoke"
				bind:statValue={monster.provoke}
				statBonus={calcTotalSkillBonus(monster.str, monster.provoke)}
				disabled={disableInputs}
			/>
		</TableBody>
	</Table>
	<Table striped={true}>
		<TableBody class="divide-y">
			<StatInput
				label="Accuracy"
				bind:statValue={monster.accuracy}
				statBonus={calcTotalSkillBonus(monster.dex, monster.accuracy)}
				disabled={disableInputs}
			/>
			<StatInput
				label="Mobility"
				bind:statValue={monster.mobility}
				statBonus={calcTotalSkillBonus(monster.dex, monster.mobility)}
				disabled={disableInputs}
			/>
			<StatInput
				label="Thievery"
				bind:statValue={monster.thievery}
				statBonus={calcTotalSkillBonus(monster.dex, monster.thievery)}
				disabled={disableInputs}
			/>
			<StatInput
				label="Notice"
				bind:statValue={monster.notice}
				statBonus={calcTotalSkillBonus(monster.dex, monster.notice)}
				disabled={disableInputs}
			/>
			<StatInput
				label="Stealth"
				bind:statValue={monster.stealth}
				statBonus={calcTotalSkillBonus(monster.dex, monster.stealth)}
				disabled={disableInputs}
			/>
		</TableBody>
	</Table>
	<Table striped={true}>
		<TableBody class="divide-y">
			<StatInput
				label="Animal Handling"
				bind:statValue={monster.animal_handling}
				statBonus={calcTotalSkillBonus(monster.emp, monster.animal_handling)}
				disabled={disableInputs}
			/>
			<StatInput
				label="Deceive"
				bind:statValue={monster.deceive}
				statBonus={calcTotalSkillBonus(monster.emp, monster.deceive)}
				disabled={disableInputs}
			/>
			<StatInput
				label="Rapport"
				bind:statValue={monster.rapport}
				statBonus={calcTotalSkillBonus(monster.emp, monster.rapport)}
				disabled={disableInputs}
			/>
			<StatInput
				label="Willpower"
				bind:statValue={monster.willpower}
				statBonus={calcTotalSkillBonus(monster.emp, monster.willpower)}
				disabled={disableInputs}
			/>
			<StatInput
				label="Mysticism"
				bind:statValue={monster.mysticism}
				statBonus={calcTotalSkillBonus(monster.emp, monster.mysticism)}
				disabled={disableInputs}
			/>
		</TableBody>
	</Table>
	<Table striped={true}>
		<TableBody class="divide-y">
			<StatInput
				label="Craft"
				bind:statValue={monster.craft}
				statBonus={calcTotalSkillBonus(monster.int, monster.craft)}
				disabled={disableInputs}
			/>
			<StatInput
				label="Travel"
				bind:statValue={monster.travel}
				statBonus={calcTotalSkillBonus(monster.int, monster.travel)}
				disabled={disableInputs}
			/>
			<StatInput
				label="Reasoning"
				bind:statValue={monster.reasoning}
				statBonus={calcTotalSkillBonus(monster.int, monster.reasoning)}
				disabled={disableInputs}
			/>
			<StatInput
				label="Lore"
				bind:statValue={monster.lore}
				statBonus={calcTotalSkillBonus(monster.int, monster.lore)}
				disabled={disableInputs}
			/>
			<StatInput
				label="Resourcefulness"
				bind:statValue={monster.resourcefulness}
				statBonus={calcTotalSkillBonus(monster.int, monster.resourcefulness)}
				disabled={disableInputs}
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
						removeSpeciality={() => removeSpeciality(specialty)}
						disabled={disableInputs}
					/>
				{/each}
			</TableBody>
		</Table>

		<form class="mt-4" on:submit|preventDefault={addSpecialty}>
			<div class="grid gap-6 mb-6 md:grid-cols-2">
				<Label class="space-y-2">
					<span>New Specialty</span>
					<Input name="name" type="text" bind:value={specialtyName} required />
				</Label>
				<Label class="space-y-2">
					<span>Skill</span>
					<Select
						name="skill"
						items={skillPool().map((e) => ({ name: e.name, value: e.name }))}
						required
						bind:value={specialtySkill}
					/>
				</Label>
			</div>
			<Button type="submit" disabled={disableInputs}>Add</Button>
		</form>
	</div>
	<div>
		<h1 class="text-4xl dark:text-white pb-8">Equipment</h1>

		<Table striped={true}>
			<TableBody class="divide-y">
				{#each monster.equipment as { id, name, roll_bonus, damage_formula, skills, specialties }}
					<WeaponRow {monster} {id} {name} {roll_bonus} {damage_formula} {skills} {specialties} />
				{/each}
			</TableBody>
		</Table>

		<div class="mt-4 themed">
			<SSelect
				class="mt-4"
				id="equipment"
				loadOptions={fetchEquipment}
				bind:value={selectedEquipmentId}
			/>
			<Button class="mt-4" on:click={addEquipment} disabled={disableInputs}>Add</Button>
		</div>
	</div>
</div>

<h1 class="text-4xl dark:text-white pb-8">Spells</h1>
<Table striped={true}>
	<TableBody class="divide-y">
		{#each monster.spells || [] as { id, name }}
			<TableBodyRow>
				<TableBodyCell>{name}</TableBodyCell>
			</TableBodyRow>
		{/each}
	</TableBody>
</Table>
<div class="mt-4 themed">
	<SSelect class="mt-4" id="equipment" loadOptions={fetchSpells} bind:value={selectedSpellId} />
	<Button class="mt-4" on:click={addSpell} disabled={disableInputs}>Add</Button>
</div>

<style>
	.themed {
		--inputColor: black;
		--multiItemBG: black;
		--itemColor: black;
		--itemHoverColor: black;
		color: black !important;
	}
	.listItem {
		color: black;
	}
	.selectedItem {
		color: black !important;
	}
	.selectedContainer {
		color: black;
	}
</style>
