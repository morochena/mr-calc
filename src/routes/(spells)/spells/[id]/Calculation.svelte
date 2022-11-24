<script>
	import { Table, TableHead, TableHeadCell, TableBody } from 'flowbite-svelte';
	import { calcMentalCost, calcSPCost } from '$lib/utils/calculateSpellDescription';

	export let spell;
	export let disableInputs;
</script>

<h2 class="text-xl mt-8">Summary</h2>

<div class="mt-2 bg-gray-700 rounded-lg py-5 px-6 mb-4 text-sm text-white mb-3">
	<div>
		<p><strong>Name:</strong> {spell.name}</p>
		<p><strong>Description:</strong> {spell.spell_data.description}</p>
		<p><strong>Domain:</strong> {spell.spell_data.domain}</p>
		<p><strong>Mode:</strong> {spell.spell_data.mode}</p>
		<p><strong>Spell Difficulty: {calcSPCost(spell)}</strong></p>
		<p><strong>Mental Cost:</strong> {calcMentalCost(spell)}</p>
	</div>
</div>

<Table class="mt-2">
	<TableHead>
		<TableHeadCell>Name</TableHeadCell>
		<TableHeadCell>SP</TableHeadCell>
		<TableHeadCell>Tier</TableHeadCell>
		<TableHeadCell>Description</TableHeadCell>
	</TableHead>
	<TableBody />
</Table>
