<script>
	import {
		Table,
		TableBody,
		TableBodyRow,
		TableHead,
		TableHeadCell,
		TableBodyCell,
		ButtonGroup,
		Button
	} from 'flowbite-svelte';

	export let data;
	const { user, tableData } = data;
</script>

<div class="flex justify-end">
	<ButtonGroup class="space-x-px my-4">
		<Button href="/spells/new" pill color="purple">New</Button>
	</ButtonGroup>
</div>

<h1 class="text-4xl dark:text-white pb-8">Spells</h1>

<Table striped={true}>
	<TableHead>
		<TableHeadCell>Name</TableHeadCell>
	</TableHead>
	<TableBody class="divide-y">
		{#each tableData as { id, name }}
			<TableBodyRow>
				<TableBodyCell><a href={`/equipment/${id}`}>{name}</a></TableBodyCell>
			</TableBodyRow>
		{/each}
		<TableBodyRow />
	</TableBody>
</Table>
