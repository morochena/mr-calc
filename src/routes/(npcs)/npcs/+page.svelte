<script>
	import MainLayout from '$lib/components/MainLayout.svelte';

	export let data;
	let { npcs, user } = data;
</script>

<MainLayout itemType="npcs" items={npcs} {user} />
