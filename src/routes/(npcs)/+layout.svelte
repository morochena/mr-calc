<script>
	import { Listgroup, ListgroupItem, Avatar, Badge, Input, Button } from 'flowbite-svelte';
	import { browser } from '$app/environment';
	import { goto } from '$app/navigation';
	import { page } from '$app/stores';
	import { ArrowLeft } from 'svelte-heros';

	/** @type {import('./$types').PageData} */
	export let data;
	let { npcs } = data;

	let searchTerm = '';
	$: filteredNPCS = npcs.filter(
		(item) =>
			item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
			item.tags?.filter((tag) => tag.toLowerCase().includes(searchTerm.toLowerCase())).length > 0
	);

	const gotoNpc = (href) => {
		sideBarActive = false;
		goto(href);
	};

	// if desktop, do nothing
	// if mobile and index, show sidebar and make full width
	// else hide sidebar, and show back button
	let sideBarActive = false;
	let isMobile = false;
	$: isMobile = browser && window.innerWidth < 768;
</script>

<div class="flex">
	{#if sideBarActive || !isMobile}
		<div class="pt-24 w-full lg:w-96 h-screen overflow-scroll dark:bg-gray-800">
			<h4 class="font-bold dark:text-white m-2">NPCs</h4>
			<Input
				bind:value={searchTerm}
				type="text"
				placeholder="Search"
				defaultClass="block w-full disabled:cursor-not-allowed disabled:opacity-50 rounded-none"
			/>
			<Button
				href="/npcs/new"
				btnClass="text-center font-medium focus:ring-4 inline-flex items-center justify-center px-5 py-2.5 text-sm text-white bg-purple-700 hover:bg-purple-800 focus:ring-purple-300 dark:bg-purple-600 dark:hover:bg-purple-700 dark:focus:ring-purple-900 rounded-lg w-full rounded-none"
				color="purple">New</Button
			>
			<Listgroup active>
				{#each filteredNPCS as npc}
					<ListgroupItem on:click={gotoNpc(`/npcs/${npc.id}`)}>
						<span class="ml-2">{npc.name}</span>
						<div>
							{#each npc.tags || [] as tag}<Badge class="mx-1">{tag}</Badge>{/each}
						</div>
					</ListgroupItem>
				{/each}
			</Listgroup>
		</div>
	{/if}
	{#if !sideBarActive || !isMobile}
		<div class="h-screen overflow-scroll pt-24 px-8">
			{#if isMobile}
				<Button on:click={() => (sideBarActive = !sideBarActive)} color="purple" class="mb-4">
					<ArrowLeft color="white" class="w-6 h-6" />
				</Button>
			{/if}
			<slot />
		</div>
	{/if}
</div>
