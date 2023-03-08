<script lang="ts">
	import FillInBlanks from '$lib/components/FillInBlanks.svelte';
	import { range } from '$lib/utils/range';
	import { calcSPValueText } from '$lib/utils/spells/SPCalculations';
	import { calculateMOEDescription } from '$lib/utils/spells/calculateMOEDescription';
	import { calculateSpellCost } from '$lib/utils/spells/mentalCostCalculations';
	import { calculateSpellDescription } from '$lib/utils/spells/calculateSpellDescription';
	import { calculateTotalSP } from '$lib/utils/spells/SPCalculations';
	import {
		processDomainEffects,
		processDomainModifiers
	} from '$lib/utils/spells/getCombinedEffects';
	import {
		Select,
		Table,
		TableBody,
		TableBodyCell,
		TableBodyRow,
		TableHead,
		TableHeadCell
	} from 'flowbite-svelte';
	import type { Spell } from '../../../../../types/types';
	import { Fire, Beaker, Sparkles, XMark } from 'svelte-heros';

	export let spell: Spell;
	export let disableInputs: boolean;
	export let removeModifier: (id: number) => void;
	export let removeEffect: (id: number) => void;

	const updateModifierTier = (id: number, value: string) => {
		const updated_modifier = spell.selected_modifiers.find((m) => m.id === id);
		if (!updated_modifier) return;
		updated_modifier.tier = parseInt(value);
		spell = {
			...spell,
			selected_modifiers: spell.selected_modifiers.map((m) => {
				if (m.id === id) return updated_modifier;
				return m;
			})
		};
	};
	const updateEffectTier = (id: number, value: string) => {
		const updated_effect = spell.selected_effects.find((m) => m.id === id);
		if (!updated_effect) return;
		updated_effect.tier = parseInt(value);
		spell = {
			...spell,
			selected_effects: spell.selected_effects.map((m) => {
				if (m.id === id) return updated_effect;
				return m;
			})
		};
	};

	const updateModifierMetaValue = (id: number, meta: string) => {
		const updated_modifier = spell.selected_modifiers.find((m) => m.id === id);
		if (!updated_modifier) return;
		updated_modifier.meta = meta;
		spell = {
			...spell,
			selected_modifiers: spell.selected_modifiers.map((m) => {
				if (m.id === id) return updated_modifier;
				return m;
			})
		};
	};

	const updateEffectMetaValue = (id: number, meta: string) => {
		const updated_effect = spell.selected_effects.find((m) => m.id === id);
		if (!updated_effect) return;
		updated_effect.meta = meta;
		spell = {
			...spell,
			selected_effects: spell.selected_effects.map((m) => {
				if (m.id === id) return updated_effect;
				return m;
			})
		};
	};
</script>

<h2 class="text-xl mt-8 dark:text-white">Summary</h2>

<div class="mt-2 dark:bg-gray-700 rounded-lg py-5 px-6 mb-4 text-sm dark:text-white mb-3">
	<div>
		<p><strong>Name:</strong> {spell.name}</p>
		<p><strong>Description:</strong> {spell.description}</p>
		<p><strong>Domain:</strong> {spell.domain}</p>
		<p><strong>Mode:</strong> {spell.mode}</p>
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

<Table class="mt-2" divClass="relative">
	<TableHead>
		<TableHeadCell>Name</TableHeadCell>
		<TableHeadCell>SP</TableHeadCell>
		<TableHeadCell>Tier</TableHeadCell>
		<TableHeadCell>Notes</TableHeadCell>
		<TableHeadCell>Description</TableHeadCell>
		<TableHeadCell />
	</TableHead>
	<TableBody>
		{#each processDomainModifiers(spell) as modifier}
			<TableBodyRow>
				<TableBodyCell>
					<div class="flex items-center">
						{#if !modifier.prerequisite || modifier.prerequisite.length <= 0}
							<Sparkles size="16" class="mr-2" />
						{/if}{modifier.name}
					</div>
				</TableBodyCell>
				<TableBodyCell>{calcSPValueText(modifier)}</TableBodyCell>
				<TableBodyCell>
					{#if modifier.hasTiers && !modifier.fromDomain}
						<Select
							disabled={disableInputs}
							size="sm"
							items={range(1, modifier.maxTier + 1 || 50, 1).map((e) => ({ name: e, value: e }))}
							on:change={(e) => updateModifierTier(modifier.id, e.target.value)}
							value={modifier.tier}
						/>
					{:else}
						{modifier.tier}
					{/if}
				</TableBodyCell>
				<TableBodyCell>{modifier.notes || ''}</TableBodyCell>
				<TableBodyCell tdClass="px-6 py-4 font-medium ">
					<FillInBlanks
						moeId={modifier.id}
						baseText={calculateMOEDescription(spell, modifier)}
						bind:replacementValue={modifier.meta}
						onChange={updateModifierMetaValue}
						disabled={disableInputs}
					/>
				</TableBodyCell>
				<TableBodyCell>
					{#if !disableInputs}
						<button on:click={() => removeModifier(modifier.id)}>
							<XMark />
						</button>
					{/if}
				</TableBodyCell>
			</TableBodyRow>
		{/each}
		{#each processDomainEffects(spell) as effect}
			<TableBodyRow>
				<TableBodyCell>
					<div class="flex items-center">
						{#if !effect.prerequisite || effect.prerequisite.length <= 0}
							<Fire size="16" class="mr-2" />
						{/if}{effect.name}
					</div>
				</TableBodyCell>
				<TableBodyCell>{calcSPValueText(effect)}</TableBodyCell>
				<TableBodyCell>
					{#if effect.hasTiers && !effect.fromDomain}
						<Select
							disabled={disableInputs}
							size="sm"
							items={range(1, effect.maxTier + 1 || 50, 1).map((e) => ({ name: e, value: e }))}
							on:change={(e) => updateEffectTier(effect.id, e.target.value)}
							value={effect.tier}
						/>
					{:else}
						{effect.tier}
					{/if}
				</TableBodyCell>
				<TableBodyCell>{effect.notes || ''}</TableBodyCell>
				<TableBodyCell tdClass="px-6 py-4 font-medium ">
					<FillInBlanks
						moeId={effect.id}
						baseText={calculateMOEDescription(spell, effect)}
						bind:replacementValue={effect.meta}
						onChange={updateEffectMetaValue}
						disabled={disableInputs}
					/></TableBodyCell
				>

				<TableBodyCell>
					{#if !disableInputs}
						<button on:click={() => removeEffect(effect.id)}>
							<XMark />
						</button>
					{/if}
				</TableBodyCell>
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
			<TableBodyCell />
		</TableBodyRow>
	</TableBody>
</Table>
