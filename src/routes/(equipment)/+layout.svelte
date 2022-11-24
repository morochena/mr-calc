<script>
	import MainLayout from '$lib/components/MainLayout.svelte';

	export let data;
	let { equipment } = data;
</script>

<MainLayout itemType="equipment" items={equipment}>
	<slot />
</MainLayout>
