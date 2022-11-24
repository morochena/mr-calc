<script>
	import { Checkbox, Input, Label, Select, Textarea } from 'flowbite-svelte';

	export let spell;
	export let disableInputs;

	const domains = [
		{ value: `Sorcery`, name: `Sorcery` },
		{ value: `Fire`, name: `Fire` },
		{ value: `Water`, name: `Water` },
		{ value: `Earth`, name: `Earth` },
		{ value: `Air`, name: `Air` },
		{ value: `Necromancy`, name: `Necromancy` },
		{ value: `Holy`, name: `Holy` },
		{ value: `Mind`, name: `Mind` },
		{ value: `Illusion`, name: `Illusion` },
		{ value: `Nature`, name: `Nature` }
	];

	const modes = [
		{ value: `Spell`, name: `Spell` },
		{ value: `Unpredicable`, name: `Unpredicable` },
		{ value: `Stable`, name: `Stable` },
		{ value: `Imbue`, name: `Imbue` }
	];
</script>

<Label class="mt-2"
	>Spell Name
	<Input type="text" bind:value={spell.name} disabled={disableInputs} />
</Label>

<Label class="mt-2"
	>Description
	<Textarea rows="4" bind:value={spell.spell_data.description} disabled={disableInputs} />
</Label>

<Label class="mt-2">
	<span>Tags</span>
	<Input
		type="text"
		bind:value={spell.tags}
		disabled={disableInputs}
		placeholder="eg. fire, ranged"
	/>
</Label>

<Label class="mt-2">
	Domain
	<Select items={domains} bind:value={spell.spell_data.domain} disabled={disableInputs} />
</Label>

<Label class="mt-2"
	>Mode
	<Select items={modes} bind:value={spell.spell_data.mode} disabled={disableInputs} />
</Label>

<Checkbox class="mt-2" disabled={disableInputs} bind:checked={spell.spell_data.isAlchemy}
	>Alchemy</Checkbox
>

<Checkbox class="mt-2" disabled={disableInputs} bind:checked={spell.spell_data.isRunesmith}
	>Runesmithing</Checkbox
>
