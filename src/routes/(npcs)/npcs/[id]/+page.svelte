<script>
	import SpecialtyInput from '$lib/components/SpecialtyInput.svelte';
	import StatInput from '$lib/components/StatInput.svelte';
	import WeaponRow from '$lib/components/WeaponRow.svelte';
	import { supabaseClient } from '$lib/db';
	import { sizes } from '$lib/utils/data/sizes';
	import skillPool from '$lib/utils/data/skills';
	import {
		calcArcana,
		calcBody,
		calcBonusString,
		calcBonusValue,
		calcConsider,
		calcDodge,
		calcLevel,
		calcMind,
		calcMove,
		calcPerception,
		calcRun,
		calcSpecialtyBonus,
		calcStatBonus,
		calcTotalSkillBonus
	} from '$lib/utils/npcs/statCalculations';
	import { copyEntity, deleteEntity, exportEntity, saveEntity } from '$lib/utils/operations';
	import {
		Button,
		ButtonGroup,
		Input,
		Label,
		Select,
		Table,
		TableBody,
		TableBodyCell,
		TableBodyRow,
		Textarea,
		Toggle
	} from 'flowbite-svelte';
	import SSelect from 'svelte-select';
	import 'toastify-js/src/toastify.css';

	import { Tooltip } from 'flowbite-svelte';
	import { calculateTotalSP } from '$lib/utils/spells/SPCalculations';
	import { calculateMentalCost } from '$lib/utils/spells/descriptionFunctions/mentalCostCalculation';
	import { calculateSpellDescription } from '$lib/utils/spells/calculateSpellDescription';

	export let data = {};

	$: ({ monster, disableInputs } = data);

	// Start Spells
	let selectedSpellId = null;

	const addSpell = async () => {
		if (!selectedSpellId) return;

		monster.spell_ids.push(selectedSpellId.value);

		const { data: spell } = await supabaseClient
			.from('spells_v2')
			.select('*')
			.eq('id', selectedSpellId.value)
			.single();

		data.monster = {
			...data.monster,
			spells: [...(data.monster.spells || []), spell]
		};
	};

	const fetchSpells = async (spellFilterText) => {
		const { data: spells, error } = await supabaseClient
			.from('spells_v2')
			.select('id, name')
			.ilike('name', `%${spellFilterText}%`)
			.order('name', { ascending: true })
			.limit(20);

		return spells?.map((e) => ({ value: e.id, label: e.name })) || [];
	};

	// Start Equipment
	let selectedEquipmentId = null;

	const addEquipment = async (monster) => {
		if (!selectedEquipmentId) return;

		data.monster.equipment_ids.push(selectedEquipmentId.value);

		const { data: serverData } = await supabaseClient
			.from('equipment')
			.select('*')
			.eq('id', selectedEquipmentId.value)
			.single();

		data.monster = {
			...data.monster,
			equipment: [...data.monster.equipment, serverData]
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

		data.monster.specialties[specialtyName] = value;
		specialtyName = '';
		specialtySkill = '';
	};
	const removeSpeciality = (specialtyName) => {
		const newSpecialties = { ...data.monster.specialties };
		delete newSpecialties[specialtyName];
		data.monster.specialties = newSpecialties;
	};
	// End Specialties
</script>

<div class="my-4 float-right">
	<Toggle disabled={disableInputs} bind:checked={monster.is_public}>Public</Toggle>
</div>

<ButtonGroup class="space-x-px my-4">
	{#if !disableInputs}
		<Button
			on:click={() => saveEntity('monsters', monster)}
			disabled={disableInputs}
			color="primary">Save</Button
		>
	{/if}
	<Button href={`/npcs/${monster.id}/public`} color="primary">Public View</Button>
	<Button on:click={() => exportEntity('monsters', monster)} color="primary">Export</Button>
	<Button on:click={() => copyEntity('monsters', monster)} color="primary">Make a Copy</Button>
	{#if !disableInputs}
		<Button
			on:click={() => deleteEntity('monsters', monster)}
			disabled={disableInputs}
			color="primary">Delete</Button
		>
	{/if}
</ButtonGroup>

<div class="bg-white dark:bg-gray-800 shadow-md rounded-md p-4 md:p-6 mb-6">
	<h1 class="text-2xl dark:text-white pb-4">General Information</h1>
	<div class="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6 mb-4">
		<div class="grid gap-2">
			<Label class="space-y-1">
				<span>Name</span>
				<Input type="text" size="sm" bind:value={monster.name} disabled={disableInputs} />
			</Label>
			<Label class="space-y-1">
				<span>Tags</span>
				<Input type="text" size="sm" bind:value={monster.tags} disabled={disableInputs} />
			</Label>
		</div>

		<div>
			<Label class="space-y-1">
				<span>Size</span>
				<Select items={sizes} bind:value={monster.size} disabled={disableInputs} />
			</Label>
		</div>

		<div class="border border-gray-300 dark:border-gray-600 rounded-md p-2">
			<table class="w-full">
				<tr>
					<td class="dark:text-white">Body</td>
					<td class="dark:text-white text-right">{calcBody(monster)}</td>
				</tr>
				<tr>
					<td class="dark:text-white">Mind</td>
					<td class="dark:text-white text-right">{calcMind(monster)}</td>
				</tr>
				<tr>
					<td class="dark:text-white">Arcana</td>
					<td class="dark:text-white text-right">{calcArcana(monster)}</td>
				</tr>
				<tr>
					<td class="dark:text-white">Dodge</td>
					<td class="dark:text-white text-right">{calcDodge(monster)}</td>
				</tr>
				<tr>
					<td class="dark:text-white">Consider</td>
					<td class="dark:text-white text-right">{calcConsider(monster)}</td>
				</tr>
				<tr>
					<td class="dark:text-white">Perception</td>
					<td class="dark:text-white text-right">{calcPerception(monster)}</td>
				</tr>
				<tr>
					<td class="dark:text-white">Move</td>
					<td class="dark:text-white text-right">{calcMove(monster)}</td>
				</tr>
				<tr>
					<td class="dark:text-white">Run</td>
					<td class="dark:text-white text-right">{calcRun(monster)}</td>
				</tr>
				<tr>
					<td class="dark:text-white">~XP</td>
					<td class="dark:text-white text-right">{calcLevel(monster)}</td>
				</tr>
			</table>
		</div>
	</div>

	<div class="mt-2">
		<Label for="description" class="mb-1">Description</Label>
		<Textarea
			id="description"
			placeholder=""
			rows="5"
			name="description"
			bind:value={monster.description}
			disabled={disableInputs}
			size="sm"
			class="w-full resize-none"
		/>
	</div>
</div>

<h1 class="text-4xl dark:text-white pb-8">Skills</h1>
<div class="grid gap-6 mb-6 sm:grid-cols-2 md:grid-cols-2">
	<Table striped={true}>
		<TableBody tableBodyClass="divide-y">
			<StatInput
				label="Strength"
				bind:statValue={monster.str}
				statBonus={calcBonusString(monster, 'str')}
				disabled={disableInputs}
				bold={true}
			/>
			<StatInput
				label="Smash"
				bind:statValue={monster.smash}
				statBonus={calcBonusString(monster, 'str', 'smash')}
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
		<TableBody tableBodyClass="divide-y">
			<StatInput
				label="Dexterity"
				bind:statValue={monster.dex}
				statBonus={calcStatBonus(monster.dex)}
				disabled={disableInputs}
				bold={true}
			/>
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
		<TableBody tableBodyClass="divide-y">
			<StatInput
				label="Empathy"
				bind:statValue={monster.emp}
				statBonus={calcStatBonus(monster.emp)}
				disabled={disableInputs}
				bold={true}
			/>
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
		<TableBody tableBodyClass="divide-y">
			<StatInput
				label="Intelligence"
				bind:statValue={monster.int}
				statBonus={calcStatBonus(monster.int)}
				disabled={disableInputs}
				bold={true}
			/>
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
			<Button type="submit" disabled={disableInputs} color="primary">Add</Button>
		</form>
	</div>
	<div>
		<h1 class="text-4xl dark:text-white pb-8">Equipment</h1>

		<Table striped={true}>
			<TableBody tableBodyClass="divide-y">
				{#each monster.equipment as { id, name, roll_bonus, damage_formula, skills, specialties }}
					<WeaponRow {monster} {id} {name} {roll_bonus} {damage_formula} {skills} {specialties} />
				{/each}
			</TableBody>
		</Table>

		<div class="mt-4">
			<Label class="pt-2"
				>Add equipment
				<SSelect
					class="mt-4"
					id="equipment"
					loadOptions={fetchEquipment}
					bind:value={selectedEquipmentId}
					placeholder="Search equipment"
				/>
			</Label>
			<Button class="mt-4" on:click={() => addEquipment()} disabled={disableInputs} color="primary"
				>Add</Button
			>
		</div>
	</div>
</div>

<h1 class="text-4xl dark:text-white pb-8">Spells</h1>
{#each monster.spells || [] as spell}
	<div class="mt-2 bg-gray-100 rounded-lg py-5 px-6 mb-4 text-sm dark:text-white mb-3">
		<div>
			<p><strong>Name:</strong> {spell.name}</p>
			<p><strong>Description:</strong> {spell.description || ''}</p>
			<p><strong>Domain:</strong> {spell.domain}</p>
			<p><strong>Mode:</strong> {spell.mode}</p>
			<p><strong>Spell Difficulty: {calculateTotalSP(spell).cost}</strong></p>
			<p><strong>Mental Cost:</strong> {calculateMentalCost(spell)}</p>
		</div>
		<hr class="my-3" />
		<div>
			<p>
				{calculateSpellDescription(spell)}
			</p>
		</div>
	</div>
{/each}
<div class="mt-4">
	<Label
		>Add Spells
		<SSelect
			class="mt-4"
			id="spells"
			loadOptions={fetchSpells}
			bind:value={selectedSpellId}
			placeholder="Search spells"
		/>
	</Label>
	<Button class="mt-4" color="primary" on:click={addSpell} disabled={disableInputs}>Add</Button>
</div>

<style>
	.section-title {
		text-align: center;
	}
</style>
