<script lang="ts">
	import { page } from '$app/stores';
	import { supabaseClient } from '$lib/db';
	import { Button } from 'flowbite-svelte';
	import Auth from '$lib/components/Auth.svelte';

	const signOut = async () => {
		await supabaseClient.auth.signOut();
	};
</script>

<div class="p-16 pt-24 dark:text-white">
	<h1 class="text-3xl dark:text-white pb-8">Welcome to Mortal Reins Calculators</h1>

	<div class="row flex">
		{#if !$page.data.session}
			<Auth />
		{:else}
			<div>
				<h1>You are logged in as: {$page.data.session.user.email}</h1>

				<Button on:click={signOut} class="mt-4" color="red">Logout</Button>
			</div>
		{/if}
	</div>
</div>
