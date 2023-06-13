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
	import type { EntityType } from '../../../types/types';
	import MediaQuery from '$lib/components/MediaQuery.svelte';

	export let items;
	export let itemType: EntityType;
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
			(item.name != null && item.name.toLowerCase().includes(searchTerm.toLowerCase())) ||
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

<MediaQuery query="(max-width: 480px)" let:matches>
	{#if matches}
		<div class="w-full dark:bg-gray-900">
			<div class="flex justify-end">
				<ButtonGroup class="space-x-px my-4">
					<Button on:click={() => gotoItem(`/${itemType}/new`)} color="primary">Create</Button>
				</ButtonGroup>
			</div>

			<div class="my-4">
				<Toggle bind:checked={ownedOnlyToggle}>Owned Only</Toggle>
			</div>

			<div class="my-4">
				<input
					bind:value={searchTerm}
					type="text"
					class="w-full px-3 py-2 border border-gray-300 rounded-lg"
					placeholder={`Search ${itemType}`}
				/>
			</div>

			{#each sortedItems as item (item.id)}
				<div class="my-2 rounded-lg shadow-md overflow-hidden">
					<div class="p-4">
						<a
							href={`/${itemType}/${item.id}`}
							class="text-lg font-bold text-primary-600 hover:text-primary-400">{item.name}</a
						>
						<div class="mt-2">
							{#if itemType == 'npcs'}
								<p><strong>~XP:</strong> {calcLevel(item)}</p>
							{/if}
							{#if itemType == 'spells'}
								<p><strong>Domain:</strong> {item.domain}</p>
								<p><strong>Mode:</strong> {item.mode}</p>
								<p><strong>SP:</strong> {item.sp}</p>
							{/if}
							{#if itemType == 'equipment'}
								<p><strong>Type:</strong> {item.type || ''}</p>
								<p>
									<strong>Skills:</strong>
									{#each item.skills || [] as skill}<span
											class="inline-block bg-blue-200 text-primary-800 m-1 p-1 rounded"
											>{skill}</span
										>{/each}
								</p>
								<p>
									<strong>Specialties:</strong>
									{#each item.specialties || [] as specialty}<span
											class="inline-block bg-green-200 text-green-800 m-1 p-1 rounded"
											>{specialty}</span
										>{/each}
								</p>
							{/if}
						</div>
						<div class="mt-2">
							<p>
								<strong>Owner:</strong>
								<span class="inline-block bg-red-200 text-red-800 m-1 p-1 rounded"
									>{item.profiles.username}</span
								>
							</p>
							{#if item.is_public}
								<span class="inline-block bg-yellow-200 text-yellow-800 m-1 p-1 rounded"
									>public</span
								>
							{/if}
							{#each item.tags || [] as tag}<span
									class="inline-block bg-purple-200 text-purple-800 m-1 p-1 rounded">{tag}</span
								>{/each}
						</div>
					</div>
				</div>
			{/each}
		</div>
	{:else}
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
						<TableHeadCell
							><span on:click={() => updateSortKey('domain')}>Domain</span></TableHeadCell
						>
						<TableHeadCell><span on:click={() => updateSortKey('mode')}>Mode</span></TableHeadCell>
						<TableHeadCell><span on:click={() => updateSortKey('sp')}>SP</span></TableHeadCell>
					{/if}
					{#if itemType == 'equipment'}
						<TableHeadCell><span on:click={() => updateSortKey('type')}>Type</span></TableHeadCell>
						<TableHeadCell
							><span on:click={() => updateSortKey('skills')}>Skills</span></TableHeadCell
						>
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
								{#if item.is_public}
									<Badge
										class="mx-1"
										style="background-color: {colorHash('publicz')}; color: black;">public</Badge
									>
								{/if}
								{#each item.tags || [] as tag}<Badge
										class="mx-1"
										style="background-color: {colorHash(tag)}; color: black;">{tag}</Badge
									>{/each}
							</TableBodyCell>
							<TableBodyCell
								><Badge style="background-color: {colorHash(item.profiles.username)}; color: black;"
									>{item.profiles.username}</Badge
								>
							</TableBodyCell>
						</TableBodyRow>
					{/each}
				</TableBody>
			</TableSearch>
		</div>
	{/if}
</MediaQuery>
