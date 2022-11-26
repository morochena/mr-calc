<script>
	import {
		Table,
		TableHead,
		TableHeadCell,
		TableBody,
		TableBodyRow,
		TableBodyCell
	} from 'flowbite-svelte';
	import { calcMentalCost, calcSPCost } from '$lib/utils/spells/calculateSpellDescription';
	import { calculateMOECostText } from '$lib/utils/spells/calculateMOECostText';
	import {
		processDomainEffects,
		processDomainModifiers
	} from '$lib/utils/spells/moreSpellCalculations';
	import { calculateMOEDescription } from '$lib/utils/spells/calculateMOEDescription';

	export let spell;
	export let disableInputs;
</script>

<h2 class="text-xl mt-8">Summary</h2>

<div class="mt-2 dark:bg-gray-700 rounded-lg py-5 px-6 mb-4 text-sm dark:text-white mb-3">
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
	<TableBody>
		{#each processDomainModifiers(spell) as modifier}
			<TableBodyRow>
				<TableBodyCell>
					{#if !modifier.prerequisite || modifier.prerequisite.length <= 0}
						•
					{/if}{modifier.name}
				</TableBodyCell>
				<TableBodyCell>{calculateMOECostText(modifier)}</TableBodyCell>
				<TableBodyCell>{modifier.tier}</TableBodyCell>
				<TableBodyCell>{calculateMOEDescription(spell, modifier)}</TableBodyCell>
				<TableBodyCell>{modifier.notes}</TableBodyCell>
			</TableBodyRow>
		{/each}
		{#each processDomainEffects(spell) as effect}
			<TableBodyRow>
				<TableBodyCell>
					{#if !effect.prerequisite || effect.prerequisite.length <= 0}
						•
					{/if}{effect.name}
				</TableBodyCell>
				<TableBodyCell>{calculateMOECostText(effect)}</TableBodyCell>
				<TableBodyCell>{effect.tier}</TableBodyCell>
				<TableBodyCell>{calculateMOEDescription(spell, effect)}</TableBodyCell>
				<TableBodyCell>{effect.notes}</TableBodyCell>
			</TableBodyRow>
		{/each}
		<TableBodyRow>
			<TableBodyCell>Total</TableBodyCell>
			<TableBodyCell>10</TableBodyCell>
			<TableBodyCell />
			<TableBodyCell />
			<TableBodyCell />
		</TableBodyRow>
	</TableBody>
</Table>
