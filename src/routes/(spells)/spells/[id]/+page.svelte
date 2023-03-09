<script lang="ts">
	import { deleteEntity, saveEntity } from '$lib/utils/operations';
	import { Button, ButtonGroup, Toggle } from 'flowbite-svelte';
	import type { Effect, Modifier, SelectedModifier } from '../../../../../types/types';
	import Calculation from './Calculation.svelte';
	import Effects from './Effects.svelte';
	import Meta from './Meta.svelte';
	import Modifiers from './Modifiers.svelte';
	import 'toastify-js/src/toastify.css';

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

	const removeModifier = (id: number) => {
		spell = {
			...spell,
			selected_modifiers: spell.selected_modifiers.filter((m: SelectedModifier) => m.id !== id)
		};
	};

	const removeEffect = (id: number) => {
		spell = {
			...spell,
			selected_effects: spell.selected_effects.filter((m: SelectedModifier) => m.id !== id)
		};
	};
</script>

<div class="my-4 float-right">
	<Toggle disabled={disableInputs} bind:checked={spell.is_public}>Public</Toggle>
</div>

<ButtonGroup class="space-x-px my-4">
	{#if !disableInputs}
		<Button on:click={save} color="primary" disabled={disableInputs}>Save</Button>
	{/if}
	<Button on:click={makeACopy} color="primary">Make a Copy</Button>
	{#if !disableInputs}
		<Button on:click={deleteSpell} color="primary" disabled={disableInputs}>Delete</Button>
	{/if}
	<Button href="/spells/glossary" target="_blank" color="primary">Glossary</Button>
</ButtonGroup>

<Meta bind:spell {disableInputs} />
<Calculation bind:spell {disableInputs} {removeModifier} {removeEffect} />
<Modifiers bind:spell {disableInputs} {addModifier} />
<Effects bind:spell {disableInputs} {addEffect} />
