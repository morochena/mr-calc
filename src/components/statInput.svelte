<script>
	import { TableBodyCell, TableBodyRow, Range, NumberInput } from 'flowbite-svelte';

	export let label;
	export let statValue;
	export let statBonus;
</script>

<TableBodyRow>
	<TableBodyCell>{label}</TableBodyCell>
	<TableBodyCell><NumberInput bind:value={statValue} /></TableBodyCell>
	<TableBodyCell>{statBonus}</TableBodyCell>
</TableBodyRow>
