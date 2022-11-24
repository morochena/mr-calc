<script>
	import MainLayout from '$lib/components/MainLayout.svelte';

	export let data;
	let { npcs } = data;
</script>

<MainLayout itemType="npcs" items={npcs}>
	<slot />
</MainLayout>
