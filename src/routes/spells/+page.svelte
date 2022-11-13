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
		<TableHeadCell>SP</TableHeadCell>
		<TableHeadCell>Domain</TableHeadCell>
		<TableBodyCell>Tags</TableBodyCell>
	</TableHead>
	<TableBody class="divide-y">
		{#each tableData as { id, name, spell_data: { domain, description } }}
			<TableBodyRow>
				<TableBodyCell><a href={`/spells/${id}`}>{name}</a></TableBodyCell>
				<TableBodyCell>10</TableBodyCell>
				<TableBodyCell>{domain}</TableBodyCell>
				<TableBodyCell />
			</TableBodyRow>
		{/each}
		<TableBodyRow />
	</TableBody>
</Table>
