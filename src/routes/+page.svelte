<script lang="ts">
	import { page } from '$app/stores';
	import Auth from './Auth.svelte';
</script>

<h1 class="text-3xl dark:text-white pb-8">Welcome to Mortal Reins Calculators</h1>

<div class="row flex">
	{#if !$page.data.session}
		<Auth />
	{:else}
		<h1>Welcome {$page.data.session.user.email}</h1>
		<p>I am logged in!</p>
	{/if}
</div>
