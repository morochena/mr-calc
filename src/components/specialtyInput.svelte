<script>
	import { TableBodyCell, TableBodyRow, Range, Input, Table } from 'flowbite-svelte';

	import { XCircle } from 'svelte-heros';

	export let label;
	export let statValue;
	export let statSkill;
	export let statBonus;
</script>

<TableBodyRow>
	<TableBodyCell>{label}</TableBodyCell>
	<TableBodyCell>{statSkill}</TableBodyCell>
	<TableBodyCell><Input bind:value={statValue} type="number" class="w-24" /></TableBodyCell>
	<TableBodyCell>{statBonus}</TableBodyCell>
	<TableBodyCell><button><XCircle size="20" /></button></TableBodyCell>
</TableBodyRow>
