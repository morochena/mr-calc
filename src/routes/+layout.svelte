<script>
	import { DarkMode, Sidebar, SidebarGroup, SidebarItem, SidebarWrapper } from 'flowbite-svelte';
	import '../app.css';

	import { Fire, ShieldCheck, User, UserGroup } from 'svelte-heros';

	import { Nav, Responsive, Side } from 'svelte-sidebar-menu';

	import { quartInOut } from 'svelte/easing';

	// Darkmode component
	let btnClass =
		'text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 focus:outline-none focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-700 rounded-lg text-sm p-2.5 ml-2 z-[100]';

	// Side component
	let siteName = 'Mortal Reins Calculators';

	let siteClass = 'w-1/4 h-12 text-lg pt-3 pl-12';

	let headerClass =
		'bg-white px-10 items-center text-gray-600 border-b-2 p-4 dark:bg-gray-900 dark:text-white';

	let hamburgerClass =
		'hover:text-gray-500 cursor-pointer mr-4 border-none focus:outline-none pt-2 lg:hidden';

	let topDiv = 'w-full md:block md:w-auto absolute top-16 md:top-1 px-8';

	let topMenuDiv = 'container flex flex-wrap justify-end mx-auto pt-0 md:pt-2 hidden';

	let topul =
		'flex flex-col mt-4 md:flex-row md:space-x-8 md:mt-0 md:text-md md:font-medium pt-1 bg-white dark:bg-gray-900 dark:text-white';

	let childLi =
		'block py-2 pr-4 pl-3 text-gray-700 border-b border-gray-100 hover:bg-gray-50 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 text-lg dark:text-white';

	let asideClass =
		'absolute w-60 border-r-2 dark:border-gray-900 shadow-lg z-50 bg-white h-screen overflow-y-scroll dark:bg-gray-800 dark:text-white';

	let spanClass =
		'pl-2 self-center text-lg font-semibold text-gray-900 whitespace-nowrap dark:text-white';

	// Nav component
	let navClass = 'py-8 px-4 text-lg';

	let navDivClass = 'pb-8';

	let transitionParams = {
		duration: 200,
		delay: 0,
		easing: quartInOut,
		x: -200
	};

	const topMenuList = [];

	import { supabaseClient } from '$lib/db';

	import { invalidate } from '$app/navigation';

	import { onMount } from 'svelte';

	onMount(() => {
		const {
			data: { subscription }
		} = supabaseClient.auth.onAuthStateChange(() => {
			invalidate('supabase:auth');
		});

		return () => {
			subscription.unsubscribe();
		};
	});
</script>

<Responsive />
<Side
	{siteName}
	{siteClass}
	{headerClass}
	{hamburgerClass}
	{topDiv}
	{topMenuDiv}
	{topul}
	{childLi}
	{asideClass}
	{spanClass}
	{transitionParams}
	topMenus={topMenuList}
>
	<Nav {navClass} {navDivClass}>
		<Sidebar>
			<SidebarWrapper divClass="overflow-y-auto py-4 px-3 bg-gray-50 rounded dark:bg-gray-800">
				<SidebarGroup>
					<SidebarItem
						href="/npcs"
						label="NPCs"
						icon={{ name: UserGroup, class: 'text-red-500 mr-2 dark:text-blue-500' }}
					/>
					<SidebarItem
						href="/spells"
						label="Spells"
						icon={{ name: Fire, class: 'text-red-500 mr-2 dark:text-blue-500' }}
					/>
					<SidebarItem
						href="/equipment"
						label="Equipment"
						icon={{ name: ShieldCheck, class: 'text-red-500 mr-2 dark:text-blue-500' }}
					/>
					<SidebarItem
						href="/players"
						label="Player Characters"
						icon={{ name: User, class: 'text-red-500 mr-2 dark:text-blue-500' }}
					/>
					<DarkMode {btnClass}>Toggle DarkMode</DarkMode>
				</SidebarGroup>
			</SidebarWrapper>
		</Sidebar>
	</Nav>
</Side>
<main class="lg:pl-60">
	<slot />
</main>

<svelte:head>
	<title>Mortal Reins Calculators</title>
	<meta name="description" content="" />
</svelte:head>
