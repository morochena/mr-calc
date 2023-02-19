<script>
	import { DarkMode } from 'flowbite-svelte';
	import '../app.css';

	import logo from '$lib/assets/logo.png';
	import { Navbar, NavBrand, NavHamburger, NavLi, NavUl } from 'flowbite-svelte';

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
		<span class="self-center whitespace-nowrap text-xl font-semibold dark:text-white">
			MR Calc
		</span>
	</NavBrand>
	<NavHamburger on:click={toggle} />
	<NavUl {hidden}>
		<NavLi href="/" active={true}>Home</NavLi>
		<NavLi href="/npcs">NPCs</NavLi>
		<NavLi href="/spells">Spells</NavLi>
		<NavLi href="/equipment">Equipment</NavLi>
		<NavLi href="/profile">Profile</NavLi>
		<NavLi><DarkMode btnclass="hidden">Toggle DarkMode</DarkMode></NavLi>
	</NavUl>
</Navbar>

<main>
	<slot />
</main>

<svelte:head>
	<title>Mortal Reins Calculators</title>
	<meta name="description" content="" />
</svelte:head>
