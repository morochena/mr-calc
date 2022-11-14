<script>
	import {
		Alert,
		Select,
		Button,
		Table,
		TableHead,
		TableHeadCell,
		TableBody,
		Textarea,
		TableBodyRow,
		TableBodyCell
	} from 'flowbite-svelte';
	import { range } from '../../../utils/range';
	import { calculateDescription } from '../../../utils/calculateSpellDescription';
	import { availableModifiers } from '../../../utils/data/modifiers';
	import { XCircle } from 'svelte-heros';

	export let spell;
	export let disableInputs;

	const availableModifierOptions = availableModifiers.map((modifier) => ({
		name: modifier.name,
		value: modifier
	}));

	let selectedModifier = null;
	const addModifier = () => {
		if (selectedModifier) {
			spell = {
				...spell,
				spell_data: {
					...spell.spell_data,
					modifiers: [...spell.spell_data.modifiers, selectedModifier]
				}
			};
			selectedModifier = null;
		}
	};
	const removeModifier = (modifier) => {
		spell = {
			...spell,
			spell_data: {
				...spell.spell_data,
				modifiers: spell.spell_data.modifiers.filter((m) => m !== modifier)
			}
		};
	};
</script>

<h2 class="text-xl mt-8">Modifiers</h2>
<Select items={availableModifierOptions} disabled={disableInputs} bind:value={selectedModifier} />
{#if selectedModifier?.description}
	<Alert class="mt-2"><span>{selectedModifier.description}</span></Alert>
{/if}
<Button on:click={addModifier} class="mt-2" disabled={disableInputs || !selectedModifier}
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
					><p>{calculateDescription(spell, modifier)}</p>
					<button on:click={() => removeModifier(modifier)} class="ml-4"
						><XCircle size="20" /></button
					>
				</TableBodyCell>
			</TableBodyRow>
		{/each}
	</TableBody>
</Table>
