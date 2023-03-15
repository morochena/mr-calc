<script lang="ts">
	import { page } from '$app/stores';
	import { supabaseClient } from '$lib/db';
	import { Button, Card } from 'flowbite-svelte';
	import Auth from '$lib/components/Auth.svelte';
	import logo from '$lib/assets/logo.png';
	import spells from '$lib/assets/spells.png';
	import npcs from '$lib/assets/npcs.png';
	import equipment from '$lib/assets/equipment.png';

	const signOut = async () => {
		await supabaseClient.auth.signOut();
	};
</script>

<div
	class="min-h-screen bg-gray-100 dark:bg-gray-900 dark:text-white flex flex-col items-center justify-center p-4"
>
	<img src={logo} width="300" alt="Mortal Reins" class="mb-10" />

	{#if !$page.data.session}
		<Auth />
	{:else}
		<div class="w-full max-w-4xl">
			<div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
				<Card href="/spells" class="bg-white dark:bg-gray-800 rounded-lg shadow-lg">
					<h5 class="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
						Spells
					</h5>
					<img class="rounded-md" src={spells} width="500" alt="Spells" />
					<p class="mt-4 font-normal text-gray-700 dark:text-gray-400 leading-tight">
						Create custom spells for your characters and NPCs
					</p>
				</Card>
				<Card href="/npcs" class="bg-white dark:bg-gray-800 rounded-lg shadow-lg">
					<h5 class="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">NPCs</h5>
					<img class="rounded-md" src={npcs} width="500" alt="NPCs" />
					<p class="mt-4 font-normal text-gray-700 dark:text-gray-400 leading-tight">
						Generate combat statistics for your custom monsters and NPCs
					</p>
				</Card>
				<Card href="/equipment" class="bg-white dark:bg-gray-800 rounded-lg shadow-lg">
					<h5 class="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
						Equipment
					</h5>
					<img class="rounded-md" src={equipment} width="500" alt="Equipment" />
					<p class="mt-4 font-normal text-gray-700 dark:text-gray-400 leading-tight">
						Design equipment with tailored stats and features for your NPCs
					</p>
				</Card>
			</div>
			<div class="text-center">
				<h1 class="text-xl mb-4">You are logged in as: {$page.data.session.user.email}</h1>
				<Button on:click={signOut} class="mt-4" color="primary">Logout</Button>
			</div>
		</div>
	{/if}
</div>
