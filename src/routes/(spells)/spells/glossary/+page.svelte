<script lang="ts">
	import { availableEffects } from '$lib/utils/data/effects';
	import { availableModifiers } from '$lib/utils/data/modifiers';
	import { Card } from 'flowbite-svelte';

	const modifiers = availableModifiers.sort((a, b) => (a.name > b.name ? 1 : -1));
	const effects = availableEffects.sort((a, b) => (a.name > b.name ? 1 : -1));
</script>

<h1 class="pt-8 py-4 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">Modifiers</h1>

<div class="grid grid-cols-4 gap-4 mt-auto">
	{#each modifiers as modifier}
		<div
			class="flex flex-col bg-white dark:bg-gray-800 text-gray-500 dark:text-gray-100 rounded-lg border border-gray-200 dark:border-gray-700 shadow-md max-w-sm p-4 sm:p-6"
		>
			<h5 class="mb-2 text-xl font-bold tracking-tight text-gray-900 dark:text-white">
				{modifier.name}
			</h5>
			{#if modifier.incompatible}
				<p class="text-sm">
					<strong>Incompatible: </strong>{modifier.incompatible?.join(', ') || ''}
				</p>
			{/if}
			{#if modifier.prerequisite}
				<p class="text-sm">
					<strong>Prerequisites: </strong>{modifier.prerequisite?.join(', ') || ''}
				</p>
			{/if}
			<br />
			<p class="text-sm	 text-gray-700 dark:text-gray-100 leading-tight">
				{modifier.description}
			</p>
			<p class="text-sm	 text-gray-700 dark:text-gray-100 leading-tight" />
		</div>
	{/each}
</div>

<h1 class="pt-8 py-4 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">Effects</h1>

<div class="grid grid-cols-4 gap-4">
	{#each effects as effect}
		<div
			class="flex flex-col bg-white dark:bg-gray-800 text-gray-500 dark:text-gray-100 rounded-lg border border-gray-200 dark:border-gray-700 shadow-md max-w-sm p-4 sm:p-6"
		>
			<h5 class="mb-2 text-xl font-bold tracking-tight text-gray-900 dark:text-white">
				{effect.name}
			</h5>
			<p class="text-sm"><strong>Domain: </strong>{effect.domains?.join(', ') || ''}</p>
			{#if effect.incompatible}
				<p class="text-sm">
					<strong>Incompatible: </strong>{effect.incompatible?.join(', ') || ''}
				</p>
			{/if}
			{#if effect.prerequisite}
				<p class="text-sm">
					<strong>Prerequisites: </strong>{effect.prerequisite?.join(', ') || ''}
				</p>
			{/if}
			<br />
			<p class="text-sm	 text-gray-700 dark:text-gray-100 leading-tight">
				{effect.description}
			</p>
			<p class="text-sm	 text-gray-700 dark:text-gray-100 leading-tight" />
		</div>
	{/each}
</div>
