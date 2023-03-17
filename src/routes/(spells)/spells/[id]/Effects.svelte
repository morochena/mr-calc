<script lang="ts">
	import {
		Alert,
		Select,
		Button,
		Table,
		TableHead,
		TableHeadCell,
		TableBodyCell,
		TableBody,
		TableBodyRow,
		Textarea
	} from 'flowbite-svelte';
	import { range } from '$lib/utils/range';
	import { availableEffects } from '$lib/utils/data/effects';
	import { XCircle } from 'svelte-heros';

	import { calculateMOEDescription } from '$lib/utils/spells/calculateMOEDescription';
	import type { CombinedModifierOrEffect, Effect, Spell } from '../../../../../types/types';
	import {
		getProcessedEffects,
		getProcessedModifiers,
		getProcessedModifiersAndEffects
	} from '$lib/utils/spells/getModifiersAndEffects';

	export let spell: Spell;
	export let disableInputs: boolean;
	export let addEffect: (effect: Effect) => void;

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

	$: availableEffectOptions = availableEffects
		.filter((effect) => {
			let selectedMOEs = selectedCombinedModifiersOrEffects;

			// if any prereqs aren't met, return false
			if (effect.prerequisite) {
				const hasAllPrerequisites = effect.prerequisite.every((prerequisite) =>
					selectedMOEs.some((moe) => moe.includes(prerequisite))
				);
				if (!hasAllPrerequisites) return false;
			}

			// if any incompatible are set, return false
			if (effect.incompatible) {
				const hasAnyIncompatible = effect.incompatible.some((incompatible) =>
					selectedMOEs.some((moe) => moe.includes(incompatible))
				);
				if (hasAnyIncompatible) return false;
			}

			// if effect domains are not of the spell's domain, return false
			if (effect.domains && !effect.domains.includes(spell.domain)) {
				return false;
			}

			// if effect already is set, return false
			if (selectedMOEs.includes(effect.name)) {
				return false;
			}

			return true;
		})
		.map((effect) => ({
			name: effect.name,
			value: effect
		}));

	let selectedEffect: Effect | null = null;

	const tryAddEffect = () => {
		if (!selectedEffect) return;
		addEffect(selectedEffect);
		selectedEffect = null;
	};
</script>

<div class="bg-white dark:bg-gray-800 shadow-md rounded-md p-4 md:p-6 mb-6">
	<h2 class="text-xl mt-8 dark:text-white">Effects</h2>
	<Select items={availableEffectOptions} disabled={disableInputs} bind:value={selectedEffect} />
	{#if selectedEffect?.description}
		<Alert class="mt-2"><span>{selectedEffect.description}</span></Alert>
	{/if}
	<Button on:click={tryAddEffect} class="mt-2" disabled={disableInputs || !selectedEffect}
		>Add Effect</Button
	>
</div>
