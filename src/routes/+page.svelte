<script lang="ts">
	import { page } from '$app/stores';
	import { supabaseClient } from '$lib/db';
	import { Button } from 'flowbite-svelte';
	import Auth from '$lib/components/Auth.svelte';
	import logo from '$lib/assets/logo.png';

	const signOut = async () => {
		await supabaseClient.auth.signOut();
	};
</script>

<div class="p-16 pt-0 dark:text-white text-center flex items-center flex-col">
	<img src={logo} width="500" alt="Mortal Reins" />

	<div class="row flex">
		{#if !$page.data.session}
			<Auth />
		{:else}
			<div>
				<h1>You are logged in as: {$page.data.session.user.email}</h1>
				<Button on:click={signOut} class="mt-4" color="primary">Logout</Button>
			</div>
		{/if}
	</div>

	<h2 class="text-2xl mt-10">Changelog</h2>
	<pre class="text-left">
		## 2023-02-21
		- layout refactor
		- fix spell calculator bugs
		- added profiles
		- allowed public/private npcs/spells/equipment
	</pre>
</div>
