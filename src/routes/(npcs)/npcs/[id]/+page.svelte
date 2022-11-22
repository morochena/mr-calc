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
	import 'toastify-js/src/toastify.css';
	import StatInput from '../../../../components/statInput.svelte';
	import SpecialtyInput from '../../../../components/specialtyInput.svelte';
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
	} from '../../../../utils/calculations';
	import skillPool from '../../../../utils/data/skills';
	import { sizes } from '../../../../utils/data/sizes';
	import { copyEntity, deleteEntity, exportEntity, saveEntity } from '../../../../utils/operations';

	export let data;

	let monster = data.monster;
	let disableInputs = data.disableInputs;

	// Start Spells
	let selectedSpellId = null;

	const addSpell = async () => {
		if (!selectedSpellId) return;

		data.monster.spell_ids.push(selectedSpellId.value);

		const { data: spell } = await supabaseClient
			.from('spells')
			.select('name')
			.eq('id', selectedSpellId.value)
			.single();

		monster = {
			...data.monster,
			spells: [...(data.monster.spells || []), spell]
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

		data.monster.equipment_ids.push(selectedEquipmentId.value);

		const { data } = await supabaseClient
			.from('equipment')
			.select('*')
			.eq('id', selectedEquipmentId.value)
			.single();

		data.monster = {
			...data.monster,
			equipment: [...data.monster.equipment, data]
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

<div class="flex justify-end">
	<ButtonGroup class="space-x-px my-4">
		<Button
			on:click={() => saveEntity('monsters', data.monster)}
			disabled={disableInputs}
			color="purple">Save</Button
		>
		<Button href={`/npcs/${monster.id}/public`} color="purple">Public View</Button>
		<Button on:click={() => exportEntity('monsters', data.monster)} color="purple">Export</Button>
		<Button on:click={() => copyEntity('monsters', data.monster)} color="purple">Make a Copy</Button
		>
		<Button
			on:click={() => deleteEntity('monsters', data.monster)}
			disabled={disableInputs}
			color="purple">Delete</Button
		>
	</ButtonGroup>
</div>

<Label class="space-y-2">
	<span>Name</span>
	<Input type="text" size="lg" bind:value={data.monster.name} disabled={disableInputs} />
</Label>

<Label class="space-y-2">
	<span>Tags</span>
	<Input type="text" bind:value={data.monster.tags} disabled={disableInputs} />
</Label>

<Label for="description" class="mb-2">Description</Label>
<Textarea
	id="description"
	placeholder=""
	rows="7"
	name="description"
	bind:value={data.monster.description}
	disabled={disableInputs}
/>

<h1 class="text-4xl dark:text-white pb-8 mt-8">Stats</h1>

<div class="grid gap-6 mb-6 md:grid-cols-2">
	<Table striped={true}>
		<TableBody class="divide-y">
			<StatInput
				label="Strength"
				bind:statValue={data.monster.str}
				statBonus={calcStatBonus(data.monster.str)}
				disabled={disableInputs}
			/>
			<StatInput
				label="Dexterity"
				bind:statValue={data.monster.dex}
				statBonus={calcStatBonus(data.monster.dex)}
				disabled={disableInputs}
			/>
			<StatInput
				label="Empathy"
				bind:statValue={data.monster.emp}
				statBonus={calcStatBonus(data.monster.emp)}
				disabled={disableInputs}
			/>
			<StatInput
				label="Intelligence"
				bind:statValue={data.monster.int}
				statBonus={calcStatBonus(data.monster.int)}
				disabled={disableInputs}
			/>

			<TableBodyRow>
				<TableBodyCell>Size</TableBodyCell>
				<TableBodyCell>
					<Select items={sizes} bind:value={data.monster.size} disabled={disableInputs} />
				</TableBodyCell>
				<TableBodyCell />
			</TableBodyRow>
		</TableBody>
	</Table>

	<Table striped={true}>
		<TableBody class="divide-y">
			<TableBodyRow>
				<TableBodyCell>Body</TableBodyCell>
				<TableBodyCell>{calcBody(data.monster)}</TableBodyCell>
			</TableBodyRow>
			<TableBodyRow>
				<TableBodyCell>Mind</TableBodyCell>
				<TableBodyCell>{calcMind(data.monster)}</TableBodyCell>
			</TableBodyRow>
			<TableBodyRow>
				<TableBodyCell>Dodge</TableBodyCell>
				<TableBodyCell>{calcDodge(data.monster)}</TableBodyCell>
			</TableBodyRow>
			<TableBodyRow>
				<TableBodyCell>Consider</TableBodyCell>
				<TableBodyCell>{calcConsider(data.monster)}</TableBodyCell>
			</TableBodyRow>
			<TableBodyRow>
				<TableBodyCell>Perception</TableBodyCell>
				<TableBodyCell>{calcPerception(data.monster)}</TableBodyCell>
			</TableBodyRow>
			<TableBodyRow>
				<TableBodyCell>Move</TableBodyCell>
				<TableBodyCell>{calcMove(data.monster)}</TableBodyCell>
			</TableBodyRow>
			<TableBodyRow>
				<TableBodyCell>Run</TableBodyCell>
				<TableBodyCell>{calcRun(data.monster)}</TableBodyCell>
			</TableBodyRow>
			<TableBodyRow>
				<TableBodyCell>~XP</TableBodyCell>
				<TableBodyCell>{calcLevel(data.monster)}</TableBodyCell>
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
				bind:statValue={data.monster.smash}
				statBonus={calcTotalSkillBonus(data.monster.str, data.monster.smash)}
				disabled={disableInputs}
			/>
			<StatInput
				label="Launch"
				bind:statValue={data.monster.launch}
				statBonus={calcTotalSkillBonus(data.monster.str, data.monster.launch)}
				disabled={disableInputs}
			/>
			<StatInput
				label="Athletics"
				bind:statValue={data.monster.athletics}
				statBonus={calcTotalSkillBonus(data.monster.str, data.monster.athletics)}
				disabled={disableInputs}
			/>
			<StatInput
				label="Physique"
				bind:statValue={data.monster.physique}
				statBonus={calcTotalSkillBonus(data.monster.str, data.monster.physique)}
				disabled={disableInputs}
			/>
			<StatInput
				label="Provoke"
				bind:statValue={data.monster.provoke}
				statBonus={calcTotalSkillBonus(data.monster.str, data.monster.provoke)}
				disabled={disableInputs}
			/>
		</TableBody>
	</Table>
	<Table striped={true}>
		<TableBody class="divide-y">
			<StatInput
				label="Accuracy"
				bind:statValue={data.monster.accuracy}
				statBonus={calcTotalSkillBonus(data.monster.dex, data.monster.accuracy)}
				disabled={disableInputs}
			/>
			<StatInput
				label="Mobility"
				bind:statValue={data.monster.mobility}
				statBonus={calcTotalSkillBonus(data.monster.dex, data.monster.mobility)}
				disabled={disableInputs}
			/>
			<StatInput
				label="Thievery"
				bind:statValue={data.monster.thievery}
				statBonus={calcTotalSkillBonus(data.monster.dex, data.monster.thievery)}
				disabled={disableInputs}
			/>
			<StatInput
				label="Notice"
				bind:statValue={data.monster.notice}
				statBonus={calcTotalSkillBonus(data.monster.dex, data.monster.notice)}
				disabled={disableInputs}
			/>
			<StatInput
				label="Stealth"
				bind:statValue={data.monster.stealth}
				statBonus={calcTotalSkillBonus(data.monster.dex, data.monster.stealth)}
				disabled={disableInputs}
			/>
		</TableBody>
	</Table>
	<Table striped={true}>
		<TableBody class="divide-y">
			<StatInput
				label="Animal Handling"
				bind:statValue={data.monster.animal_handling}
				statBonus={calcTotalSkillBonus(data.monster.emp, data.monster.animal_handling)}
				disabled={disableInputs}
			/>
			<StatInput
				label="Deceive"
				bind:statValue={data.monster.deceive}
				statBonus={calcTotalSkillBonus(data.monster.emp, data.monster.deceive)}
				disabled={disableInputs}
			/>
			<StatInput
				label="Rapport"
				bind:statValue={data.monster.rapport}
				statBonus={calcTotalSkillBonus(data.monster.emp, data.monster.rapport)}
				disabled={disableInputs}
			/>
			<StatInput
				label="Willpower"
				bind:statValue={data.monster.willpower}
				statBonus={calcTotalSkillBonus(data.monster.emp, data.monster.willpower)}
				disabled={disableInputs}
			/>
			<StatInput
				label="Mysticism"
				bind:statValue={data.monster.mysticism}
				statBonus={calcTotalSkillBonus(data.monster.emp, data.monster.mysticism)}
				disabled={disableInputs}
			/>
		</TableBody>
	</Table>
	<Table striped={true}>
		<TableBody class="divide-y">
			<StatInput
				label="Craft"
				bind:statValue={data.monster.craft}
				statBonus={calcTotalSkillBonus(data.monster.int, data.monster.craft)}
				disabled={disableInputs}
			/>
			<StatInput
				label="Travel"
				bind:statValue={data.monster.travel}
				statBonus={calcTotalSkillBonus(data.monster.int, data.monster.travel)}
				disabled={disableInputs}
			/>
			<StatInput
				label="Reasoning"
				bind:statValue={data.monster.reasoning}
				statBonus={calcTotalSkillBonus(data.monster.int, data.monster.reasoning)}
				disabled={disableInputs}
			/>
			<StatInput
				label="Lore"
				bind:statValue={data.monster.lore}
				statBonus={calcTotalSkillBonus(data.monster.int, data.monster.lore)}
				disabled={disableInputs}
			/>
			<StatInput
				label="Resourcefulness"
				bind:statValue={data.monster.resourcefulness}
				statBonus={calcTotalSkillBonus(data.monster.int, data.monster.resourcefulness)}
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
				{#each Object.keys(data.monster.specialties || {}) as specialty}
					<SpecialtyInput
						label={specialty}
						statSkill={data.monster.specialties[specialty].skill}
						bind:statValue={data.monster.specialties[specialty].value}
						statBonus={calcSpecialtyBonus(monster, data.monster.specialties[specialty])}
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
				{#each data.monster.equipment as { id, name, roll_bonus, damage_formula, skills, specialties }}
					<WeaponRow {monster} {id} {name} {roll_bonus} {damage_formula} {skills} {specialties} />
				{/each}
			</TableBody>
		</Table>

		<div class="mt-4 themed">
			<Label class="pt-2 themed"
				>Add equipment
				<SSelect
					class="mt-4 themed"
					id="equipment"
					loadOptions={fetchEquipment}
					bind:value={selectedEquipmentId}
				/>
			</Label>
			<Button class="mt-4" on:click={addEquipment} disabled={disableInputs}>Add</Button>
		</div>
	</div>
</div>

<h1 class="text-4xl dark:text-white pb-8">Spells</h1>
<Table striped={true}>
	<TableBody class="divide-y">
		{#each data.monster.spells || [] as { id, name }}
			<TableBodyRow>
				<TableBodyCell>{name}</TableBodyCell>
			</TableBodyRow>
		{/each}
	</TableBody>
</Table>
<div class="mt-4 themed">
	<Label
		>Add Spells
		<SSelect class="mt-4" id="equipment" loadOptions={fetchSpells} bind:value={selectedSpellId} />
	</Label>
	<Button class="mt-4" on:click={addSpell} disabled={disableInputs}>Add</Button>
</div>

<style>
	.themed {
		--background: rgb(55, 65, 81);
		--border: rgb(75, 85, 99);
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
	.selectContainer input {
		color: black;
	}
</style>
