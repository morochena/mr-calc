<script lang="ts">
	import { goto } from '$app/navigation';
	import { calcLevel } from '$lib/utils/npcs/statCalculations';
	import ColorHash from 'color-hash';
	import {
		Badge,
		Button,
		ButtonGroup,
		TableBody,
		TableBodyCell,
		TableBodyRow,
		TableHead,
		TableHeadCell,
		TableSearch,
		Toggle
	} from 'flowbite-svelte';
	import type { ItemType } from '../../../types/types';

	export let items;
	export let itemType: ItemType;
	export let user;
	let sortKey = 'name';
	let sortDirection = 'asc';
	let ownedOnlyToggle = true;

	const ch = new ColorHash({ lightness: 0.8 });

	const colorHash = (text: string) => {
		return ch.hex(text);
	};

	const gotoItem = (href: string) => {
		goto(href);
	};

	const updateSortKey = (key: string) => {
		if (sortKey == key) {
			sortDirection = sortDirection == 'asc' ? 'desc' : 'asc';
		} else {
			sortKey = key;
			sortDirection = 'asc';
		}
	};

	let searchTerm = '';
	$: ownedItems = ownedOnlyToggle ? items.filter((item) => item.user_id == user.id) : items;
	$: filteredItems = ownedItems.filter(
		(item) =>
			item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
			item.tags?.filter((tag) => tag.toLowerCase().includes(searchTerm.toLowerCase())).length > 0
	);
	$: sortedItems = filteredItems.sort((a, b) => {
		// sortKey can be a nested key, like 'spell_data.domain'
		const aVal = sortKey.split('.').reduce((acc, key) => acc[key], a);
		const bVal = sortKey.split('.').reduce((acc, key) => acc[key], b);
		if (aVal > bVal) {
			return sortDirection == 'asc' ? 1 : -1;
		} else if (aVal < bVal) {
			return sortDirection == 'asc' ? -1 : 1;
		} else {
			return 0;
		}
	});
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
			<TableHeadCell><span on:click={() => updateSortKey('name')}>Name</span></TableHeadCell>
			{#if itemType == 'npcs'}
				<TableHeadCell><span on:click={() => updateSortKey('level')}>~XP</span></TableHeadCell>
			{/if}
			{#if itemType == 'spells'}
				<TableHeadCell><span on:click={() => updateSortKey('domain')}>Domain</span></TableHeadCell>
				<TableHeadCell><span on:click={() => updateSortKey('mode')}>Mode</span></TableHeadCell>
				<TableHeadCell><span on:click={() => updateSortKey('sp')}>SP</span></TableHeadCell>
			{/if}
			{#if itemType == 'equipment'}
				<TableHeadCell><span on:click={() => updateSortKey('type')}>Type</span></TableHeadCell>
				<TableHeadCell><span on:click={() => updateSortKey('skills')}>Skills</span></TableHeadCell>
				<TableBodyCell
					><span on:click={() => updateSortKey('specialties')}>Specialties</span></TableBodyCell
				>
			{/if}
			<TableHeadCell>Tags</TableHeadCell>
			<TableHeadCell><span on:click={() => updateSortKey('owner')}>Owner</span></TableHeadCell>
		</TableHead>
		<TableBody tableBodyClass="divide-y">
			{#each sortedItems as item}
				<TableBodyRow>
					<a href={`/${itemType}/${item.id}`}>
						<TableBodyCell>{item.name}</TableBodyCell>
					</a>
					{#if itemType == 'npcs'}
						<TableBodyCell>{calcLevel(item)}</TableBodyCell>
					{/if}
					{#if itemType == 'spells'}
						<TableBodyCell>{item.domain}</TableBodyCell>
						<TableBodyCell>{item.mode}</TableBodyCell>
						<TableBodyCell>{item.sp}</TableBodyCell>
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
						><Badge
							style="background-color: {colorHash(item.profiles.username)}; color: black;"
							>{item.profiles.username}</Badge
						>
					</TableBodyCell>
				</TableBodyRow>
			{/each}
		</TableBody>
	</TableSearch>
</div>
