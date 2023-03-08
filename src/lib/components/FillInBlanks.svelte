<script lang="ts">
	export let moeId: number;
	export let baseText: string;
	export let replacementValue: string;
	export let onChange: Function;
	export let disabled: boolean = false;

	// given a string like "The {meta|fox} jumped over the {meta|log}"
	// split it into an array of objects like:
	// [
	//   { text: 'The ', isInput: false },
	//   { text: 'fox', isInput: true },
	//   { text: ' jumped over the ', isInput: false },
	//   { text: 'log', isInput: true },
	// ]

	let defaultValue = '?';
	const regex = /(\{[^\]]*\})/;

	$: sentenceParts = baseText
		.split(regex)
		.filter((text) => text)
		.map((part) => {
			if (part.startsWith('{') && part.endsWith('}')) {
				defaultValue = part.slice(1, -1).split('|')[1];
				return {
					text: defaultValue,
					isInput: true
				};
			} else {
				return {
					text: part,
					isInput: false
				};
			}
		});

	$: {
		if (onChange) onChange(moeId, replacementValue);
		if (!replacementValue || replacementValue?.length === 0) {
			replacementValue = defaultValue;
		}
	}
</script>

<div>
	{#each sentenceParts as part}
		{#if part.isInput}
			{#if !disabled}
				<span
					contenteditable
					spellcheck="false"
					class="underline"
					style="min-width: 10px;"
					bind:innerHTML={replacementValue}
				/>
			{:else}
				<span>{replacementValue}</span>
			{/if}
		{:else}
			<span>{part.text}</span>
		{/if}
	{/each}
</div>
