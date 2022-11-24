<script>
	import MainLayout from '$lib/components/MainLayout.svelte';

	export let data;
	let { equipment, user } = data;
</script>

<MainLayout itemType="equipment" items={equipment} {user}>
	<slot />
</MainLayout>
