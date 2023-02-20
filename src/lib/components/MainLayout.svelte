<script>
	import {
		Listgroup,
		ListgroupItem,
		Avatar,
		Badge,
		Input,
		Button,
		ButtonGroup,
		Table,
		TableHead,
		TableSearch,
		TableHeadCell,
		TableBody,
		TableBodyCell,
		TableBodyRow
	} from 'flowbite-svelte';
	import { browser } from '$app/environment';
	import { goto } from '$app/navigation';
	import { ArrowLeft } from 'svelte-heros';
	import { Toggle } from 'flowbite-svelte';
	import ColorHash from 'color-hash';
	import { calcLevel } from '$lib/utils/npcs/statCalculations';
	import { calculateTotalSP } from '$lib/utils/spells/calculateSpellSP';

	export let items;
	export let itemType;
	export let user;

	const ch = new ColorHash({ lightness: 0.8 });
	let ownedOnlyToggle = true;

	const colorHash = (text) => {
		return ch.hex(text);
	};

	const gotoItem = (href) => {
		goto(href);
	};

	let searchTerm = '';
	$: ownedItems = ownedOnlyToggle ? items.filter((item) => item.user_id == user.id) : items;
	$: filteredItems = ownedItems.filter(
		(item) =>
			item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
			item.tags?.filter((tag) => tag.toLowerCase().includes(searchTerm.toLowerCase())).length > 0
	);
</script>

<div class="w-full dark:bg-gray-900">
	<div class="flex justify-end">
		<ButtonGroup class="space-x-px my-4">
			<Button on:click={() => gotoItem(`/${itemType}/new`)} color="primary">Create</Button>
		</ButtonGroup>
	</div>

	<div class="my-4">
		<Toggle bind:checked={ownedOnlyToggle}>Owned Only</Toggle>
	</div>

	<TableSearch placeholder={`Search ${itemType}`} hoverable={true} bind:inputValue={searchTerm}>
		<TableHead>
			<TableHeadCell>Name</TableHeadCell>
			{#if itemType == 'npcs'}
				<TableHeadCell>~XP</TableHeadCell>
			{/if}
			{#if itemType == 'spells'}
				<TableHeadCell>Domain</TableHeadCell>
				<TableHeadCell>Mode</TableHeadCell>
				<TableHeadCell>SP</TableHeadCell>
			{/if}
			{#if itemType == 'equipment'}
				<TableHeadCell>Type</TableHeadCell>
				<TableHeadCell>Skills</TableHeadCell>
				<TableBodyCell>Specialties</TableBodyCell>
			{/if}
			<TableHeadCell>Tags</TableHeadCell>
			<TableHeadCell>Owner</TableHeadCell>
		</TableHead>
		<TableBody tableBodyClass="divide-y">
			{#each filteredItems as item}
				<TableBodyRow>
					<a href={`/${itemType}/${item.id}`}>
						<TableBodyCell>{item.name}</TableBodyCell>
					</a>
					{#if itemType == 'npcs'}
						<TableBodyCell>{calcLevel(item)}</TableBodyCell>
					{/if}
					{#if itemType == 'spells'}
						<TableBodyCell>{item.spell_data.domain}</TableBodyCell>
						<TableBodyCell>{item.spell_data.mode}</TableBodyCell>
						<TableBodyCell>{calculateTotalSP(item).cost}</TableBodyCell>
					{/if}
					{#if itemType == 'equipment'}
						<TableBodyCell>{item.type || ''}</TableBodyCell>
						<TableBodyCell>
							{#each item.skills || [] as skill}<Badge class="mx-1">{skill}</Badge>{/each}
						</TableBodyCell>
						<TableBodyCell>
							{#each item.specialties || [] as specialty}<Badge class="mx-1">{specialty}</Badge
								>{/each}
						</TableBodyCell>
					{/if}
					<TableBodyCell>
						{#each item.tags || [] as tag}<Badge class="mx-1">{tag}</Badge>{/each}
					</TableBodyCell>
					<TableBodyCell
						><Badge class="" style="background-color: {colorHash(item.profiles.username)}"
							>{item.profiles.username}</Badge
						>
					</TableBodyCell>
				</TableBodyRow>
			{/each}
		</TableBody>
	</TableSearch>
</div>
