<script>
	import MainLayout from '$lib/components/MainLayout.svelte';

	export let data;
	let { spells } = data;
</script>

<MainLayout itemType="spells" items={spells}>
	<slot />
</MainLayout>
