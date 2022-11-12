<script>
	import {
		Input,
		Select,
		Label,
		Helper,
		Checkbox,
		Textarea,
		Button,
		Toggle
	} from 'flowbite-svelte';
	import skillPool from '../../utils/data/skills';

	let name = '';

	let equipmentTypes = [
		{ name: 'Armor', value: 'armor' },
		{ name: 'Weapon', value: 'weapon' },
		{ name: 'Shield', value: 'shield' },
		{ name: 'Other', value: 'other' }
	];
	let selectedNewEquipmentType = 'weapon';
</script>

<h1 class="text-4xl dark:text-white pb-8">Generate Equipment</h1>

<Label class="space-y-2">
	<span>Type</span>
	<Select items={equipmentTypes} bind:value={selectedNewEquipmentType} required />
</Label>
{#if selectedNewEquipmentType == 'weapon'}
	<form class="mt-4">
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
				<Input type="text" />
			</Label>
			<Label class="space-y-2">
				<span>Damage Formula</span>
				<Input type="text" value="" placeholder="eg. [str] + 3" />
			</Label>
			<Label class="space-y-2">
				<span>Armor Piercing</span>
				<Input type="number" value="0" />
			</Label>
			<Label class="space-y-2">
				<span>Range</span>
				<Input type="number" value="0" />
			</Label>
			<Label class="space-y-2">
				<span>Structure</span>
				<Input type="number" value="0" />
			</Label>
		</div>
		<Textarea placeholder="Notes / Description" />
		<Button class="mt-4" type="submit">Add</Button>
	</form>
{/if}
