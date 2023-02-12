<script>
	import MainLayout from '$lib/components/MainLayout.svelte';

	export let data;
	let { spells, user } = data;
</script>

<MainLayout itemType="spells" items={spells} {user} />
