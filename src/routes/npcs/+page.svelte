<script>
	import {
		TableBody,
		TableBodyCell,
		TableBodyRow,
		TableHead,
		TableHeadCell,
		TableSearch,
		Badge,
		Button,
		ButtonGroup
	} from 'flowbite-svelte';

	import { calcLevel } from '../../utils/calculations';

	export let data;
	let { npcs } = data;
	let searchTerm = '';
	$: filteredNPCS = npcs.filter(
		(item) =>
			item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
			item.tags?.filter((tag) => tag.toLowerCase().includes(searchTerm.toLowerCase())).length > 0
	);
</script>

<div class="flex justify-end">
	<ButtonGroup class="space-x-px my-4">
		<Button href="/npcs/new" pill color="purple">New</Button>
	</ButtonGroup>
</div>

<TableSearch bind:inputValue={searchTerm} striped={true}>
	<TableHead>
		<TableHeadCell>Name</TableHeadCell>
		<TableHeadCell>XP</TableHeadCell>
		<TableHeadCell>Tags</TableHeadCell>
	</TableHead>
	<TableBody class="divide-y">
		{#each filteredNPCS as npc}
			<TableBodyRow>
				<TableBodyCell><a href={`/npcs/${npc.id}`}>{npc.name}</a></TableBodyCell>
				<TableBodyCell>{calcLevel(npc)}</TableBodyCell>
				<TableBodyCell
					>{#each npc.tags || [] as tag}<Badge class="mx-1">{tag}</Badge>{/each}</TableBodyCell
				>
			</TableBodyRow>
		{/each}
		<TableBodyRow />
	</TableBody>
</TableSearch>
