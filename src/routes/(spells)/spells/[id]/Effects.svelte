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
	import type { Effect, Spell } from '../../../../../types/fromSupabase';

	export let spell: Spell;
	export let disableInputs: boolean;
	export let addEffect: (effect: Effect) => void;
	export let removeEffect: (effect: Effect) => void;

	let availableEffectOptions = availableEffects.map((effect) => ({
		name: effect.name,
		value: effect
	}));

	let selectedEffect: Effect | null = null;

	const tryAddEffect = () => {
		if (!selectedEffect) return;
		addEffect(selectedEffect);
		selectedEffect = null;
	};

	const tryRemoveEffect = (effect: Effect) => {
		if (disableInputs) return;
		removeEffect(effect);
	};
</script>

<h2 class="text-xl mt-8">Effects</h2>
<Select items={availableEffectOptions} disabled={disableInputs} bind:value={selectedEffect} />
{#if selectedEffect?.description}
	<Alert class="mt-2"><span>{selectedEffect.description}</span></Alert>
{/if}
<Button on:click={tryAddEffect} class="mt-2" disabled={disableInputs || !selectedEffect}
	>Add Effect</Button
>

<Table class="mt-2">
	<TableHead>
		<TableHeadCell>Name</TableHeadCell>
		<TableHeadCell>Tier</TableHeadCell>
		<TableHeadCell>Notes</TableHeadCell>
		<TableHeadCell>Description</TableHeadCell>
	</TableHead>
	<TableBody>
		{#each spell.spell_data.effects as effect}
			<TableBodyRow>
				<TableBodyCell>{effect.name}</TableBodyCell>
				<TableBodyCell>
					{#if effect.hasTiers}
						<Select
							disabled={disableInputs}
							class="w-20"
							items={range(1, effect.maxTier + 1 || 50, 1).map((e) => ({ name: e, value: e }))}
							bind:value={effect.tier}
						/>
					{/if}
				</TableBodyCell>
				<TableBodyCell
					><Textarea
						class="w-64"
						rows="1"
						bind:value={effect.notes}
						disabled={disableInputs}
					/></TableBodyCell
				>
				<TableBodyCell tdClass="px-6 py-4 font-medium flex justify-end"
					><p>{calculateMOEDescription(spell, effect)}</p>
					{#if !disableInputs}
						<button on:click={() => tryRemoveEffect(effect)} class="ml-4"
							><XCircle size="20" /></button
						>
					{/if}
				</TableBodyCell>
			</TableBodyRow>
		{/each}
	</TableBody>
</Table>
