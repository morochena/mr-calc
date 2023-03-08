<script lang="ts">
	import { Checkbox, Input, Label, Select, Textarea } from 'flowbite-svelte';
	import type { Spell } from '../../../../../types/types';

	export let spell: Spell;
	export let disableInputs: boolean;

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
		{ value: `Unpredictable`, name: `Unpredictable` },
		{ value: `Stable`, name: `Stable` },
		{ value: `Imbue`, name: `Imbue` }
	];
</script>

<div class="grid gap-2 mb-6 md:grid-cols-2">
	<div>
		<Label class="mt-2"
			>Spell Name
			<Input type="text" bind:value={spell.name} disabled={disableInputs} />
		</Label>

		<Label class="mt-2"
			>Description
			<Textarea rows="4" bind:value={spell.description} disabled={disableInputs} />
		</Label>
	</div>
	<div>
		<Label class="mt-2">
			Domain
			<Select items={domains} bind:value={spell.domain} disabled={disableInputs} />
		</Label>

		<Label class="mt-2"
			>Mode
			<Select items={modes} bind:value={spell.mode} disabled={disableInputs} />
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
	</div>
</div>

<Checkbox class="mt-2" disabled={disableInputs} bind:checked={spell.is_alchemy}>Alchemy</Checkbox>
<Checkbox class="mt-2" disabled={disableInputs} bind:checked={spell.is_runesmith}
	>Runesmithing</Checkbox
>
