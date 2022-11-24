<script>
	import { Listgroup, ListgroupItem, Avatar, Badge, Input, Button } from 'flowbite-svelte';
	import { browser } from '$app/environment';
	import { goto } from '$app/navigation';
	import { ArrowLeft } from 'svelte-heros';

	export let items;
	export let itemType;
	export let user;

	const gotoItem = (href) => {
		sideBarActive = false;
		goto(href);
	};

	let searchTerm = '';
	$: filteredItems = items.filter(
		(item) =>
			item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
			item.tags?.filter((tag) => tag.toLowerCase().includes(searchTerm.toLowerCase())).length > 0 ||
			(searchTerm.toLowerCase() == 'owned' && item.user_id == user.id)
	);

	let sideBarActive = true;
	let isMobile = false;
	$: isMobile = browser && window.innerWidth < 768;
</script>

<div class="flex">
	{#if sideBarActive || !isMobile}
		<div class="pt-20 grow-0 shrink-0 w-full lg:w-96 h-screen overflow-y-scroll dark:bg-gray-800">
			<Input
				bind:value={searchTerm}
				type="text"
				placeholder="Search"
				defaultClass="block w-full disabled:cursor-not-allowed disabled:opacity-50 rounded-none"
			/>
			<Button
				href={`/${itemType}/new`}
				btnClass="text-center font-medium focus:ring-4 inline-flex items-center justify-center px-5 py-2.5 text-sm text-white bg-purple-700 hover:bg-purple-800 focus:ring-purple-300 dark:bg-purple-600 dark:hover:bg-purple-700 dark:focus:ring-purple-900 rounded-lg w-full rounded-none"
				color="purple">New</Button
			>
			<Listgroup active>
				{#each filteredItems as item}
					<ListgroupItem on:click={() => gotoItem(`/${itemType}/${item.id}`)}>
						<div class="w-full">
							<div class="flex column justify-between">
								<p class="ml-2">{item.name}</p>
								{#if item.user_id == user.id}
									<Badge color="dark" class="mx-1">owned</Badge>
								{/if}
							</div>
							<div>
								{#each item.tags || [] as tag}<Badge class="mx-1">{tag}</Badge>{/each}
							</div>
						</div>
					</ListgroupItem>
				{/each}
			</Listgroup>
		</div>
	{/if}
	{#if !sideBarActive || !isMobile}
		<div class="flex-full h-screen overflow-y-scroll py-24 px-8 dark:text-white">
			{#if isMobile}
				<Button on:click={() => (sideBarActive = !sideBarActive)} color="purple" class="mb-4">
					<ArrowLeft color="white" class="w-6 h-6" />
				</Button>
			{/if}
			<slot />
		</div>
	{/if}
</div>
