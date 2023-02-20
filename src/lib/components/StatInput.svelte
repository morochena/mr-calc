<script lang="ts">
	import { TableBodyCell, TableBodyRow, Range, Input } from 'flowbite-svelte';

	export let label: string;
	export let statValue: string | number;
	export let statBonus: string | number;
	export let disabled: boolean;
	export let bold = false;

	const tdClass = 'px-6 py-2 whitespace-nowrap';
	const tdLabelClass = bold
		? 'px-6 py-2 whitespace-nowrap font-bold text-lg'
		: 'px-6 py-2 whitespace-nowrap';
</script>

<TableBodyRow>
	<TableBodyCell tdClass={tdLabelClass}>{label}</TableBodyCell>
	<TableBodyCell {tdClass}
		><Input
			size={bold ? 'lg' : 'sm'}
			bind:value={statValue}
			type="number"
			defaultClass="block disabled:cursor-not-allowed disabled:opacity-50 w-20"
			{disabled}
		/></TableBodyCell
	>
	<TableBodyCell tdClass={tdLabelClass}>{statBonus}</TableBodyCell>
</TableBodyRow>
