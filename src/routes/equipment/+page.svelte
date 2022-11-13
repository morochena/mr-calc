<script>
	import {
		Table,
		TableBody,
		TableBodyRow,
		TableHead,
		TableHeadCell,
		TableBodyCell,
		ButtonGroup,
		Button
	} from 'flowbite-svelte';

	/** @type {import('./$types').PageData} */
	export let data;
	const { user, tableData } = data;
</script>

<div class="flex justify-end">
	<ButtonGroup class="space-x-px my-4">
		<Button href="/equipment/new" pill color="purple">New</Button>
	</ButtonGroup>
</div>

<h1 class="text-4xl dark:text-white pb-8">Equipment</h1>

<Table striped={true}>
	<TableHead>
		<TableHeadCell>Name</TableHeadCell>
		<TableHeadCell>Type</TableHeadCell>
		<TableHeadCell>Roll Bonus</TableHeadCell>
		<TableHeadCell>Skill</TableHeadCell>
		<TableHeadCell>Specialty</TableHeadCell>
		<TableHeadCell>Damage Formula</TableHeadCell>
		<TableHeadCell>Armor Piercing</TableHeadCell>
		<TableHeadCell>Range</TableHeadCell>
	</TableHead>
	<TableBody class="divide-y">
		{#each tableData as { name, type, roll_bonus, skills, specialties, damage_formula, armor_piercing, range, structure_points }, i}
			<TableBodyRow>
				<TableBodyCell>{name}</TableBodyCell>
				<TableBodyCell>{type}</TableBodyCell>
				<TableBodyCell>{roll_bonus}</TableBodyCell>
				<TableBodyCell>{skills}</TableBodyCell>
				<TableBodyCell>{specialties}</TableBodyCell>
				<TableBodyCell>{damage_formula}</TableBodyCell>
				<TableBodyCell>{armor_piercing}</TableBodyCell>
				<TableBodyCell>{range}</TableBodyCell>
			</TableBodyRow>
		{/each}
		<TableBodyRow />
	</TableBody>
</Table>
