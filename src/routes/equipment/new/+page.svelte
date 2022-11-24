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
	import skillPool from '$lib/utils/data/skills';

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
	<form class="mt-4" method="POST">
		<div class="grid gap-6 mb-6 md:grid-cols-2 mt-4">
			<Label class="space-y-2">
				<span>Name</span>
				<Input name="name" type="text" required />
			</Label>
			<input type="hidden" name="type" bind:value={selectedNewEquipmentType} />
			<Label class="space-y-2">
				<span>Roll Bonus</span>
				<Input name="roll_bonus" type="number" required value="0" />
			</Label>
			<Label class="space-y-2">
				<span>Relevant Skills</span>
				<Input name="skills" type="text" />
			</Label>
			<Label class="space-y-2">
				<span>Relevant Specialties</span>
				<Input name="specialties" type="text" />
			</Label>
			<Label class="space-y-2">
				<span>Damage Formula</span>
				<Input name="damage_formula" type="text" value="" placeholder="eg. [str] + 3" />
			</Label>
			<Label class="space-y-2">
				<span>Armor Piercing</span>
				<Input name="armor_piercing" type="number" value="0" />
			</Label>
			<Label class="space-y-2">
				<span>Range</span>
				<Input name="range" type="number" value="0" />
			</Label>
			<Label class="space-y-2">
				<span>Structure Points</span>
				<Input name="structure_points" type="number" value="0" />
			</Label>
		</div>
		<Textarea placeholder="Notes / Description" />
		<Button class="mt-4" type="submit">Add</Button>
	</form>
{/if}
