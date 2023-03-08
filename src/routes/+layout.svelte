<script>
	import { DarkMode } from 'flowbite-svelte';
	import '../app.css';

	import logo from '$lib/assets/logo.png';
	import { Navbar, NavBrand, NavHamburger, NavLi, NavUl } from 'flowbite-svelte';
	import {
		Footer,
		FooterBrand,
		FooterCopyright,
		FooterIcon,
		FooterLink,
		FooterLinkGroup
	} from 'flowbite-svelte';

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

<Navbar let:hidden let:toggle>
	<NavBrand href="/">
		<img src={logo} width="96" alt="Mortal Reins" />
	</NavBrand>
	<NavHamburger on:click={toggle} />
	<NavUl {hidden}>
		<NavLi href="/" active={true}>Home</NavLi>
		<NavLi href="/npcs">NPCs</NavLi>
		<NavLi href="/spells">Spells</NavLi>
		<NavLi href="/equipment">Equipment</NavLi>
		<NavLi href="/profile">Profile</NavLi>
		<NavLi
			><DarkMode
				btnClass="text-gray-500 dark:text-gray-400 focus:outline-none focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-700 rounded-lg text-sm p-2.5 pt-0"
				>Toggle DarkMode</DarkMode
			></NavLi
		>
	</NavUl>
</Navbar>

<main>
	<div class="container mx-auto px-4">
		<slot />
	</div>
</main>

<Footer>
	<FooterCopyright
		href="https://www.mythicvisionsgames.com"
		by="Mythic Visions™"
		year={new Date().getFullYear()}
	/>
	<FooterLinkGroup
		ulClass="flex flex-wrap items-center mt-3 text-sm text-gray-500 dark:text-gray-400 sm:mt-0"
	>
		<FooterLink><span class="text-xs">Build: </span></FooterLink>
	</FooterLinkGroup>
</Footer>

<svelte:head>
	<title>Mortal Reins Calculators</title>
	<meta name="description" content="" />
</svelte:head>
