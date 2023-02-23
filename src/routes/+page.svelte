<script lang="ts">
	import { page } from '$app/stores';
	import { supabaseClient } from '$lib/db';
	import { Button, Card } from 'flowbite-svelte';
	import Auth from '$lib/components/Auth.svelte';
	import logo from '$lib/assets/logo.png';

	const signOut = async () => {
		await supabaseClient.auth.signOut();
	};
</script>

<div class="p-16 pt-0 dark:text-white text-center flex items-center flex-col">
	<img src={logo} width="300" alt="Mortal Reins" />

	<div class="row flex">
		{#if !$page.data.session}
			<Auth />
		{:else}
			<div>
				<div class="row flex space-x-2 mb-4">
					<Card href="/spells">
						<h5 class="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
							Spells
						</h5>
						<p class="font-normal text-gray-700 dark:text-gray-400 leading-tight">
							Create custom spells with specific effects and parameters to enhance your game
							experience
						</p>
					</Card>
					<Card href="/npcs">
						<h5 class="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
							NPCs
						</h5>
						<p class="font-normal text-gray-700 dark:text-gray-400 leading-tight">
							Generate combat statistics for your custom monsters and NPCs
						</p>
					</Card>
					<Card href="/equipment">
						<h5 class="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
							Equipment
						</h5>
						<p class="font-normal text-gray-700 dark:text-gray-400 leading-tight">
							Design equipment with tailored stats and features for your NPCs
						</p>
					</Card>
				</div>
				<div>
					<h1>You are logged in as: {$page.data.session.user.email}</h1>
					<Button on:click={signOut} class="mt-4" color="primary">Logout</Button>
				</div>
			</div>
		{/if}
	</div>
</div>
