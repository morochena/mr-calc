<script lang="ts">
	import { availableModifiers } from '$lib/utils/data/modifiers';
	import { Alert, Button, Select } from 'flowbite-svelte';

	import { getProcessedModifiersAndEffects } from '$lib/utils/spells/getModifiersAndEffects';
	import { calcSPValueText } from '$lib/utils/spells/SPCalculations';
	import type { Modifier, Spell } from '../../../../../types/types';

	export let spell: Spell;
	export let disableInputs: boolean;
	export let addModifier: (modifier: Modifier) => void;

	let selectedCombinedModifiersOrEffects: string[] = [];

	$: {
		selectedCombinedModifiersOrEffects = getProcessedModifiersAndEffects(spell)
			.filter((m) => !m.fromDomain)
			.map((m) => m.name);

		if (spell.is_alchemy && !selectedCombinedModifiersOrEffects.includes('Alchemy'))
			selectedCombinedModifiersOrEffects.push('Alchemist');
		if (spell.is_runesmith && !selectedCombinedModifiersOrEffects.includes('Runesmith'))
			selectedCombinedModifiersOrEffects.push('Runesmith');
	}

	$: availableModifierOptions = availableModifiers
		.filter((modifier) => {
			let selectedMOEs = selectedCombinedModifiersOrEffects;

			// if any prereqs aren't met, return false
			if (modifier.prerequisite) {
				const hasAllPrerequisites = modifier.prerequisite.every((prerequisite) =>
					selectedMOEs.some((moe) => moe.includes(prerequisite))
				);
				if (!hasAllPrerequisites) return false;
			}

			// if any incompatible are set, return false
			if (modifier.incompatible) {
				const hasAnyIncompatible = modifier.incompatible.some((incompatible) =>
					selectedMOEs.some((moe) => moe.includes(incompatible))
				);
				if (hasAnyIncompatible) return false;
			}

			// if modifier already is set, return false
			if (selectedMOEs.includes(modifier.name)) {
				return false;
			}

			return true;
		})
		.map((modifier) => ({
			name: `${modifier.name}     (${calcSPValueText(spell, {
				...modifier,
				tier: 1,
				domainTier: 0
			})})`,
			value: modifier
		}));

	let selectedModifier: Modifier | null = null;

	const tryAddModifier = () => {
		if (!selectedModifier) return;
		addModifier(selectedModifier);
		selectedModifier = null;
	};
</script>

<div class="bg-white dark:bg-gray-800 shadow-md rounded-md p-4 md:p-6 mb-6">
	<h2 class="text-xl mt-8 dark:text-white">Modifiers</h2>
	<Select items={availableModifierOptions} disabled={disableInputs} bind:value={selectedModifier} />
	{#if selectedModifier?.description}
		<Alert class="mt-2"><span>{selectedModifier.description}</span></Alert>
	{/if}
	<Button on:click={tryAddModifier} class="mt-2" disabled={disableInputs || !selectedModifier}
		>Add Modifier</Button
	>
</div>
