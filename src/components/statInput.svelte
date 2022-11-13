<script>
	import { TableBodyCell, TableBodyRow, Range, Input } from 'flowbite-svelte';

	export let label;
	export let statValue;
	export let statBonus;
	export let disabled;
</script>

<TableBodyRow>
	<TableBodyCell>{label}</TableBodyCell>
	<TableBodyCell
		><Input bind:value={statValue} type="number" class="w-24" {disabled} /></TableBodyCell
	>
	<TableBodyCell>{statBonus}</TableBodyCell>
</TableBodyRow>
