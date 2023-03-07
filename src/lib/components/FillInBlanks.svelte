<script lang="ts">
	export let baseText: string;
	export let replacementValue: string;

	const re = /(\[[^\]]*\])/;
	$: sentenceParts = baseText
		.split(re)
		.filter((text) => text)
		.map((segment) => {
			const isInput = re.test(segment);
			let text = isInput ? segment.slice(1, -1) : segment;
			if (text.trim().length === 0) {
				text = ' ';
			}
			return {
				text,
				isInput
			};
		});
</script>

<div>
	{#each sentenceParts as part}
		{#if part.isInput}
			<span contenteditable class="underline" style="min-width: 10px;">{part.text}</span>
		{:else}
			<span>{part.text}</span>
		{/if}
	{/each}
</div>
