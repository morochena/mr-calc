<script>
	import { availableModifiers } from '$lib/utils/data/modifiers';
	import { range } from '$lib/utils/range';
	import {
		Alert,
		Button,
		Select,
		Table,
		TableBody,
		TableBodyCell,
		TableBodyRow,
		TableHead,
		TableHeadCell,
		Textarea
	} from 'flowbite-svelte';
	import { XCircle } from 'svelte-heros';

	import { calculateMOEDescription } from '$lib/utils/spells/calculateMOEDescription';

	export let spell;
	export let disableInputs;
	export let addModifier;
	export let removeModifier;

	const availableModifierOptions = availableModifiers.map((modifier) => ({
		name: modifier.name,
		value: modifier
	}));

	let selectedModifier = null;
	const tryAddModifier = () => {
		if (!selectedModifier) return;
		addModifier(selectedModifier);
		selectedModifier = null;
	};

	const tryRemoveModifier = (modifier) => {
		if (disableInputs) return;
		removeModifier(modifier);
	};
</script>

<h2 class="text-xl mt-8">Modifiers</h2>
<Select items={availableModifierOptions} disabled={disableInputs} bind:value={selectedModifier} />
{#if selectedModifier?.description}
	<Alert class="mt-2"><span>{selectedModifier.description}</span></Alert>
{/if}
<Button on:click={tryAddModifier} class="mt-2" disabled={disableInputs || !selectedModifier}
	>Add Modifier</Button
>

<Table class="mt-2">
	<TableHead>
		<TableHeadCell>Name</TableHeadCell>
		<TableHeadCell>Tier</TableHeadCell>
		<TableHeadCell>Notes</TableHeadCell>
		<TableHeadCell>Description</TableHeadCell>
	</TableHead>
	<TableBody>
		{#each spell.spell_data.modifiers as modifier}
			<TableBodyRow>
				<TableBodyCell tdClass="px-6 py-4 font-medium">{modifier.name}</TableBodyCell>
				<TableBodyCell>
					{#if modifier.hasTiers}
						<Select
							disabled={disableInputs}
							class="w-20"
							items={range(1, modifier.maxTier + 1 || 50, 1).map((e) => ({ name: e, value: e }))}
							bind:value={modifier.tier}
						/>
					{/if}
				</TableBodyCell>
				<TableBodyCell
					><Textarea
						class="w-64"
						rows="1"
						bind:value={modifier.notes}
						disabled={disableInputs}
					/></TableBodyCell
				>
				<TableBodyCell tdClass="px-6 py-4 font-medium flex justify-end"
					><p>{calculateMOEDescription(spell, modifier)}</p>
					{#if !disableInputs}
						<button on:click={() => tryRemoveModifier(modifier)} class="ml-4"
							><XCircle size="20" /></button
						>
					{/if}
				</TableBodyCell>
			</TableBodyRow>
		{/each}
	</TableBody>
</Table>
