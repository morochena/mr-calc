<script>
	import { TableBodyCell, TableBodyRow, Range, Input, Table } from 'flowbite-svelte';

	import { XCircle } from 'svelte-heros';

	export let label;
	export let statValue;
	export let statSkill;
	export let statBonus;
	export let removeSpeciality;
	export let disabled;
</script>

<TableBodyRow>
	<TableBodyCell tdClass="px-6 py-2 whitespace-nowrap">{label}</TableBodyCell>
	<TableBodyCell tdClass="px-6 py-2 whitespace-nowrap">{statSkill}</TableBodyCell>
	<TableBodyCell tdClass="px-6 py-2 whitespace-nowrap"
		><Input bind:value={statValue} type="number" class="w-24" {disabled} /></TableBodyCell
	>
	<TableBodyCell tdClass="px-6 py-2 whitespace-nowrap">{statBonus}</TableBodyCell>
	<TableBodyCell tdClass="px-6 py-2 whitespace-nowrap"
		><button on:click={removeSpeciality}><XCircle size="20" /></button></TableBodyCell
	>
</TableBodyRow>
