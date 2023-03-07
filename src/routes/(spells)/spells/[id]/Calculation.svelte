<script lang="ts">
	import FillInBlanks from '$lib/components/FillInBlanks.svelte';
	import { calculateMOECostText } from '$lib/utils/spells/calculateMOECostText';
	import { calculateMOEDescription } from '$lib/utils/spells/calculateMOEDescription';
	import { calculateSpellCost } from '$lib/utils/spells/calculateSpellCost';
	import { calculateSpellDescription } from '$lib/utils/spells/calculateSpellDescription';
	import { calculateTotalSP } from '$lib/utils/spells/calculateSpellSP';
	import {
		processDomainEffects,
		processDomainModifiers
	} from '$lib/utils/spells/moreSpellCalculations';
	import {
		Table,
		TableBody,
		TableBodyCell,
		TableBodyRow,
		TableHead,
		TableHeadCell
	} from 'flowbite-svelte';
	import type { Spell } from '../../../../../types/types';

	export let spell: Spell;
	export let disableInputs: boolean;
</script>

<h2 class="text-xl mt-8">Summary</h2>

<div class="mt-2 dark:bg-gray-700 rounded-lg py-5 px-6 mb-4 text-sm dark:text-white mb-3">
	<div>
		<p><strong>Name:</strong> {spell.name}</p>
		<p><strong>Description:</strong> {spell.spell_data.description}</p>
		<p><strong>Domain:</strong> {spell.spell_data.domain}</p>
		<p><strong>Mode:</strong> {spell.spell_data.mode}</p>
		<p><strong>Spell Difficulty: {calculateTotalSP(spell).cost}</strong></p>
		<p><strong>Mental Cost:</strong> {calculateSpellCost(spell)}</p>
	</div>
	<hr class="my-3" />
	<div>
		<p>
			{calculateSpellDescription(spell)}
		</p>
	</div>
</div>

<Table class="mt-2">
	<TableHead>
		<TableHeadCell>Name</TableHeadCell>
		<TableHeadCell>SP</TableHeadCell>
		<TableHeadCell>Tier</TableHeadCell>
		<TableHeadCell>Notes</TableHeadCell>
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
				<TableBodyCell>{modifier.tier || 1}</TableBodyCell>
				<TableBodyCell>{modifier.notes}</TableBodyCell>
				<TableBodyCell>{calculateMOEDescription(spell, modifier)}</TableBodyCell>
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
				<TableBodyCell>{effect.notes}</TableBodyCell>
				<TableBodyCell
					><FillInBlanks
						baseText={calculateMOEDescription(spell, effect)}
						bind:replacementValue={effect.meta}
					/></TableBodyCell
				>
			</TableBodyRow>
		{/each}
		<TableBodyRow>
			<TableBodyCell>Total</TableBodyCell>
			<TableBodyCell
				>{calculateTotalSP(spell).adds} x {calculateTotalSP(spell).mults.toFixed(2)} =
				<strong>{calculateTotalSP(spell).cost}</strong></TableBodyCell
			>
			<TableBodyCell />
			<TableBodyCell />
			<TableBodyCell />
		</TableBodyRow>
	</TableBody>
</Table>
