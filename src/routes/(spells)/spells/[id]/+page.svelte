<script>
	import { supabaseClient } from '$lib/db';
	import { Button, ButtonGroup, Input, Label, Textarea } from 'flowbite-svelte';
	import Effects from './Effects.svelte';
	import Meta from './Meta.svelte';
	import Modifiers from './Modifiers.svelte';
	import Toastify from 'toastify-js';
	import 'toastify-js/src/toastify.css';
	import Calculation from './Calculation.svelte';

	export let data;
	const { spell, disableInputs } = data;

	export const save = async () => {
		const { error } = await supabaseClient.from('spells').update(spell).eq('id', spell.id);
		if (!error) {
			Toastify({
				text: 'Saved!',
				duration: 3000
			}).showToast();
		} else {
			Toastify({
				text: 'Error!!',
				duration: 3000
			}).showToast();
		}
	};
	export const makeACopy = async () => {};
	export const deleteSpell = async () => {};
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

<Meta {spell} {disableInputs} />
<Modifiers {spell} {disableInputs} />
<Effects {spell} {disableInputs} />
<Calculation {spell} {disableInputs} />
