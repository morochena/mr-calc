<script>
	import { TableBodyCell, TableBodyRow, Range, Input } from 'flowbite-svelte';

	export let label;
	export let statValue;
	export let statBonus;
	export let disabled;
</script>

<TableBodyRow>
	<TableBodyCell tdClass="px-6 py-2 whitespace-nowrap">{label}</TableBodyCell>
	<TableBodyCell tdClass="px-6 py-2 whitespace-nowrap"
		><Input size="sm" bind:value={statValue} type="number" {disabled} /></TableBodyCell
	>
	<TableBodyCell tdClass="px-6 py-2 whitespace-nowrap">{statBonus}</TableBodyCell>
</TableBodyRow>
