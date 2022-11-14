<script>
	import { Button, ButtonGroup, Input, Label, Textarea } from 'flowbite-svelte';
	import Effects from './Effects.svelte';
	import Meta from './Meta.svelte';
	import Modifiers from './Modifiers.svelte';

	export let data;
	const { spell, disableInputs } = data;

	export const save = async () => {};
	export const makeACopy = async () => {};
	export const deleteSpell = async () => {};
</script>

<div class="flex justify-end">
	<ButtonGroup class="space-x-px my-4">
		<Button on:click={save} pill color="purple" disabled={disableInputs}>Save</Button>
		<Button on:click={makeACopy} pill color="purple">Make a Copy</Button>
		<Button on:click={deleteSpell} pill color="purple" disabled={disableInputs}>Delete</Button>
	</ButtonGroup>
</div>

<Meta {spell} {disableInputs} />
<Modifiers {spell} {disableInputs} />
<Effects {spell} {disableInputs} />
