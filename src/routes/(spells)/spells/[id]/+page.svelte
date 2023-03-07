<script lang="ts">
	import { deleteEntity, saveEntity } from '$lib/utils/operations';
	import { Button, ButtonGroup } from 'flowbite-svelte';
	import 'toastify-js/src/toastify.css';
	import type { Effect, Modifier } from '../../../../../types/types';
	import Calculation from './Calculation.svelte';
	import Effects from './Effects.svelte';
	import Meta from './Meta.svelte';
	import Modifiers from './Modifiers.svelte';

	export let data;

	let { spell, disableInputs } = data;

	export const save = async () => {
		saveEntity('spells', spell);
	};
	export const makeACopy = async () => {};
	export const deleteSpell = async () => await deleteEntity('spells', spell);

	const addModifier = (modifier: Modifier) => {
		const modifierToAdd = {
			id: modifier.id,
			tier: 1,
			meta: ''
		};

		spell = {
			...spell,
			selected_modifiers: [...spell.selected_modifiers, modifierToAdd]
		};
	};

	const removeModifier = (modifier: Modifier) => {
		spell = {
			...spell,
			spell_data: {
				...spell.spell_data,
				modifiers: spell.spell_data.modifiers.filter((m: Modifier) => m !== modifier)
			}
		};
	};

	const addEffect = (effect: Effect) => {
		const effectToAdd = {
			id: effect.id,
			tier: 1,
			meta: ''
		};

		spell = {
			...spell,
			selected_effects: [...spell.selected_effects, effectToAdd]
		};
	};

	const removeEffect = (effect: Effect) => {
		spell = {
			...spell,
			spell_data: {
				...spell.spell_data,
				effects: spell.spell_data.effects.filter((m: Effect) => m !== effect)
			}
		};
	};
</script>

<div class="flex justify-end">
	<ButtonGroup class="space-x-px my-4">
		{#if !disableInputs}
			<Button on:click={save} color="purple" disabled={disableInputs}>Save</Button>
		{/if}
		<Button on:click={makeACopy} color="purple">Make a Copy</Button>
		{#if !disableInputs}
			<Button on:click={deleteSpell} color="purple" disabled={disableInputs}>Delete</Button>
		{/if}
	</ButtonGroup>
</div>

<Meta bind:spell {disableInputs} />
<Calculation bind:spell {disableInputs} />
<Modifiers bind:spell {disableInputs} {addModifier} {removeModifier} />
<Effects bind:spell {disableInputs} {addEffect} {removeEffect} />
