<script>
	import {
		Alert,
		Select,
		Button,
		Table,
		TableHead,
		TableHeadCell,
		TableBody,
		Textarea
	} from 'flowbite-svelte';
	import { availableModifiers } from '../../../utils/data/modifiers';

	const availableModifierOptions = availableModifiers.map((modifier) => ({
		name: modifier.name,
		value: modifier
	}));

	export let spell;
	export let disableInputs;

	let selectedModifier = null;
</script>

<h2 class="text-xl mt-4">Modifiers</h2>
<Select items={availableModifierOptions} disabled={disableInputs} bind:value={selectedModifier} />
{#if selectedModifier?.description}
	<Alert class="mt-2"><span>{selectedModifier.description}</span></Alert>
{/if}
<Button class="mt-2" disabled={disableInputs || !selectedModifier}>Add Modifier</Button>

<Table class="mt-2">
	<TableHead>
		<TableHeadCell>Name</TableHeadCell>
		<TableHeadCell>Tier</TableHeadCell>
		<TableHeadCell>Notes</TableHeadCell>
		<TableHeadCell>Description</TableHeadCell>
	</TableHead>
	<TableBody>
		{#each spell.spell_data.modifiers as modifier}
			<tr>
				<td>{modifier.name}</td>
				<td>{modifier.tier}</td>
				<Textarea rows="2" bind:value={modifier.notes} />
				<td>{modifier.description}</td>
			</tr>
		{/each}
	</TableBody>
</Table>
